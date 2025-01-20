import axios, { AxiosResponse } from 'axios';
import { prisma } from '@/database';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, any[]>(); // Cache local para armazenar geometrias já buscadas
const falhas: string[] = []; // Lista de IDs com falhas

// Tipos auxiliares
export interface Projeto {
  idUnico: string;
  nome: string;
  cep?: string | null;
  endereco?: string | null;
  descricao?: string | null;
  funcaoSocial?: string | null;
  metaGlobal?: string | null;
  dataInicialPrevista: Date;
  dataFinalPrevista: Date;
  dataInicialEfetiva?: Date | null;
  dataFinalEfetiva?: Date | null;
  dataCadastro: Date;
  especie?: string | null;
  natureza: string;
  situacao: string;
  uf: string;
  populacaoBeneficiada: string;
  tomadores: Tomador[];
  executores: Executor[];
  repassadores: Repassador[];
  eixos: Eixo[];
  tipos: Tipo[];
  geometrias: Geometria[];
  fontesDeRecurso: FonteDeRecurso[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tomador {
  id: number;
  nome: string;
  projetoId: string;
  projeto?: Projeto; // Relacionamento opcional para evitar dependência circular
}

export interface Executor {
  id: number;
  nome: string;
  projetoId: string;
  projeto?: Projeto;
}

export interface Repassador {
  id: number;
  nome: string;
  projetoId: string;
  projeto?: Projeto;
}

export interface Eixo {
  id: number;
  descricao: string;
  projetoId: string;
  projeto?: Projeto;
}

export interface Tipo {
  id: number;
  descricao: string;
  idEixo: number;
  projetoId: string;
  projeto?: Projeto;
}

export interface Geometria {
  id: number;
  geometriaWkt: string;
  dataCriacao: Date;
  origem: string;
  latitude?: number | null;
  longitude?: number | null;
  projetoId: string;
  projeto?: Projeto;
}

export interface FonteDeRecurso {
  id: number;
  origem: string;
  valorInvestimentoPrevisto: string; // Decimal em Prisma é convertido para string no cliente
  projetoId: string;
  projeto?: Projeto;
}

// Função para fazer uma requisição com retentativa exponencial
async function fetchWithRetry<T>(
  url: string,
  retries: number = 5,
  delay: number = 1000
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay)); // Atraso
        return fetchWithRetry<T>(url, retries - 1, delay * 2); // Atraso exponencial
      } else {
        throw new Error('Limite de requisições excedido e tentativas esgotadas.');
      }
    } else {
      throw error;
    }
  }
}

// Função para buscar geometria com cache
async function fetchGeometria(idUnico: string): Promise<Geometria[]> {
  if (cache.has(idUnico)) {
    return cache.get(idUnico) || [];
  }

  const url = `https://api.obrasgov.gestao.gov.br/obrasgov/api/geometria?idUnico=${idUnico}`;
  try {
    const geometria = await fetchWithRetry<Geometria[]>(url);
    if (geometria.length > 0) {
      cache.set(idUnico, geometria);
    }
    return geometria;
  } catch (error) {
    falhas.push(idUnico);
    throw new Error(`Erro ao buscar geometria para ID ${idUnico}: ${error}`);
  }
}

// Função para extrair latitude e longitude de uma geometria WKT
function extractLatLong(
  geometriaWkt: string
): { latitude: number; longitude: number } | null {
  const pointMatch = geometriaWkt.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);

  if (pointMatch) {
    return {
      longitude: parseFloat(pointMatch[1]),
      latitude: parseFloat(pointMatch[2]),
    };
  }
  
  const polygonMatch = geometriaWkt.match(/POLYGON \(\(\s*([-\d.]+) ([-\d.]+)/);

  if (polygonMatch) {
    return {
      longitude: parseFloat(polygonMatch[1]),
      latitude: parseFloat(polygonMatch[2]),
    };
  }

  console.warn('Formato inesperado de geometria WKT:', geometriaWkt);
  return null;
}

// Função para salvar projetos no banco de dados
async function saveProject(projeto: Projeto): Promise<void> {
  try {
    const geometriaData = await fetchGeometria(projeto.idUnico)
    const geometriasComLatLong = geometriaData.map((geometria: Geometria) => {
      const latLong = extractLatLong(geometria.geometriaWkt)

      return {
        geometria: geometria.geometriaWkt,
        dataCriacao: new Date(geometria.dataCriacao),
        origem: geometria.origem,
        latitude: latLong?.latitude || null,
        longitude: latLong?.longitude || null,
      }
    })

    // Verifica se o projeto já existe no banco de dados
    const existingProject = await prisma.projeto.findUnique({
      where: { id: projeto.idUnico },
    })

    if (existingProject) {
      // Atualiza o projeto existente
      await prisma.projeto.update({
        where: { id: projeto.idUnico },
        data: {
          nome: projeto.nome,
          cep: projeto.cep ?? null,
          endereco: projeto.endereco ?? null,
          descricao: projeto.descricao ?? null,
          funcaoSocial: projeto.funcaoSocial ?? null,
          metaGlobal: projeto.metaGlobal ?? null,
          dataInicialPrevista: new Date(projeto.dataInicialPrevista),
          dataFinalPrevista: new Date(projeto.dataFinalPrevista),
          dataInicialEfetiva: projeto.dataInicialEfetiva
            ? new Date(projeto.dataInicialEfetiva)
            : null,
          dataFinalEfetiva: projeto.dataFinalEfetiva
            ? new Date(projeto.dataFinalEfetiva)
            : null,
          dataCadastro: new Date(projeto.dataCadastro),
          especie: projeto.especie ?? null,
          natureza: projeto.natureza,
          situacao: projeto.situacao,
          uf: projeto.uf,
          populacaoBeneficiada: parseInt(projeto.populacaoBeneficiada) || 0,
        },
      })
      console.log(`Projeto ${projeto.nome} atualizado com sucesso!`)
    } else {
      // Cria um novo projeto
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
          dataInicialEfetiva: projeto.dataInicialEfetiva
            ? new Date(projeto.dataInicialEfetiva)
            : null,
          dataFinalEfetiva: projeto.dataFinalEfetiva
            ? new Date(projeto.dataFinalEfetiva)
            : null,
          dataCadastro: new Date(projeto.dataCadastro),
          especie: projeto.especie ?? null,
          natureza: projeto.natureza,
          situacao: projeto.situacao,
          uf: projeto.uf,
          populacaoBeneficiada: parseInt(projeto.populacaoBeneficiada) || 0,
          geometrias: {
            create: geometriasComLatLong,
          },
          tomadores: {
            create:
              projeto.tomadores?.map((tomador: Tomador) => ({
                nome: tomador.nome,
              })) || [],
          },
          executores: {
            create:
              projeto.executores?.map((executor: Executor) => ({
                nome: executor.nome,
              })) || [],
          },
          repassadores: {
            create:
              projeto.repassadores?.map((repassador: Repassador) => ({
                nome: repassador.nome,
              })) || [],
          },
          eixos: {
            create:
              projeto.eixos?.map((eixo: Eixo) => ({
                descricao: eixo.descricao,
              })) || [],
          },
          tipos: {
            create:
              projeto.tipos?.map((tipo: Tipo) => ({
                descricao: tipo.descricao,
                idEixo: tipo.idEixo,
              })) || [],
          },
          fontesDeRecurso: {
            create:
              projeto.fontesDeRecurso?.map((fontes: FonteDeRecurso) => ({
                origem: fontes.origem,
                valorInvestimentoPrevisto: fontes.valorInvestimentoPrevisto,
              })) || [],
          },
        },
      })
      console.log(`Projeto ${projeto.nome} salvo com sucesso!`)
    }
  } catch (error) {
    console.error(`Erro ao salvar projeto ${projeto.idUnico}:`, error)
    falhas.push(projeto.idUnico)
  }
}

// Função principal para buscar e salvar projetos
export async function fetchAndSaveProjects(): Promise<void> {
  let pagina = 0
  const tamanhoDaPagina = 10
  const uf = 'DF'
  let hasMoreData = true

  try {
    while (hasMoreData) {
      console.log(`Buscando página ${pagina}...`)

      const response = await axios.get(
        'https://api.obrasgov.gestao.gov.br/obrasgov/api/projeto-investimento',
        {
          params: {
            pagina,
            tamanhoDaPagina,
            uf,
          },
        },
      )

      if (response.status !== 200) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`)
      }

      const { content: projetos } = response.data

      if (!projetos || projetos.length === 0) {
        console.log('Nenhum projeto restante para processar.')
        hasMoreData = false
        break
      }

      await Promise.all(projetos.map((projeto: Projeto) => saveProject(projeto)))

      pagina++
    }
  } catch (error) {
    console.error('Erro ao buscar e salvar projetos:', error)
  } finally {
    console.log('IDs de projetos com falhas:', falhas)
    await prisma.$disconnect()
    console.log('Conexão com o banco de dados encerrada.')
  }
}
