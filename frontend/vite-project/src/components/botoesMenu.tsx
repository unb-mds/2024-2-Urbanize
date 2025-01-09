import React from 'react';

interface BotoesMenuProps {
  className?: string;
  onFilterClick?: () => void;
  onListClick?: () => void;
  onSearchClick?: () => void; // Nova prop para o botão "Procurar"
  isArrowUp?: boolean; // Controla a rotação da seta no botão "Listar"
}

const BotoesMenu: React.FC<BotoesMenuProps> = ({ className, onFilterClick, onListClick, onSearchClick, isArrowUp }) => {
  return (
    <div className={`bg-customBlue text-white flex justify-around py-2 rounded-md ${className}`}>
      {/* Botão Procurar */}
      <div className="flex flex-col items-center">
        <button onClick={onSearchClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[14px] mt-1">Procurar</span>
        </button>
      </div>

      {/* Botão Listar */}
      <div className="flex flex-col items-center">
        <button onClick={onListClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isArrowUp ? 'rotate-90' : ''
            }`}
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm mt-1">Listar</span>
        </button>
      </div>

      {/* Botão Filtrar */}
      <div className="flex flex-col items-center">
        <button onClick={onFilterClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7 7V20a1 1 0 01-.553.894l-4 2A1 1 0 018 22v-6.586l-7-7A1 1 0 011 6V4a1 1 0 011-1z"
            />
          </svg>
          <span className="text-sm mt-1">Filtrar</span>
        </button>
      </div>
    </div>
  );
};

export default BotoesMenu;
