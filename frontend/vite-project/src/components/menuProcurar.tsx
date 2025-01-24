import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TituloMenus from './tituloMenus';
import BotoesMenu from './botoesMenu';
import MenuDetalhar from './menuDetalhar';

interface MenuProcurarProps {
  closeSearchMenu: () => void;
  onFilterClick: () => void;
  onListClick: () => void;
  onDetailClick: (id: string) => void; // Add this prop
  onDetailClose: () => void; // Add this prop
  savedSearchState: string;
  currentSearchTerm: string;
  onSearchChange: (term: string) => void;
}

const MenuProcurar: React.FC<MenuProcurarProps> = ({ 
  closeSearchMenu, 
  onFilterClick, 
  onListClick,
  savedSearchState,
  currentSearchTerm,
  onSearchChange
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const [obras, setObras] = useState<any[]>([]);
  const [obraSelecionada, setObraSelecionada] = useState<string | null>(null);
  const [previousSearch, setPreviousSearch] = useState('');

  // Memoize the fetch function
  const fetchObras = useCallback(async () => {
    let allObras: any[] = [];
    let page = 1;
    const pageSize = 464;
    let hasMoreData = true;

    while (hasMoreData) {
      try {
        const response = await fetch(`https://two024-2-urbanize.onrender.com/api/projeto-investimento?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();

        if (data.projetos.length === 0) {
          hasMoreData = false;
          break;
        }

        // Pre-process the data for faster searching
        const processedObras = data.projetos.map((obra: any) => ({
          ...obra,
          searchableName: obra.nome.toLowerCase()
        }));

        allObras = [...allObras, ...processedObras];
        page += 1;
      } catch (error) {
        console.error('Erro ao buscar as obras:', error);
        hasMoreData = false;
      }
    }

    setObras(allObras);
  }, []);

  useEffect(() => {
    fetchObras();
  }, [fetchObras]);

  useEffect(() => {
    if (savedSearchState) {
      setSearchTerm(savedSearchState);
    }
  }, [savedSearchState]);

  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  useEffect(() => {
    setSearchTerm(currentSearchTerm);
  }, [currentSearchTerm]);

  // Função auxiliar para normalizar texto para ordenação
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  // Memoize filtered results com ordenação aprimorada
  const filteredObras = useMemo(() => {
    if (!searchTerm) return [];

    const searchTermLower = searchTerm.toLowerCase();
    return obras
      .filter(obra => obra.searchableName.includes(searchTermLower))
      .sort((a, b) => {
        const nameA = normalizeText(a.nome);
        const nameB = normalizeText(b.nome);
        
        // Remove artigos e palavras comuns do início para melhor ordenação
        const cleanNameA = nameA.replace(/^(a |o |as |os |um |uma |uns |umas |de |da |do |das |dos )/g, '');
        const cleanNameB = nameB.replace(/^(a |o |as |os |um |uma |uns |umas |de |da |do |das |dos )/g, '');
        
        return cleanNameA.localeCompare(cleanNameB, 'pt-BR');
      });
  }, [obras, searchTerm]);

  // Debounce search input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    onSearchChange(newTerm);
  }, [onSearchChange]);

  const handleSelectObra = (id: string) => {
    setPreviousSearch(searchTerm);
    setObraSelecionada(id);
  };

  const handleCloseDetail = () => {
    setObraSelecionada(null);
    setSearchTerm(previousSearch);
  };

  if (obraSelecionada) {
    return (
      <MenuDetalhar
        obraDetalhada={obraSelecionada}
        closeDetailMenu={handleCloseDetail}
      />
    );
  }

  return (
    <div className="fixed bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col mx-auto my-1 z-10">
      <div className="w-full">
        <div className="text-center">
          <div onClick={closeSearchMenu} className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md cursor-pointer"></div>
          <h1 className="text-[40px] font-mono font-medium mt-2">URBANIZE</h1>
        </div>
      </div>

      <div className="w-full px-3 pt-3">
        <div className="flex items-center bg-customBlue rounded-[10px] px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none">
            <path d="M17.6389 17.658L24 24M20.3333 11.1667C20.3333 16.2292 16.2292 20.3333 11.1667 20.3333C6.10405 20.3333 2 16.2292 2 11.1667C2 6.10405 6.10405 2 11.1667 2C16.2292 2 20.3333 6.10405 20.3333 11.1667Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Cidade, tipo de obra"
            className="w-full text-gray-100 bg-customBlue text-white focus:outline-none ml-3"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar px-3 pt-2">
        {searchTerm && filteredObras.length > 0 && (
          <ul className="space-y-1 text-sm text-gray-700">
            {filteredObras.map((obra) => (
              <li
                key={obra.id}
                onClick={() => handleSelectObra(obra.id)}
                className="border-b border-gray-300 py-2 last:border-none cursor-pointer hover:bg-gray-100"
              >
                {obra.nome}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full mt-auto">
        <BotoesMenu 
          className="w-full"
          onSearchClick={closeSearchMenu}
          onFilterClick={onFilterClick}
          onListClick={onListClick}
        />
      </div>
    </div>
  );
};

export default React.memo(MenuProcurar);
