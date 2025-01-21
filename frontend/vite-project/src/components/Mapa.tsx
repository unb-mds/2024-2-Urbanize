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
  situacao: string; // Adicionando a situação do projeto
}

const MapComponent: React.FC<MapComponentProps> = ({ openDetailMenu }) => {
  const [projects, setProjects] = useState<Project[]>([]); // Estado para armazenar os dados das obras

  useEffect(() => {
    const fetchAllProjects = async () => {
      let allProjects: Project[] = [];
      let page = 1;
      const pageSize = 464; 
      let hasMoreData = true;

      while (hasMoreData) {
        try {
          const response = await fetch(
            // API paginada funcioando  
            `https://two024-2-urbanize.onrender.com/api/projeto-investimento?page=${page}&pageSize=${pageSize}`
          );
          const data = await response.json();

          if (data.projetos.length === 0) {
            hasMoreData = false;
            break;
          }

          const mappedProjects = data.projetos.flatMap((project: any) =>
            project.geometrias.map((geo: any) => ({
              id: project.id,
              nome: project.nome,
              descricao: project.descricao,
              latitude: geo.latitude,
              longitude: geo.longitude,
              situacao: project.situacao, // Adicionando situação ao projeto
            }))
          );

          allProjects = [...allProjects, ...mappedProjects];
          page += 1;
        } catch (error) {
          console.error('Erro ao buscar os dados da API:', error);
          hasMoreData = false;
        }
      }

      setProjects(allProjects);
    };

    fetchAllProjects();
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
  
    projects.forEach((project) => {
      // Validar latitude e longitude
      if (
        project.latitude == null ||
        project.longitude == null ||
        isNaN(project.latitude) ||
        isNaN(project.longitude)
      ) {
        console.warn('Coordenadas inválidas para o projeto:', project);
        return; // Ignorar o projeto com coordenadas inválidas
      }
  
      // Criar o marcador se os dados forem válidos
      const marker = L.marker([project.latitude, project.longitude], {
        icon: svgIcon(25, project.situacao),
      }).addTo(map);
  
      marker.on('click', () => {
        openDetailMenu(project.id);
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
