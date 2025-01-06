import React, { useState } from 'react';
import BotoesMenu from './botoesMenu';
import TituloMenus from './tituloMenus';

interface MenuFiltrarProps {
  closeFilterMenu: () => void; // Função para redirecionar ao menu principal
}

const MenuFiltrar: React.FC<MenuFiltrarProps> = ({ closeFilterMenu }) => {
  const [value, setValue] = useState('');

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string) => {
    // Remove tudo que não seja número ou vírgula
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');

    // Verifica se há mais de 2 casas decimais e remove
    const [integer, decimal] = numericValue.split('.');
    const formattedDecimal = decimal ? decimal.slice(0, 2) : '';

    // Recria a string com o número formatado
    const formattedValue = `${integer}${formattedDecimal ? '.' + formattedDecimal : ''}`;
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
  };

  return (
    <div className="">
      <div className="bottom-5 left-10 w-64 h-[400px] bg-white rounded-[10px] shadow-lg flex flex-col items-center fixed max-w-xs mx-auto my-6 rounded-t-lg z-10">
        <div onClick={closeFilterMenu} className="cursor-pointer w-full">
          {/* O clique na div redireciona ao menu principal */}
          <TituloMenus />
        </div>

        <form className="w-full flex flex-col gap-2 p-3 bg-white mt-[-5px] ">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold ">
              Nome da obra:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              className="w-full px-3 py-2  text-gray bg-[#104177] text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-[#104177] text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="value" className="block text-gray-700 text-sm font-bold">
              Valor da obra:
            </label>
            <input
              type="text"
              id="value"
              value={value}
              onChange={handleChange}
              placeholder="R$ Valor"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-[#104177] text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleFilter}
              className="w-20 py-1 mt-1 bg-[#104177] text-white font-bold rounded-[10px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Filtrar
            </button>
          </div>
        </form>

        <BotoesMenu className="w-full mt-0" />
      </div>
    </div>
  );
};

export default MenuFiltrar;
