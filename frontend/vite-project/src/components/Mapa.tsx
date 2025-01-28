import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  openDetailMenu: (detail: string) => void;
  projects: Project[];
}

interface Project {
  id: string;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  situacao: string;
  natureza: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ openDetailMenu, projects }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [iconSize, setIconSize] = useState<number>(30); // Estado para armazenar o tamanho do ícone

  // Função para atualizar o tamanho do ícone conforme a largura da tela
  const updateIconSize = () => {
    if (window.innerWidth < 640) { // Para telas menores (por exemplo, mobile)
      setIconSize(40); // Menor tamanho para telas pequenas
    } else {
      setIconSize(25); // Tamanho maior para telas maiores
    }
  };

  useEffect(() => {
    // Atualizar o tamanho do ícone sempre que a janela for redimensionada
    updateIconSize();
    window.addEventListener('resize', updateIconSize);

    // Inicialização do mapa
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const newMap = L.map(mapElement).setView([-15.787702449291142, -47.917646], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(newMap);

    setMap(newMap);

    return () => {
      window.removeEventListener('resize', updateIconSize);
      newMap.remove();
    };
  }, []);

  // Atualiza os marcadores quando os projetos ou o mapa mudam
  useEffect(() => {
    if (!map) return;

    // Limpar os marcadores existentes
    markers.forEach(marker => marker.remove());

    const svgIcon = (size: number, situacao: string) => {
      const iconPath =
        ['Em Execução', 'Em execução', 'Cadastrada', 'Concluída'].includes(situacao)
          ? '/marcadorVerde.svg'
          : '/marcadorVermelho.svg';
  
      return L.icon({
        iconUrl: iconPath,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
      });
    };

    const newMarkers = projects
      .filter(project => (
        project.latitude != null &&
        project.longitude != null &&
        !isNaN(project.latitude) &&
        !isNaN(project.longitude)
      ))
      .map(project => {
        const marker = L.marker([project.latitude, project.longitude], {
          icon: svgIcon(iconSize, project.situacao),
        });

        marker.on('click', () => {
          if (openDetailMenu) {
            openDetailMenu(project.id);
          }
        });

        marker.addTo(map);
        return marker;
      });

    setMarkers(newMarkers);

    return () => {
      newMarkers.forEach(marker => marker.remove());
    };
  }, [map, projects, openDetailMenu, iconSize]); // Adiciona iconSize como dependência

  return (
    <div id="map" className="absolute inset-0 z-0" />
  );
};

export default MapComponent;
