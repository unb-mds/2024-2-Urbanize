import React, { useState, useEffect } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuFiltrar from './menuFiltrar';
import MenuListar from './menuListar';
import MenuProcurar from './menuProcurar';
import MapComponent from './Mapa';
import MenuDetalhar from './menuDetalhar'; // Add this import

interface Project {
  id: string;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  situacao: string;
  natureza: string;
  eixos: Array<{ descricao: string }>;
  especie: string;
  fontesDeRecurso?: Array<{ valorInvestimentoPrevisto: number }>;
}

interface FilterOptions {
  natureza: string;
  valueRange: [number, number];
  searchTerm: string;
}

const MenuComponent: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [filterNatureza, setFilterNatureza] = useState('');
  const [showDetailMenu, setShowDetailMenu] = useState(false);
  const [selectedObraId, setSelectedObraId] = useState<string | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [previousMenuState, setPreviousMenuState] = useState({
    showFilterMenu: false,
    showListMenu: false,
    showSearchMenu: false,
    isArrowUp: false,
    selectedObraId: null as string | null
  });
  const [previousSearchState, setPreviousSearchState] = useState('');
  const [searchTermState, setSearchTermState] = useState(''); // Add this state
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    natureza: '',
    valueRange: [0, 33500000],
    searchTerm: ''
  });
  const [maxProjectValue, setMaxProjectValue] = useState(33500000);
  const [previousFilters, setPreviousFilters] = useState<FilterOptions>({
    natureza: '',
    valueRange: [0, 33500000],
    searchTerm: ''
  });

  // Fetch data when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
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
              eixos: project.eixos,
              especie: project.especie,
              fontesDeRecurso: project.fontesDeRecurso
            }))
          );

          projects = [...projects, ...mappedProjects];
          page += 1;
        } catch (error) {
          console.error('Erro ao buscar os dados da API:', error);
          hasMoreData = false;
        }
      }

      // Calculate maximum project value
      const maxValue = projects.reduce((max, project) => {
        const projectValue = project.fontesDeRecurso?.[0]?.valorInvestimentoPrevisto || 0;
        return Math.max(max, projectValue);
      }, 0);

      setMaxProjectValue(maxValue);
      setFilterOptions(prev => ({
        ...prev,
        valueRange: [0, maxValue]
      }));

      setAllProjects(projects);
    };

    fetchProjects();
  }, []);

  // Filter projects based on all filters
  const filteredProjects = allProjects.filter(project => {
    // Check name search filter
    if (filterOptions.searchTerm && 
        !project.nome.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
      return false;
    }

    // Check natureza filter
    if (filterOptions.natureza && project.natureza !== filterOptions.natureza) {
      return false;
    }
    
    // Check value range filter
    const projectValue = project.fontesDeRecurso?.[0]?.valorInvestimentoPrevisto || 0;
    if (projectValue < filterOptions.valueRange[0] || projectValue > filterOptions.valueRange[1]) {
      return false;
    }

    return true;
  });

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
    setPreviousMenuState({
      showFilterMenu,
      showListMenu,
      showSearchMenu,
      isArrowUp,
      selectedObraId: id
    });
    
    // Save current search term regardless of how we got here
    if (showSearchMenu) {
      setLastSearchTerm(searchTermState);
    }
    
    setPreviousFilters(filterOptions);
    setSelectedObraId(id);
    setShowDetailMenu(true);
  };

  const handleCloseDetail = () => {
    setShowDetailMenu(false);
    setSelectedObraId(null);
    
    // Restore previous menu state
    setShowFilterMenu(previousMenuState.showFilterMenu);
    setShowListMenu(previousMenuState.showListMenu);
    setShowSearchMenu(previousMenuState.showSearchMenu);
    setIsArrowUp(previousMenuState.isArrowUp);
    setFilterOptions(previousFilters);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
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
      ) : showDetailMenu && selectedObraId ? (
        <MenuDetalhar 
          obraDetalhada={selectedObraId}
          closeDetailMenu={handleCloseDetail}
        />
      ) : showFilterMenu ? (
        <MenuFiltrar 
          closeFilterMenu={handleFilterClick}
          onSearchClick={handleSearchClick}
          onListClick={handleListClick}
          onFilterChange={handleFilterChange}
          currentFilters={filterOptions}
          maxValue={maxProjectValue}
        />
      ) : showSearchMenu ? (
        <MenuProcurar 
          closeSearchMenu={handleSearchClick}
          onFilterClick={handleFilterClick}
          onListClick={handleListClick}
          onDetailClick={handleOpenDetail}
          onDetailClose={handleCloseDetail}
          savedSearchState={previousSearchState} // Pass the saved search state
          currentSearchTerm={lastSearchTerm}
          onSearchChange={(term) => {
            setLastSearchTerm(term);
            setSearchTermState(term);
          }}
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
    </div>
  );
};

export default MenuComponent;
