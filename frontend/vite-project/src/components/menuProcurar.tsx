import React from 'react';
import TituloMenus from './tituloMenus';
import BotoesMenu from './botoesMenu';

interface MenuProcurarProps {
  closeSearchMenu: () => void;
  onFilterClick: () => void;
  onListClick: () => void;
}

const MenuProcurar: React.FC<MenuProcurarProps> = ({ 
  closeSearchMenu, 
  onFilterClick, 
  onListClick 
}) => {
  return (
    <div className="">
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col items-center fixed max-w-xs mx-auto my-1 z-10">
        {/* Cabeçalho */}
        <div onClick={closeSearchMenu} className="cursor-pointer w-full flex items-center justify-center">
          <TituloMenus />
        </div>

        {/* Campo de busca */}
        <div className="w-full flex-grow flex flex-col p-3 bg-white mt-[-5px] overflow-y-auto">
          <input
            type="text"
            placeholder="Cidade, tipo de obra"
            className="w-full px-3 py-2 text-gray-700 bg-customBlue text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Botões fixos na parte inferior */}
        <div className="w-full mt-auto">
          <BotoesMenu 
            className="w-full"
            onSearchClick={closeSearchMenu}
            onFilterClick={onFilterClick}
            onListClick={onListClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuProcurar;
