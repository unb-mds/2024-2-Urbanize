import React from 'react';
import MenuComponent from './components/menuPrincipal';
import Legenda from './components/legenda';

const App: React.FC = () => {
  return (
    <div className="h-screen w-full relative">
      <MenuComponent />
      <Legenda />
    </div>
  );
};

export default App;
