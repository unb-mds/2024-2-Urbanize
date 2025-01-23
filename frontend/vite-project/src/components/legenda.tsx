import React from 'react';

interface LegendaProps {
  isDetailMenuOpen: boolean;
}

const Legenda: React.FC<LegendaProps> = ({ isDetailMenuOpen }) => {
  if (isDetailMenuOpen) return null;

  const LegendaItems = [
    {
      iconPath: '/public/marcadorVerde.svg',
      label: 'Em Execução, Cadastrada e Concluída',
    },
    {
      iconPath: '/public/marcadorVermelho.svg',
      label: 'Paralisada, Cancelada e Inacabada',
    },
  ];

  return (
    <div className="fixed z-10 bottom-5 right-4 p-4 bg-white shadow-md rounded-md border border-gray-300 font-mono">
      <h2 className="text-lg font-semibold mb-2">Tipos de marcadores de obras</h2>
      <ul>
        {LegendaItems.map((item, index) => (
          <li key={index} className="flex items-center mb-1">
            <img
              src={item.iconPath}
              alt={`${item.label} icon`}
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legenda;
