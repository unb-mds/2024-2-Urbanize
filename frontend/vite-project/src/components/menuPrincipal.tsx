import React from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';


const MenuComponent: React.FC = () => {

  return (
    <div>
      <div id="map" className=" relativeh-screen w-full"></div>

      <div className=" fixed bottom-5 left-10 bg-white w-64 mx-auto my-1 rounded-t-lg shadow-lg z-10">
        <TituloMenus />

        <BotoesMenu />

      </div>
    </div>
  );
};

export default MenuComponent;
