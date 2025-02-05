import React from 'react';

const BotaoSaibaMais: React.FC = () => {
    return (
        <a 
            href="https://github.com/unb-mds/2024-2-Urbanize" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed z-10 px-[7px] py-2 p-5 mt-3 text-[20px] ml-12 rounded-[10px] bg-customBlue text-white  hover:bg-blue-600 transition-colors duration-300"
        >
            Saiba Mais
        </a>
    );
};

export default BotaoSaibaMais;
