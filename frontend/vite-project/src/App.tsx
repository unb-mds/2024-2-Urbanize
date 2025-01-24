import React from 'react';
import MenuComponent from './components/menuPrincipal';
import Legenda from './components/legenda';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <MapComponent openDetailMenu={openDetailMenu} />
      {/* Renderiza o MenuPrincipal apenas quando o menu de detalhamento não está aberto */}
      {!isDetailMenuOpen && <MenuComponent />}
      {isDetailMenuOpen && (
        <MenuDetalhar closeDetailMenu={closeDetailMenu} obraDetalhada={selectedDetail!} />
      )}
      <Legenda isDetailMenuOpen={isDetailMenuOpen} />

    </div>
  );
};

export default App;
