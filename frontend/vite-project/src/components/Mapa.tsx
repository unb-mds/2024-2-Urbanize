import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  openDetailMenu: (detail: string) => void; // Função para abrir o menu detalhar
}

interface Project {
  id: string;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ openDetailMenu }) => {
  const [projects, setProjects] = useState<Project[]>([]); // Estado para armazenar os dados das obras

  useEffect(() => {
    // Buscar dados da API
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://two024-2-urbanize.onrender.com/api/projeto-investimento');
        const data = await response.json();
        const mappedProjects = data.projetos.flatMap((project: any) =>
          project.geometrias.map((geo: any) => ({
            id: project.id,
            nome: project.nome,
            descricao: project.descricao,
            latitude: geo.latitude,
            longitude: geo.longitude,
          }))
        );
        setProjects(mappedProjects);
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('O container do mapa não foi encontrado.');
      return;
    }

    const map = L.map(mapElement).setView([-15.787702449291142, -47.917646], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const svgIcon = (size: number) =>
      L.divIcon({
        html: `
          <svg width="${size}" height="${size}" viewBox="0 0 151 151" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="76" cy="78" r="23" fill="#00CD1F"/>
            <circle cx="75.5" cy="75.5" r="73" stroke="#00CD1F" stroke-width="5"/>
          </svg>
        `,
        className: '',
        iconSize: [size, size],
      });

    // Adicionar marcadores ao mapa
    projects.forEach((project) => {
      const marker = L.marker([project.latitude, project.longitude], { icon: svgIcon(25) }).addTo(map);
      marker.on('click', () => {
        openDetailMenu(project.descricao); // Passar a descrição para o menu de detalhes
      });
    });

    return () => {
      map.remove();
    };
  }, [projects, openDetailMenu]);

  return (
    <div className="z-10 h-screen w-full">
      <div id="map" className="h-full w-full"></div>
    </div>
  );
};

export default MapComponent;
