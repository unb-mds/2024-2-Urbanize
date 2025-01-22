import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  openDetailMenu: (detail: string) => void;
  projects: Project[]; // Changed from filterNatureza to projects
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

  // Initialize map once
  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const newMap = L.map(mapElement).setView([-15.787702449291142, -47.917646], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(newMap);

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  // Update markers when projects change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    setMarkers([]);

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
          icon: svgIcon(25, project.situacao),
        }).addTo(map);

        marker.on('click', () => {
          openDetailMenu(project.id);
        });

        return marker;
      });

    setMarkers(newMarkers);
  }, [map, projects, openDetailMenu]);

  return (
    <div id="map" className="absolute inset-0 z-0" />
  );
};

export default MapComponent;
