import React from 'react';
import MapComponent from './components/Mapa';
import MenuComponent from './components/menuPrincipal';
import MenuFiltrar from './components/menuFiltrar';
import MenuListar from './components/menuListar';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <MapComponent />
      <MenuComponent />
      {/*<MenuFiltrar />*/} 
      {/*<MenuListar />*/} 
    </div>

  );
};

export default App;
