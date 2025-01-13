import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  openDetailMenu: (detail: string) => void; // Função para abrir o menu detalhar
}

const MapComponent: React.FC<MapComponentProps> = ({ openDetailMenu }) => {
  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('O container do mapa não foi encontrado.');
      return;
    }

    const map = L.map(mapElement).setView([-15.9608, -48.0794], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const svgIcon = L.divIcon({
      html: `
        <svg width="151" height="151" viewBox="0 0 151 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="76" cy="78" r="23" fill="#00CD1F"/>
          <circle cx="75.5" cy="75.5" r="73" stroke="#00CD1F" stroke-width="5"/>
        </svg>
      `,
      className: '',
      iconSize: [25, 25],
    });

    const marker = L.marker([-15.9608, -48.0794], { icon: svgIcon }).addTo(map);

    // Função para atualizar o tamanho do ícone com base no nível de zoom
    const updateIconSize = () => {
      const zoomLevel = map.getZoom();
      const newSize = Math.max(15, 20 + (zoomLevel - 15) * 2); // Tamanho do ícone diminui conforme o zoom aumenta
      marker.setIcon(L.divIcon({
        html: `
      <svg width="${newSize * 3}" height="${newSize * 3}" viewBox="0 0 151 151" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="76" cy="78" r="23" fill="#00CD1F"/>
        <circle cx="75.5" cy="75.5" r="73" stroke="#00CD1F" stroke-width="5"/>
      </svg>
    `,
        className: '',
        iconSize: [newSize, newSize], // Alterando o tamanho do ícone com base no zoom
      }));
    };

    // Adiciona evento de mudança de zoom
    map.on('zoom', updateIconSize);

    // Inicializa o tamanho do ícone
    updateIconSize();

    // Evento de clique no marcador
    marker.on('click', () => {
      openDetailMenu(' ');
    });

    return () => {
      map.remove();
    };
  }, [openDetailMenu]);

  return (
    <div className="z-10 h-screen w-full">
      <div id="map" className="h-full w-full"></div>
    </div>
  );
};

export default MapComponent;
