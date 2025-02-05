import React from 'react';

interface TituloMenus {
  className?: string;  // Definindo que o componente aceita a propriedade 'className'
}

const TituloMenus: React.FC<TituloMenus> = ({ className }) => {
  return (
      <div className={`text-center border-gray-300 font-mono ${className}`}>
        <div className="w-[92px] h-[9px] bg-customBlue mx-auto mt-3 rounded-md"></div>
        <h1 className="text-[40px] font-medium mt-2 sm:text-[50px] md:text-[30px] lg:text-[40px] ">URBANIZE</h1>
        <p className="text-[11px] mt-[-5px] mb-2 sm:text-[30px] md:text-[20px] lg:text-[11px]">Mapeamento de obras e serviços públicos</p>
        <p className="text-[11px] mt-[-5px] mb-2 sm:text-[30px] md:text-[20px] lg:text-[11px]">do Distrito Federal</p>
      </div>
  );
};

export default TituloMenus;