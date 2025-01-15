import React, { useEffect, useState } from 'react';

interface MenuDetalharProps {
  closeDetailMenu: () => void;
  obraDetalhada: string; // Agora é o ID do projeto
}

const MenuDetalhar: React.FC<MenuDetalharProps> = ({ closeDetailMenu, obraDetalhada }) => {
  const [detalhes, setDetalhes] = useState<any>(null); // Estado para armazenar os detalhes do projeto
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`https://two024-2-urbanize.onrender.com/api/projeto-investimento/${obraDetalhada}`);
        const data = await response.json();
        console.log('Resposta da API:', data); // Verifique os dados retornados

        // Verifique se o projeto existe, agora considerando que o objeto pode estar diretamente em 'data'
        if (data && data.id) {
          setDetalhes(data); // Armazene os detalhes diretamente
        } else {
          console.log('Projeto não encontrado.');
          setDetalhes(null); // Caso não encontre, setDetalhes como null
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do projeto:', error);
        setLoading(false);
        setDetalhes(null); // Se ocorrer erro, setDetalhes como null
      }
    };

    fetchProjectDetails();
  }, [obraDetalhada]); // Recarrega quando obraDetalhada mudar


  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="h-[60px] w-[200px] bg-customBlue text-white font-bold text-[25px] flex items-center justify-center rounded-[50px]">
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }


  if (!detalhes) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="h-[60px] w-[200px] bg-customBlue text-white font-bold text-[25px] flex items-center justify-center rounded-[50px]">
          <h2> Projeto não encontrado! </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bottom-0 left-0 w-full bg-white rounded-[10px] flex flex-col items-center fixed z-10 max-h-screen overflow-y-auto">
      <div onClick={closeDetailMenu} className="cursor-pointer w-full">
        <div className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md"></div>
      </div>

      <div className="text-center border-b border-gray-300 w-full text-[#C7C5C5]">
        <h1 className="bg-customBlue text-[22px] font-medium mt-6 ml-[20px] mr-[20px] text-start">
          Detalhamento da Licitação
        </h1>
      </div>

      <div className="w-full p-3 bg-white">
        <div className="grid grid-cols-1 gap-2 mb-2">
          <p>
            <strong>Nome: </strong>
            {detalhes.nome}
          </p>
          <p>
            <strong>Meta Global: </strong>
            {detalhes.metaGlobal}
          </p>
          <p>
            <strong>Descrição: </strong>
            {detalhes.descricao}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 leading-6">
          <div className="space-y-2">
            <p>
              <strong>Data Inicial Prevista: </strong><br />
              {detalhes.dataInicialPrevista}
            </p>
            <p>
              <strong>Data Final Prevista: </strong><br />
              {detalhes.dataFinalPrevista}
            </p>
            <p>
              <strong>Data Inicial Efetiva: </strong><br />
              {detalhes.dataInicialEfetiva}
            </p>
            <p>
              <strong>Data Final Efetiva: </strong><br />
              {detalhes.dataFinalEfetiva}
            </p>
            <p>
              <strong>Valor: </strong><br />
              {detalhes.fontesDeRecurso[0]?.valorInvestimentoPrevisto}
            </p>
            <p>
              <strong>Função Social: </strong><br />
              {detalhes.funcaoSocial}
            </p>
            <p>
              <strong>Unidade Gestora Responsável: </strong><br />
              {detalhes.tomadores[0]?.nome}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Situação: </strong><br />
              {detalhes.situacao}
            </p>
            <p>
              <strong>Espécie: </strong><br />
              {detalhes.especie}
            </p>
            <p>
              <strong>Natureza: </strong><br />
              {detalhes.natureza}
            </p>
            <p>
              <strong>Contato no Órgão/Entidade Responsável: </strong><br />
              {detalhes.repassadores[0]?.nome}
            </p>
            <p>
              <strong>Número da Licitação: </strong><br />
              {detalhes.idUnico}
            </p>
            <p>
              <strong>Processo: </strong><br />
              {detalhes.idUnico}
            </p>
            <p>
              <strong>Município/UF: </strong><br />
              {detalhes.uf}
            </p>
          </div>
        </div>

      </div>
    </div >
  );
};

export default MenuDetalhar;
