import React from 'react';
import MenuComponent from './components/menuPrincipal';
import Legenda from './components/legenda';
import BotaoSaibaMais from './components/botaoSaibamais';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <MenuComponent />
      <Legenda />
      <BotaoSaibaMais />
    </div>
  );
};

export default App;
