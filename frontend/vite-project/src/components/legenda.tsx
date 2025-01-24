import React from 'react';

const Legenda: React.FC = () => {
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
    <div className="fixed z-10 bottom-[720px] right-0 p-4 bg-white shadow-md rounded-md border border-gray-300 font-mono
    md:bottom-5 
    md:right-10
    xl:right-30

    ">
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
