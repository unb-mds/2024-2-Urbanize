import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Importação explícita do Leaflet

const MapComponent: React.FC = () => {
  useEffect(() => {
    // Certifique-se de que o container do mapa existe antes de inicializá-lo
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('O container do mapa não foi encontrado.');
      return;
    }

    // Inicializa o mapa
    const map = L.map(mapElement).setView([-15.9608, -48.0794], 15);

    // Adiciona o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Adiciona um marcador
    const marker = L.marker([-15.9608, -48.0794]).addTo(map);
    marker.bindPopup('<b>Universidade do Gama (FGA)</b><br>Localização').openPopup();

    // Cleanup para evitar vazamento de memória
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="z-10 h-screen w-full">
      <div id="map" className="h-full w-full"></div>

    </div>
  );
};

export default MapComponent;
