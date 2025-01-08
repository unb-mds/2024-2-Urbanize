import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';

interface MenuListarProps {
  closeListMenu: () => void; // Função para redirecionar ao menu principal
  isArrowUp: boolean;
}

const MenuListar: React.FC<MenuListarProps> = ({ closeListMenu, isArrowUp }) => {
  const [isArrowDown, setIsArrowDown] = useState(true); // Estado para controlar a direção da seta

  const toggleMenu = () => {
    setIsArrowDown(!isArrowDown); // Alterna entre seta para baixo e cima
    if (!isArrowDown) {
      closeListMenu(); // Fecha o menu quando a seta aponta para cima
    }
  };

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
      <div className={`bottom-5 left-10 w-64 ${isArrowDown ? 'h-[400px]' : 'h-0'} bg-white rounded-[10px] shadow-lg flex flex-col items-center fixed max-w-xs mx-auto my-1 z-10 transition-all duration-300 overflow-hidden`}>
        {/* Cabeçalho */}
        <div onClick={toggleMenu} className="cursor-pointer w-full flex items-center justify-center">
          <TituloMenus />
        </div>

        {/* Lista de Obras */}
        {isArrowDown && (
          <div className="w-full flex flex-col p-3 bg-white mt-[-5px] overflow-y-auto">
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
        )}

        {/* Botões de Navegação */}
        {isArrowDown && <BotoesMenu 
          className="w-full mt-0" 
          onListClick={closeListMenu}
          isArrowUp={isArrowUp}
        />}
      </div>
    </div>
  );
};

export default MenuListar;