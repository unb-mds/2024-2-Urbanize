import React, { useState, useEffect } from 'react';
import BotoesMenu from './botoesMenu';
import MenuDetalhar from './menuDetalhar'; // Importe o novo componente

const MenuListar: React.FC<MenuListarProps> = ({ 
  closeListMenu, 
  onFilterClick, 
  onSearchClick, 
  isArrowUp 
}) => {
  const [obraSelecionada, setObraSelecionada] = useState<string | null>(null);
  const [obras, setObras] = useState<any[]>([]); // Estado para armazenar as obras

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch('https://two024-2-urbanize.onrender.com/api/projeto-investimento');
        const data = await response.json();
        const sortedObras = data.projetos.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        setObras(sortedObras);
      } catch (error) {
        console.error('Erro ao buscar as obras:', error);
      }
    };

    fetchObras();
  }, []);

  if (obraSelecionada) {
    return (
      <MenuDetalhar
        obraDetalhada={obraSelecionada}
        closeDetailMenu={() => setObraSelecionada(null)}
      />
    );
  }

  return (
    <div>
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col fixed max-w-xs mx-auto my-1 z-10">
        {/* Cabeçalho */}
        <div className="w-full">
          <div className="text-center border-b border-gray-300">
            <div onClick={closeListMenu} className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md cursor-pointer"></div>
            <h1 className="text-[40px] font-mono font-medium mt-2">URBANIZE</h1>
          </div>
        </div>

        {/* Lista de Obras */}
        <div className="w-full flex-grow flex flex-col p-3 bg-white mt-[-5px] overflow-y-auto scroll-container">
          <ul className="space-y-1 text-sm text-gray-700">
            {obras.map((obra, index) => (
              <li
                key={index}
                onClick={() => setObraSelecionada(obra.id)}
                className="border-b border-gray-300 py-2 last:border-none cursor-pointer hover:bg-gray-100"
              >
                {obra.nome}
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
