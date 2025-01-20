import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';
import { Range } from 'react-range';

interface MenuFiltrarProps {
  closeFilterMenu: () => void; // Função para redirecionar ao menu principal
  onSearchClick: () => void;
  onListClick: () => void;
}

const MenuFiltrar: React.FC<MenuFiltrarProps> = ({ 
  closeFilterMenu, 
  onSearchClick, 
  onListClick 
}) => {
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rangeValues, setRangeValues] = useState([0, 1000000]);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatCurrency(inputValue);

    // Aplica a formatação no estado
    setValue(formattedValue);
  };

  const handleFilter = () => {
    alert('Filtrar botão clicado!');
    handleClear(); // Clear the input values after filtering
  };

  const handleClear = () => {
    setValue('');
    setName('');
    setCategory('');
    setRangeValues([0, 1000000]);
  };

  return (
    <div className="">
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col items-center fixed max-w-xs mx-auto my-6 z-10">
        <div onClick={closeFilterMenu} className="cursor-pointer w-full">
          {/* O clique na div redireciona ao menu principal */}
          <TituloMenus />
        </div>

        <form className="w-full flex flex-col gap-2 p-3 bg-white mt-[-5px]">
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
              className="w-full px-3 py-2 text-gray bg-customBlue text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold">
              Categoria:
            </label>
            <input
              type="text"
              id="category"
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-customBlue text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="p-3">
            <label className="block text-gray-700 text-sm font-bold">
              Valor da obra:
            </label>
            <Range
              step={100}
              min={0}
              max={1000000}
              values={rangeValues}
              onChange={(values) => setRangeValues(values)}
              renderTrack={({ props, children }) => (
                <div {...props} className="bg-gray-200 h-2 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="h-4 w-4 rounded-full bg-customBlue shadow" />
              )}
            />
            <div className="flex justify-between mt-1">
              <span>{rangeValues[0]}</span>
              <span>{rangeValues[1]}</span>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={handleFilter}
              className="w-20 py-1 mb-1 bg-customBlue text-white font-bold rounded-[10px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-20 py-1 mb-1 bg-customBlue text-white font-bold rounded-[10px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Limpar
            </button>
          </div>
        </form>

        <BotoesMenu 
          className="w-full mt-[-10px]" 
          onFilterClick={closeFilterMenu}
          onSearchClick={onSearchClick}
          onListClick={onListClick}
        />
      </div>
    </div>
  );
};

export default MenuFiltrar;