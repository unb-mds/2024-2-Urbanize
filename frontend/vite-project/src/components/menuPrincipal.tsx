import React, { useState, useEffect } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuFiltrar from './menuFiltrar';
import MenuListar from './menuListar';
import MenuProcurar from './menuProcurar';
import MapComponent from './Mapa';
import MenuDetalhar from './menuDetalhar'; // Add this import

const MenuComponent: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [filterNatureza, setFilterNatureza] = useState('');
  const [showDetailMenu, setShowDetailMenu] = useState(false);
  const [selectedObraId, setSelectedObraId] = useState<string | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Fetch projects once when component mounts
  useEffect(() => {
    const fetchAllProjects = async () => {
      let projects: Project[] = [];
      let page = 1;
      const pageSize = 464;
      let hasMoreData = true;

      while (hasMoreData) {
        try {
          const response = await fetch(
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
              situacao: project.situacao,
              natureza: project.natureza,
              // ... other properties
            }))
          );

          projects = [...projects, ...mappedProjects];
          page += 1;
        } catch (error) {
          console.error('Erro ao buscar os dados da API:', error);
          hasMoreData = false;
        }
      }

      setAllProjects(projects);
      setFilteredProjects(projects);
    };

    fetchAllProjects();
  }, []);

  // Filter projects when natureza changes
  useEffect(() => {
    const filtered = filterNatureza
      ? allProjects.filter(p => p.natureza === filterNatureza)
      : allProjects;
    setFilteredProjects(filtered);
  }, [filterNatureza, allProjects]);

  const handleFilterClick = () => {
    setShowFilterMenu((prevState) => !prevState);
    setShowListMenu(false);
    setShowSearchMenu(false);
    setIsArrowUp(false);
  };

  const handleListClick = () => {
    setShowListMenu(true);  // Sempre abre o menu Listar
    setShowFilterMenu(false);
    setShowSearchMenu(false);
    setIsArrowUp(true);     // Controla a direção da seta
  };

  const handleSearchClick = () => {
    setShowSearchMenu((prevState) => !prevState);
    setShowFilterMenu(false);
    setShowListMenu(false);
    setIsArrowUp(false);
  };

  const closeListMenu = () => {
    setShowListMenu(false);
    setIsArrowUp(false);
  };

  const handleOpenDetail = (id: string) => {
    setSelectedObraId(id);
    setShowDetailMenu(true);
    setShowFilterMenu(false);
    setShowListMenu(false);
    setShowSearchMenu(false);
  };

  const handleCloseDetail = () => {
    setShowDetailMenu(false);
    setSelectedObraId(null);
  };

  return (
    <>
      <div className="h-screen w-full">
        <MapComponent 
          openDetailMenu={handleOpenDetail}
          projects={filteredProjects}
        />
      </div>

      {!showFilterMenu && !showListMenu && !showSearchMenu && !showDetailMenu ? (
        <div className="fixed bottom-5 left-10 bg-white w-64 mx-auto my-1 rounded-[10px] shadow-lg z-10">
          <TituloMenus />
          <BotoesMenu
            className="w-full"
            onFilterClick={handleFilterClick}
            onListClick={handleListClick}
            onSearchClick={handleSearchClick}
            isArrowUp={isArrowUp}
          />
        </div>
      ) : showFilterMenu ? (
        <MenuFiltrar 
          closeFilterMenu={handleFilterClick}
          onSearchClick={handleSearchClick}
          onListClick={handleListClick}
          onFilterChange={setFilterNatureza}
          currentNatureza={filterNatureza} // Add this prop
        />
      ) : showSearchMenu ? (
        <MenuProcurar 
          closeSearchMenu={handleSearchClick}
          onFilterClick={handleFilterClick}
          onListClick={handleListClick}
        />
      ) : showDetailMenu && selectedObraId ? (
        <MenuDetalhar 
          obraDetalhada={selectedObraId}
          closeDetailMenu={handleCloseDetail}
        />
      ) : (
        <MenuListar 
          closeListMenu={closeListMenu}
          onFilterClick={handleFilterClick}
          onSearchClick={handleSearchClick}
          isArrowUp={isArrowUp}
          filterNatureza={filterNatureza} // Add this prop
          projects={filteredProjects}
        />
      )}
    </>
  );
};

export default MenuComponent;
