import React from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';

interface MenuListarProps {
  closeListMenu: () => void;
  onFilterClick: () => void;
  onSearchClick: () => void;
  isArrowUp: boolean;
}

const MenuListar: React.FC<MenuListarProps> = ({ 
  closeListMenu, 
  onFilterClick, 
  onSearchClick, 
  isArrowUp 
}) => {
  const obras = [
    'Pavimentação - EPTG',
    'Pavimentação - EPIA',
    'Poda de árvores - Ceilândia SQL',
    'Obra de drenagem - Vicente Pires',
    'Pintura de vias - Guará 1',
    'Pintura de vias - Guará 2',
    'Obra de drenagem - Águas Claras',
    'Obra de drenagem - Asa Sul',
  ];

  return (
    <div className="">
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col fixed max-w-xs mx-auto my-1 z-10">
        {/* Cabeçalho */}
        <div className="w-full">
          <div className="text-center border-b border-gray-300">
            <div onClick={closeListMenu} className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md cursor-pointer"></div>
            <h1 className="text-[40px] font-mono font-medium mt-2">URBANIZE</h1>
          </div>
        </div>

        {/* Lista de Obras */}
        <div className="w-full flex-grow flex flex-col p-3 bg-white mt-[-5px] overflow-y-auto">
          <ul className="space-y-1 text-sm text-gray-700">
            {obras.map((obra, index) => (
              <li
                key={index}
                className="border-b border-gray-300 py-2 last:border-none"
              >
                {obra}
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar com navegação */}
        <BotoesMenu 
          className="w-full"
          onListClick={closeListMenu}
          onFilterClick={onFilterClick}
          onSearchClick={onSearchClick}
          isArrowUp={isArrowUp}
        />
      </div>
    </div>
  );
};

export default MenuListar;