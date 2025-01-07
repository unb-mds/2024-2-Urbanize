import React from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';

interface MenuListarProps {
  closeListMenu: () => void; // Função para redirecionar ao menu principal
}

const MenuListar: React.FC<MenuListarProps> = ({ closeListMenu }) => {
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
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col items-center fixed max-w-xs mx-auto my-6 z-10">
        {/* Cabeçalho */}
        <div onClick={closeListMenu} className="cursor-pointer w-full">
          <TituloMenus />
        </div>

        {/* Lista de Obras */}
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

        {/* Botões de Navegação */}
        <BotoesMenu className="w-full mt-0" />
      </div>
    </div>
  );
};

export default MenuListar;