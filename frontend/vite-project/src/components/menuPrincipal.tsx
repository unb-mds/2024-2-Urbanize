import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuFiltrar from './menuFiltrar';

const MenuComponent: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleFilterClick = () => {
    setShowFilterMenu(true);
  };

  const closeFilterMenu = () => {
    setShowFilterMenu(false);
  };

  return (
    <div>
      <div id="map" className="relative h-screen w-full"></div>

      {!showFilterMenu ? (
        <div className="fixed bottom-5 left-10 bg-white w-64  mx-auto my-1 rounded-[10px] shadow-lg z-10">
          <TituloMenus />

          <BotoesMenu
            className="w-full"
            onFilterClick={handleFilterClick} // Passa a função de callback para o botão "Filtrar"
          />
        </div>
      ) : (
        <MenuFiltrar closeFilterMenu={closeFilterMenu} />
      )}
    </div>
  );
};

export default MenuComponent;
