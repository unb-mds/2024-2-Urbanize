import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuFiltrar from './menuFiltrar';
import MenuListar from './menuListar';

const MenuComponent: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Controla o menu "Filtrar"
  const [showListMenu, setShowListMenu] = useState(false); // Controla o menu "Listar"
  const [isArrowUp, setIsArrowUp] = useState(false); // Controla a rotação da seta do botão "Listar"

  const handleFilterClick = () => {
    setShowFilterMenu((prevState) => !prevState);
    setShowListMenu(false);
    setIsArrowUp(false);
  };

  const handleListClick = () => {
    setShowListMenu((prevState) => !prevState);
    setIsArrowUp((prevState) => !prevState); // Alterna a seta ao abrir ou fechar o menu
  };

  return (
    <div>
      <div id="map" className="relative h-screen w-full"></div>

      {!showFilterMenu && !showListMenu ? (
        <div className="fixed bottom-5 left-10 bg-white w-64 mx-auto my-1 rounded-[10px] shadow-lg z-10">
          <TituloMenus />

          <BotoesMenu
            className="w-full"
            onFilterClick={handleFilterClick}
            onListClick={handleListClick}
            isArrowUp={isArrowUp} // Inverte o estado da seta
          />
        </div>
      ) : showFilterMenu ? (
        <MenuFiltrar closeFilterMenu={handleFilterClick} />
      ) : (
        <MenuListar 
          closeListMenu={handleListClick}
          isArrowUp={isArrowUp}
        />
      )}
    </div>
  );
};

export default MenuComponent;