import React, { useEffect, useState } from 'react';

interface MenuDetalharProps {
  closeDetailMenu: () => void;
  obraDetalhada: string; 
}

const MenuDetalhar: React.FC<MenuDetalharProps> = ({ closeDetailMenu, obraDetalhada }) => {
  const [detalhes, setDetalhes] = useState<any>(null); // Estado para armazenar os detalhes do projeto
  const [loading, setLoading] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(4); // Estado para contagem regressiva

  // Função para formatar a data no formato dd/MM/yyyy
  const formatarData = (dataISO: string): string => {
    if (!dataISO) return 'N/A'; // Caso a data seja indefinida ou nula
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para formatar valor como moeda BRL
  const formatarValor = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`https://two024-2-urbanize.onrender.com/api/projeto-investimento/${obraDetalhada}`);
        const data = await response.json();
        console.log('Resposta da API:', data); // Verifique os dados retornados

        // Verifique se o projeto existe
        if (data && data.id) {
          setDetalhes(data); // Armazene os detalhes
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

    useEffect(() => {
      fetchProjectDetails();
    }, [obraDetalhada]);

  // Efeito para contagem regressiva
  useEffect(() => {
    if (!detalhes && secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 500);
      return () => clearInterval(timer); // Limpa o timer ao desmontar o componente
    } else if (secondsLeft === 0) {
      closeDetailMenu(); // Volta para a tela anterior após 15 segundos
    }
  }, [detalhes, secondsLeft, closeDetailMenu]);

  const renderDetalhes = (label: string, value: any) => (
    <p>
      <strong>{label}: </strong>
      {value}
    </p>
  );


  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="h-[60px] w-[200px] bg-customBlue text-white font-bold text-[25px] flex items-center justify-center rounded-[50px]">
          <h2> Carregando... </h2>
        </div>
      </div>
    );
  }

  if (!detalhes) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-customBlue text-white rounded-[70px] h-[120px] w-[400px] flex flex-col items-center justify-center">
          <h2 className="font-bold text-[25px]">Projeto não encontrado!</h2>
          <p className="mt-2 text-center">
            Retornando em <strong>{secondsLeft}</strong> segundos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bottom-0 left-0 w-full bg-white rounded-[10px] flex flex-col items-center fixed z-10 max-h-screen overflow-y-auto">
      <div onClick={closeDetailMenu} className="cursor-pointer w-full">
        <div className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md"></div>
      </div>

      <div className="text-center border-b border-gray-300 w-full text-white">
        <h1 className="bg-customBlue text-[22px] font-medium mt-6 ml-[20px] mr-[20px] text-start">
          <div className="ml-[10px]">Detalhamento da obra {detalhes.idUnico}</div>
        </h1>
      </div>

      <div className="ml-[25px] p-2 bg-white">
        <p className="text-lg font-bold text-gray-900 mb-4">
          Status da obra: <span className="font-bold text-gray-800">{detalhes.situacao}</span>
        </p>

        <div className="grid grid-cols-1 gap-2 mb-6">
          {renderDetalhes('Nome', detalhes.nome)}
          {renderDetalhes('Meta Global', detalhes.metaGlobal)}
          {renderDetalhes('Descrição', detalhes.descricao)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 leading-6">
          <div className="space-y-2">
            {renderDetalhes('Data Inicial Prevista', formatarData(detalhes.dataInicialPrevista))}
            {renderDetalhes('Data Final Prevista', formatarData(detalhes.dataFinalPrevista))}
            {renderDetalhes('Data Inicial Efetiva', formatarData(detalhes.dataInicialEfetiva))}
            {renderDetalhes('Data Final Efetiva', formatarData(detalhes.dataFinalEfetiva))}
            {renderDetalhes('Função Social', detalhes.funcaoSocial)}
            {renderDetalhes('Unidade Gestora Responsável', detalhes.tomadores[0]?.nome)}
            {renderDetalhes('Contato no Órgão/Entidade Responsável', detalhes.repassadores[0]?.nome)}
            {renderDetalhes('Executores', detalhes.executores[0]?.nome)}
          </div>

          <div className="space-y-2">
            {renderDetalhes('População Beneficiada', detalhes.populacaoBeneficiada)}
            {renderDetalhes('Espécie', detalhes.especie)}
            {renderDetalhes('Natureza', detalhes.natureza)}
            {renderDetalhes('Eixos', detalhes.eixos[0]?.descricao)}
            {renderDetalhes('Tipos', detalhes.tipos[0]?.descricao)}
            <p><strong>Fontes de recurso: </strong>
              <div className='ml-[20px]'>
                <p><strong>Origem: </strong>{detalhes.fontesDeRecurso[0]?.origem}</p>
                <p><strong>Valor investimento previsto: </strong>{formatarValor(detalhes.fontesDeRecurso[0]?.valorInvestimentoPrevisto || 0)}</p>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetalhar;