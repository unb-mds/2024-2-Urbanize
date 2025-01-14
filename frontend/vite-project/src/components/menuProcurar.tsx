import React, { useState } from 'react';
import TituloMenus from './tituloMenus';
import BotoesMenu from './botoesMenu';
import MenuDetalhar from './menuDetalhar';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [obraSelecionada, setObraSelecionada] = useState<string | null>(null);

  const obras = [
    'Pavimentação - EPTG',
    'Pavimentação - EPIA',
    'Poda de árvores - Ceilândia',
    'Obra de drenagem - Vicente Pires'
  ];

  const filteredObras = obras.filter((obra) =>
    obra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (obraSelecionada) {
    return (
      <MenuDetalhar
        obraDetalhada={obraSelecionada}
        closeDetailMenu={() => setObraSelecionada(null)}
      />
    );
  }

  return (
    <div className="">
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col items-center fixed max-w-xs mx-auto my-1 z-10">
        {/* Cabeçalho */}
        <div onClick={closeSearchMenu} className="cursor-pointer w-full flex items-center justify-center">
          <TituloMenus />
        </div>

        {/* Campo de busca */}
        <div className="w-full flex-grow flex flex-col p-3 bg-white mt-[-5px] overflow-y-auto">
          <div className="flex items-center bg-customBlue rounded-[10px] px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none">
              <path d="M17.6389 17.658L24 24M20.3333 11.1667C20.3333 16.2292 16.2292 20.3333 11.1667 20.3333C6.10405 20.3333 2 16.2292 2 11.1667C2 6.10405 6.10405 2 11.1667 2C16.2292 2 20.3333 6.10405 20.3333 11.1667Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Cidade, tipo de obra"
              className="w-full text-gray-100 bg-customBlue text-white focus:outline-none ml-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Resultados filtrados */}
          {searchTerm && (
            <div className="mt-4">
              {filteredObras.map((obra, index) => (
                <div
                  key={index}
                  onClick={() => setObraSelecionada(obra)}
                  className="border-b border-gray-300 py-2 last:border-none cursor-pointer"
                >
                  {obra}
                </div>
              ))}
            </div>
          )}
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
