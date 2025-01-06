import React from 'react';

interface TituloMenus {
  className?: string;  // Definindo que o componente aceita a propriedade 'className'
}

const TituloMenus: React.FC<TituloMenus> = ({ className }) => {
    return (
        <div className="text-center border-b border-gray-300">
          <div className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md"></div>
          <h1 className="text-[40px] font-mono font-medium mt-2">URBANIZE</h1>
        </div>
    );
};

export default TituloMenus;