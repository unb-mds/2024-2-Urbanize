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

  // Função genérica para alternar menus
  const toggleMenu = (menuType: string) => {
    if (menuType === 'filter') {
      setShowFilterMenu((prevState) => !prevState);
    } else if (menuType === 'search') {
      setShowSearchMenu((prevState) => !prevState);
    } else if (menuType === 'list') {
      setShowListMenu(true);
    }

    // Fechar todos os outros menus
    setShowFilterMenu(menuType === 'filter' ? !showFilterMenu : false);
    setShowSearchMenu(menuType === 'search' ? !showSearchMenu : false);
    setShowListMenu(menuType === 'list' ? true : false);
    setIsArrowUp(menuType === 'list');
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
            onFilterClick={() => toggleMenu('filter')}
            onListClick={() => toggleMenu('list')}
            onSearchClick={() => toggleMenu('search')} // Lógica para o menuProcurar
            isArrowUp={isArrowUp} // Inverte o estado da seta
          />
        </div>
      ) : showFilterMenu ? (
        <MenuFiltrar 
          closeFilterMenu={() => toggleMenu('filter')}
          onSearchClick={() => toggleMenu('search')}
          onListClick={() => toggleMenu('list')}  
        />
      ) : showSearchMenu ? (
        <MenuProcurar 
          closeSearchMenu={() => toggleMenu('search')}
          onFilterClick={() => toggleMenu('filter')}
          onListClick={() => toggleMenu('list')}   
        />
      ) : (
        <MenuListar 
          closeListMenu={closeListMenu}   
          onFilterClick={() => toggleMenu('filter')}
          onSearchClick={() => toggleMenu('search')}
          isArrowUp={isArrowUp}
        />
      )}
    </div>
  );
};

export default MenuComponent;
