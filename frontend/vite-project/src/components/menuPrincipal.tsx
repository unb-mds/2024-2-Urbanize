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
    setShowFilterMenu(true); // Abre o menu "Filtrar"
    setShowListMenu(false); // Fecha o menu "Listar"
    setIsArrowUp(false); // Reseta a seta do botão "Listar"
  };

  const closeFilterMenu = () => {
    setShowFilterMenu(false); // Fecha o menu "Filtrar"
  };

  const handleListClick = () => {
    setShowListMenu((prevState) => !prevState); // Alterna o menu "Listar"
    setIsArrowUp((prevState) => !prevState); // Alterna a rotação da seta
  };

  const closeListMenu = () => {
    setShowListMenu(false); // Fecha o menu "Listar"
    setIsArrowUp(false); // Reseta a seta
  };

  return (
    <div>
      <div id="map" className="relative h-screen w-full"></div>

      {/* Menu Principal */}
      {!showFilterMenu && !showListMenu ? (
        <div className="fixed bottom-5 left-10 bg-white w-64 mx-auto my-1 rounded-[10px] shadow-lg z-10">
          <TituloMenus />

          <BotoesMenu
            className="w-full"
            onFilterClick={handleFilterClick} // Callback para o botão "Filtrar"
            onListClick={handleListClick} // Callback para o botão "Listar"
            isArrowUp={isArrowUp} // Passa o estado da seta para o botão "Listar"
          />
        </div>
      ) : showFilterMenu ? (
        <MenuFiltrar closeFilterMenu={closeFilterMenu} />
      ) : (
        <MenuListar closeListMenu={closeListMenu} />
      )}
    </div>
  );
};

export default MenuComponent;
