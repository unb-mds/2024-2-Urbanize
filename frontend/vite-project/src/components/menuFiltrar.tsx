import React, { useState, useEffect } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import { Range } from 'react-range';

interface FilterOptions {
  natureza: string;
  valueRange: [number, number];
  searchTerm: string; // Add this
}

interface MenuFiltrarProps {
  closeFilterMenu: () => void; // Função para redirecionar ao menu principal
  onSearchClick: () => void;
  onListClick: () => void;
  onFilterChange: (filters: FilterOptions) => void; // Update this prop
  currentFilters: FilterOptions; // Update this prop
  maxValue: number;
}

const MenuFiltrar: React.FC<MenuFiltrarProps> = ({ 
  closeFilterMenu, 
  onSearchClick, 
  onListClick,
  onFilterChange,
  currentFilters, // Update this
  maxValue
}) => {
  const [value, setValue] = useState('');
  const [name, setName] = useState(currentFilters.searchTerm); // Initialize with currentFilters.searchTerm
  const [natureza, setNatureza] = useState(currentFilters.natureza); // Initialize with currentFilters.natureza
  const [rangeValues, setRangeValues] = useState(currentFilters.valueRange); // Initialize with currentFilters.valueRange
  const [naturezas, setNaturezas] = useState<string[]>([]); // Estado para armazenar as naturezas

  useEffect(() => {
    const fetchNaturezas = async () => {
      try {
        const response = await fetch('https://two024-2-urbanize.onrender.com/api/projeto-investimento');
        const data = await response.json();
        const uniqueNaturezas = [...new Set(data.projetos.map((obra: any) => obra.natureza || 'Vazio'))];
        setNaturezas(uniqueNaturezas);
      } catch (error) {
        console.error('Erro ao buscar as naturezas:', error);
      }
    };

    fetchNaturezas();
  }, []);

  // Update local state when currentFilters changes
  useEffect(() => {
    setName(currentFilters.searchTerm);
    setNatureza(currentFilters.natureza);
    setRangeValues(currentFilters.valueRange);
  }, [currentFilters]);

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string) => {
    // Remove tudo que não seja número
    const numericValue = value.replace(/[^\d]/g, '');

    if (!numericValue) return '';

    // Adiciona os separadores de milhares e vírgula para decimais
    const formattedValue = (parseFloat(numericValue) / 100)
      .toFixed(2) // Garante duas casas decimais
      .replace('.', ',') // Troca ponto por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos para milhares

    return formattedValue;
  };

  function formatNumber(value: number): string {
    // Updated formatting to handle large numbers
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatCompactNumber(value: number): string {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(1)}K`;
    }
    return `R$ ${value.toFixed(0)}`;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatCurrency(inputValue);

    // Aplica a formatação no estado
    setValue(formattedValue);
  };

  const handleFilter = () => {
    onFilterChange({
      natureza,
      valueRange: rangeValues,
      searchTerm: name // Include the search term in the filter
    }); // Apply the filter
    // Removed closeFilterMenu() to keep menu open
  };

  const handleClear = () => {
    // Just clear the form fields without affecting the active filter
    setValue('');
    setName('');
    setNatureza('');
    setRangeValues([0, maxValue]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    handleFilter(); // Aplica o filtro
    return false; // Garante que o formulário não será enviado
  };

  return (
    <div className="">
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col fixed max-w-xs mx-auto my-1 z-10">
        <div className="w-full">
          <div className="text-center">
            <div onClick={closeFilterMenu} className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md cursor-pointer"></div>
            <h1 className="text-[40px] font-mono font-medium mt-2">URBANIZE</h1>
          </div>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="w-full flex-grow flex flex-col gap-1 p-3 bg-white mt-[-5px]"
          action="#" // Previne redirecionamento
          method="post" // Define método POST para evitar parâmetros na URL
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold">
              Nome da obra:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1 text-gray bg-customBlue text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="natureza" className="block text-gray-700 text-sm font-bold">
              Natureza:
            </label>
            <select
              id="natureza"
              value={natureza}
              onChange={(e) => setNatureza(e.target.value)}
              className="w-full px-2 py-1 text-gray bg-customBlue text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" className="text-gray-400">Todas</option>
              {naturezas.map((natureza, index) => (
                <option key={index} value={natureza}>{natureza}</option>
              ))}
            </select>
          </div>

          <div className="p-2">
            <label className="block text-gray-700 text-sm font-bold">
              Valor da obra:
            </label>
            <Range
              step={10000} // Ajustado para melhor granularidade
              min={0}
              max={maxValue}
              values={rangeValues}
              onChange={(values) => setRangeValues(values)}
              renderTrack={({ props, children }) => (
                <div {...props} className="bg-gray-200 h-2 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="h-3 w-3 rounded-full bg-customBlue shadow" />
              )}
            />
            <div className="flex justify-between mt-1 text-sm font-medium"> {/* Updated size and weight */}
              <span>{formatCompactNumber(rangeValues[0])}</span>
              <span>{formatCompactNumber(rangeValues[1])}</span>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="w-20 py-0.5 mb-0.5 bg-customBlue text-white font-bold rounded-[10px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-20 py-0.5 mb-0.5 bg-customBlue text-white font-bold rounded-[10px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Limpar
            </button>
          </div>
        </form>

        <div className="w-full mt-auto">
          <BotoesMenu 
            className="w-full"
            onFilterClick={closeFilterMenu}
            onSearchClick={onSearchClick}
            onListClick={onListClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuFiltrar;