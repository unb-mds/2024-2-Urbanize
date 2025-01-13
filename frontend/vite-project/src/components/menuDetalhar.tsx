import React from 'react';

interface MenuDetalharProps {
  closeDetailMenu: () => void; // Função para fechar o menu
  obraDetalhada: string; // Nome da obra detalhada
}

const MenuDetalhar: React.FC<MenuDetalharProps> = ({ closeDetailMenu, obraDetalhada }) => {
  // Exemplo de dados dinâmicos
  const detalhes = {
    status: "No prazo",
    orgaoSuperior: "Ministério da Educação",
    modalidade: "Pregão",
    quantidadeItens: 140,
    orgaoVinculado: "Ministério da Educação",
    data: "00/00/0000",
    valor: 140,
    unidadeGestora: "Hospital da Educação",
    situacao: "Publicado",
    contato: "00",
    numeroLicitacao: "0000000000000",
    processo: "222222222222",
    municipioUf: "Brasília / DF",
    objeto: "Objeto - aquisição",
  };

  return (
    <div className="bottom-0 left-0 w-full bg-white rounded-[10px] flex flex-col items-center fixed z-10 max-h-screen overflow-y-auto">
      {/* Cabeçalho */}
      <div onClick={closeDetailMenu} className="cursor-pointer w-full">
        <div className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md"></div>
      </div>

      <div className="text-center border-b border-gray-300 w-full text-[#C7C5C5]">
        <h1 className="bg-customBlue text-[22px] font-medium mt-6 ml-[20px] mr-[20px] text-start">
          Detalhamento da Licitação
        </h1>
      </div>

      {/* Detalhamento da obra */}
      <div className="w-full p-4 bg-white ml-[40px] mr-[20px]">
        <p className="text-lg font-bold text-gray-900 mb-4">
          Status da obra: <span className="font-bold text-gray-800">{detalhes.status}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-800 leading-6">
          <div className="flex flex-col space-y-2">
            <p>
              <strong>Órgão superior:</strong><br />
              {detalhes.orgaoSuperior}
            </p>
            <p>
              <strong>Modalidade:</strong><br />
              {detalhes.modalidade}
            </p>
            <p>
              <strong>Quantidade de itens licitados:</strong><br />
              {detalhes.quantidadeItens}
            </p>
            <p>
              <strong>Objeto:</strong><br />
              {detalhes.objeto}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p>
              <strong>Órgão / Entidade vinculada:</strong><br />
              {detalhes.orgaoVinculado}
            </p>
            <p>
              <strong>Data:</strong><br />
              {detalhes.data}
            </p>
            <p>
              <strong>Valor:</strong><br />
              {detalhes.valor}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p>
              <strong>Unidade gestora responsável:</strong><br />
              {detalhes.unidadeGestora}
            </p>
            <p>
              <strong>Situação:</strong><br />
              {detalhes.situacao}
            </p>
            <p>
              <strong>Contato no órgão / Entidade responsável:</strong><br />
              {detalhes.contato}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p>
              <strong>Número da licitação:</strong><br />
              {detalhes.numeroLicitacao}
            </p>
            <p>
              <strong>Processo:</strong><br />
              {detalhes.processo}
            </p>
            <p>
              <strong>Município / UF:</strong><br />
              {detalhes.municipioUf}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MenuDetalhar;
