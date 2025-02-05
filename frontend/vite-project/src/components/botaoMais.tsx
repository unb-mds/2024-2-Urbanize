import React from 'react';

const BotaoSaibaMais: React.FC = () => {
    return (
        <a
            href="https://github.com/unb-mds/2024-2-Urbanize"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed z-10 flex mt-[-10px] flex-col items-center ml-11 text-[15px] font-bold text-customBlue transition-colors duration-300 hover:scale-110 sm:text-[60px] md:text-[30px] lg:text-[15px]"

        >
            <img
                src="/logoUrbanize.svg"
                alt="Urbanize Logo"
                style={{ width: '140px', height: '140px' }} 
                className=" transition-transform duration-300 hover:scale-110 "

            />
            <span className="font-mono mt-[-40px]">Saiba Mais</span>
        </a>
    );
};

export default BotaoSaibaMais;
