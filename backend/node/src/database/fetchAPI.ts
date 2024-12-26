import axios from "axios";
import { prisma } from "@/database";

export async function fetchAndSaveProjects() {
  let pagina = 56;
  const tamanhoDaPagina = 10; // Ajuste este valor conforme a capacidade da API
  let hasMoreData = true;
  let uf = "DF";

  try {
    while (hasMoreData) {
      console.log(`Buscando página ${pagina}...`);

      // Faz a requisição para a API externa
      const response = await axios.get('https://api.obrasgov.gestao.gov.br/obrasgov/api/projeto-investimento', {
        params: {
          pagina,
          tamanhoDaPagina,
          uf,
        }
      });

      if (response.status !== 200) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }

      const { content: projetos } = response.data;

      // Se não há mais projetos, encerre o loop
      if (projetos.length === 0) {
        hasMoreData = false;
        break;
      }

      // Salvar ou atualizar cada projeto no banco de dados
      for (const projeto of projetos) {
        // Verifica se o projeto já existe no banco de dados
        const existingProject = await prisma.projeto.findUnique({
          where: { id: projeto.idUnico }
        });

        // Se o projeto já existe, pule para o próximo
        if (existingProject) {
          console.log(`Projeto ${projeto.nome} já existe, ignorando.`);
          continue;
        }

        await prisma.projeto.create({
          data: {
            id: projeto.idUnico,
            nome: projeto.nome,
            cep: projeto.cep ?? null,
            endereco: projeto.endereco ?? null,
            descricao: projeto.descricao ?? null,
            funcaoSocial: projeto.funcaoSocial ?? null,
            metaGlobal: projeto.metaGlobal ?? null,
            dataInicialPrevista: new Date(projeto.dataInicialPrevista),
            dataFinalPrevista: new Date(projeto.dataFinalPrevista),
            dataInicialEfetiva: projeto.dataInicialEfetiva ? new Date(projeto.dataInicialEfetiva) : null,
            dataFinalEfetiva: projeto.dataFinalEfetiva ? new Date(projeto.dataFinalEfetiva) : null,
            dataCadastro: new Date(projeto.dataCadastro),
            especie: projeto.especie ?? null,
            natureza: projeto.natureza,
            situacao: projeto.situacao,
            uf: projeto.uf,
            populacaoBeneficiada: parseInt(projeto.populacaoBeneficiada) || 0,
            tomadores: {
              create: projeto.tomadores?.map((tomador: any) => ({
                nome: tomador.nome,
                codigo: tomador.codigo
              })) || []
            },
            executores: {
              create: projeto.executores?.map((executor: any) => ({
                nome: executor.nome,
                codigo: executor.codigo
              })) || []
            },
            repassadores: {
              create: projeto.repassadores?.map((repassador: any) => ({
                nome: repassador.nome,
                codigo: repassador.codigo
              })) || []
            },
            eixos: {
              create: projeto.eixos?.map((eixo: any) => ({
                descricao: eixo.descricao
              })) || []
            },
            tipos: {
              create: projeto.tipos?.map((tipo: any) => ({
                descricao: tipo.descricao,
                idEixo: tipo.idEixo
              })) || []
            },
            geometrias: {
              create: projeto.geometrias?.map((geometria: any) => ({
                geometria: geometria.geometria,
                dataCriacao: new Date(geometria.dataCriacao),
                origem: geometria.origem
              })) || []
            },
            fontesDeRecurso: {
              create: projeto.fontesDeRecurso?.map((fontes: any) => ({
                origem: fontes.origem,
                valorInvestimentoPrevisto: fontes.valorInvestimentoPrevisto
              })) || []
            }
          }
        });
        console.log(`Projeto ${projeto.nome} salvo com sucesso!`);
      }

      // Incrementa para a próxima página
      pagina++;
    }
    console.log(`Cron job finalizado!`);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro ao buscar e salvar projetos:', error);
  }
}
