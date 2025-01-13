import React from 'react';
import TituloMenus from './tituloMenus';

interface MenuDetalharProps {
  closeDetailMenu: () => void; // Função para fechar o menu
  obraDetalhada: string; // Nome da obra detalhada
}

const MenuDetalhar: React.FC<MenuDetalharProps> = ({ closeDetailMenu, obraDetalhada }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[400px] px-[39px] bg-white flex flex-col fixed max-w-full z-10 border-t-4 border-customBlue">
      {/* Cabeçalho */}
      <div className="w-full bg-customBlue text-center relative">
        <div
          onClick={closeDetailMenu}
          className="w-[92px] h-[9px] bg-gray-400 mx-auto mt-2 rounded-md cursor-pointer absolute top-0 left-1/2 transform -translate-x-1/2"
        ></div>
        <h1 className="text-[16px] font-semibold tracking-wide py-2 text-[#C7C5C5] mt-2">Detalhamento da Obra</h1>
      </div>

      {/* Detalhamento da obra */}
      <div className="w-full p-4 bg-white">
        <p className="text-lg font-bold text-gray-900 mb-4">Status da obra: <span className="font-bold text-gray-800">No prazo</span></p>

        <div className="grid grid-cols-4 gap-x-6 text-sm text-gray-800 leading-6">
          <div>
            <p><strong>Órgão superior:</strong><br />Ministério da Educação</p>
            <p className="mt-3"><strong>Modalidade:</strong><br />Pregão</p>
            <p className="mt-3"><strong>Quantidade de itens licitados:</strong><br />140</p>
            <p className="mt-3"><strong>Objeto:</strong><br />Objeto - aquisição</p>
          </div>
          <div>
            <p><strong>Órgão / Entidade vinculada:</strong><br />Ministério da Educação</p>
            <p className="mt-3"><strong>Data:</strong><br />Pregão</p>
            <p className="mt-3"><strong>Valor:</strong><br />140</p>
          </div>
          <div>
            <p><strong>Unidade gestora responsável:</strong><br />Hospital da Educação</p>
            <p className="mt-3"><strong>Situação:</strong><br />Publicado</p>
            <p className="mt-3"><strong>Contato no órgão / Entidade responsável:</strong><br />00</p>
          </div>
          <div>
            <p><strong>Número da licitação:</strong><br />000000000000</p>
            <p className="mt-3"><strong>Processo:</strong><br />222222222222</p>
            <p className="mt-3"><strong>Município / UF:</strong><br />Brasília / DF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetalhar;
