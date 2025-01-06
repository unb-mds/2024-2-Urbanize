import React from 'react';

interface TituloMenus {
  className?: string;  // Definindo que o componente aceita a propriedade 'className'
}

const TituloMenus: React.FC<TituloMenus> = ({ className }) => {
    return (
        <div className="text-center py-3 border-b border-gray-300">
          <div className="w-[50px] h-1 bg-[#104177] mx-auto mt-2 rounded-md"></div>
          <h1 className="text-2xl font-mono font-medium">URBANIZE</h1>
        </div>
    );
};

export default TituloMenus;