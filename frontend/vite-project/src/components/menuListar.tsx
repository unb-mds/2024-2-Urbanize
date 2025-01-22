import React, { useState, useEffect } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import MenuDetalhar from './menuDetalhar'; // Importe o novo componente

interface MenuListarProps {
  // ...existing props...
  filterNatureza: string;
}

const MenuListar: React.FC<MenuListarProps> = ({ 
  closeListMenu, 
  onFilterClick, 
  onSearchClick, 
  isArrowUp,
  filterNatureza 
}) => {
  const [obraSelecionada, setObraSelecionada] = useState<string | null>(null);
  const [obras, setObras] = useState<any[]>([]); // Estado para armazenar as obras
  const [filteredObras, setFilteredObras] = useState<any[]>([]); // Estado para armazenar as obras filtradas
  const [especies, setEspecies] = useState<string[]>([]); // Estado para armazenar as espécies
  const [eixos, setEixos] = useState<string[]>([]); // Estado para armazenar os eixos
  const [selectedEspecie, setSelectedEspecie] = useState<string>(''); // Estado para a espécie selecionada
  const [selectedEixo, setSelectedEixo] = useState<string>(''); // Estado para o eixo selecionado

  useEffect(() => {
    const fetchObras = async () => {
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

          allObras = [...allObras, ...data.projetos];
          page += 1;
        } catch (error) {
          console.error('Erro ao buscar as obras:', error);
          hasMoreData = false;
        }
      }

      const sortedObras = allObras.sort((a, b) => a.nome.trim().toLowerCase().localeCompare(b.nome.trim().toLowerCase()));
      setObras(sortedObras);
      setFilteredObras(sortedObras);

      const uniqueEspecies = [...new Set(allObras.map((obra) => obra.especie || 'Vazio'))];
      const uniqueEixos = [...new Set(allObras.flatMap((obra) => (obra.eixos.length ? obra.eixos.map((eixo) => eixo.descricao) : ['Vazio'])))];
      setEspecies(uniqueEspecies);
      setEixos(uniqueEixos);
    };

    fetchObras();
  }, []);

  useEffect(() => {
    let filtered = obras;

    // Apply natureza filter from parent component
    if (filterNatureza) {
      filtered = filtered.filter((obra) => obra.natureza === filterNatureza);
    }

    // Apply local filters
    if (selectedEspecie) {
      filtered = filtered.filter((obra) => (obra.especie || 'Vazio') === selectedEspecie);
    }

    if (selectedEixo) {
      filtered = filtered.filter((obra) => (obra.eixos.length ? obra.eixos.some((eixo: any) => eixo.descricao === selectedEixo) : selectedEixo === 'Vazio'));
    }

    setFilteredObras(filtered.sort((a, b) => a.nome.trim().toLowerCase().localeCompare(b.nome.trim().toLowerCase())));
  }, [selectedEspecie, selectedEixo, obras, filterNatureza]); // Add filterNatureza to dependencies

  if (obraSelecionada) {
    return (
      <MenuDetalhar
        obraDetalhada={obraSelecionada}
        closeDetailMenu={() => setObraSelecionada(null)}
      />
    );
  }

  return (
    <div>
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col fixed max-w-xs mx-auto my-1 z-10">
        {/* Cabeçalho */}
        <div className="w-full">
          <div className="text-center">
            <div onClick={closeListMenu} className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md cursor-pointer"></div>
            <h1 className="text-[40px] font-mono font-medium mt-2">URBANIZE</h1>
          </div>
        </div>

        {/* Filtros */}
        <div className="p-3 flex gap-2">
          <div className="flex-1">
            <label htmlFor="especie" className="block text-gray-700 text-sm font-bold">Espécie:</label>
            <select
              id="especie"
              value={selectedEspecie}
              onChange={(e) => setSelectedEspecie(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 bg-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Todas</option>
              {especies.map((especie, index) => (
                <option key={index} value={especie}>{especie}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="eixo" className="block text-gray-700 text-sm font-bold">Eixo:</label>
            <select
              id="eixo"
              value={selectedEixo}
              onChange={(e) => setSelectedEixo(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 bg-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Todos</option>
              {eixos.map((eixo, index) => (
                <option key={index} value={eixo}>{eixo}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Obras */}
        <div className="w-full flex-grow flex flex-col p-3 bg-white mt-[-5px] overflow-y-auto scroll-container">
          <ul className="space-y-1 text-sm text-gray-700">
            {filteredObras.map((obra, index) => (
              <li
                key={index}
                onClick={() => setObraSelecionada(obra.id)}
                className="border-b border-gray-300 py-2 last:border-none cursor-pointer hover:bg-gray-100"
              >
                {obra.nome}
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar com navegação */}
        <BotoesMenu 
          className="w-full"
          onListClick={closeListMenu}
          onFilterClick={onFilterClick}
          onSearchClick={onSearchClick}
          isArrowUp={isArrowUp}
        />
      </div>
    </div>
  );
};

export default MenuListar;
