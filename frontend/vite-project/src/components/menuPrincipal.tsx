import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuFiltrar from './menuFiltrar';
import MenuListar from './menuListar';

const MenuComponent: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false); // Estado para exibir o menu de listagem

  const handleFilterClick = () => {
    setShowFilterMenu(true);
  };

  const closeFilterMenu = () => {
    setShowFilterMenu(false);
  };

  const handleListClick = () => {
    setShowListMenu(true); // Define para exibir o menu de listagem
  };

  const closeListMenu = () => {
    setShowListMenu(false); // Fecha o menu de listagem
  };

  return (
    <div>
      <div id="map" className="relative h-screen w-full"></div>

      {!showFilterMenu && !showListMenu ? (
        <div className="fixed bottom-5 left-10 bg-white w-64  mx-auto my-1 rounded-[10px] shadow-lg z-10">
          <TituloMenus />

          <BotoesMenu
            className="w-full"
            onFilterClick={handleFilterClick}
            onListClick={handleListClick} // Adiciona o callback para o botão "Listar"
          />
        </div>
      ) : showFilterMenu ? (
        <MenuFiltrar closeFilterMenu={closeFilterMenu} />
      ) : (
        <MenuListar closeListMenu={closeListMenu} /> // Exibe o menu de listagem
      )}
    </div>
  );
};

export default MenuComponent;
