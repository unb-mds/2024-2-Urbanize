import React, { useState } from 'react';
import MapComponent from './components/Mapa';
import MenuDetalhar from './components/menuDetalhar';
import MenuComponent from './components/menuPrincipal';
import Legenda from './components/legenda';

const App: React.FC = () => {
  const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  // Função para abrir o menu detalhar
  const openDetailMenu = (detail: string) => {
    setSelectedDetail(detail);
    setIsDetailMenuOpen(true);
  };

  // Função para fechar o menu detalhar
  const closeDetailMenu = () => {
    setIsDetailMenuOpen(false);
    setSelectedDetail(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <MapComponent openDetailMenu={openDetailMenu} />
      {/* Renderiza o MenuPrincipal apenas quando o menu de detalhamento não está aberto */}
      {!isDetailMenuOpen && <MenuComponent />}
      {isDetailMenuOpen && (
        <MenuDetalhar closeDetailMenu={closeDetailMenu} obraDetalhada={selectedDetail!} />
      )}
            <Legenda />

    </div>
    
  );
};

export default App;
