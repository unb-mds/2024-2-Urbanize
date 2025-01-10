import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuFiltrar from './menuFiltrar';
import MenuListar from './menuListar';
import MenuProcurar from './menuProcurar'; // Importando o menuProcurar

const MenuComponent: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Controla o menu "Filtrar"
  const [showListMenu, setShowListMenu] = useState(false); // Controla o menu "Listar"
  const [isArrowUp, setIsArrowUp] = useState(false); // Controla a rotação da seta do botão "Listar"
  const [showSearchMenu, setShowSearchMenu] = useState(false); // Controla o menu "Procurar"

  const handleFilterClick = () => {
    setShowFilterMenu((prevState) => !prevState);
    setShowListMenu(false);
    setShowSearchMenu(false);
    setIsArrowUp(false);
  };

  const handleListClick = () => {
    setShowListMenu(true);  // Sempre abre o menu Listar
    setShowFilterMenu(false);
    setShowSearchMenu(false);
    setIsArrowUp(true);     // Controla a direção da seta
  };

  const handleSearchClick = () => {
    setShowSearchMenu((prevState) => !prevState);
    setShowFilterMenu(false);
    setShowListMenu(false);
    setIsArrowUp(false);
  };

  const closeListMenu = () => {
    setShowListMenu(false);
    setIsArrowUp(false);
  };

  return (
    <div>
      <div id="map" className="relative h-screen w-full"></div>

      {!showFilterMenu && !showListMenu && !showSearchMenu ? (
        <div className="fixed bottom-5 left-10 bg-white w-64 mx-auto my-1 rounded-[10px] shadow-lg z-10">
          <TituloMenus />

          <BotoesMenu
            className="w-full"
            onFilterClick={handleFilterClick}
            onListClick={handleListClick}
            onSearchClick={handleSearchClick} // Lógica para o menuProcurar
            isArrowUp={isArrowUp} // Inverte o estado da seta
          />
        </div>
      ) : showFilterMenu ? (
        <MenuFiltrar 
          closeFilterMenu={handleFilterClick}
          onSearchClick={handleSearchClick}
          onListClick={handleListClick}  // Usa handleListClick ao invés de closeListMenu
        />
      ) : showSearchMenu ? (
        <MenuProcurar 
          closeSearchMenu={handleSearchClick}
          onFilterClick={handleFilterClick}
          onListClick={handleListClick}   // Usa handleListClick ao invés de closeListMenu
        />
      ) : (
        <MenuListar 
          closeListMenu={closeListMenu}   // Nova função específica para fechar
          onFilterClick={handleFilterClick}
          onSearchClick={handleSearchClick}
          isArrowUp={isArrowUp}
        />
      )}
    </div>
  );
};

export default MenuComponent;
