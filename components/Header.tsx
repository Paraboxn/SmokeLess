
import React from 'react';

const FireIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.657a.75.75 0 010 1.061l-1.061 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM5.404 14.596a.75.75 0 010-1.06l1.06-1.061a.75.75 0 011.061 1.06l-1.06 1.06a.75.75 0 01-1.06 0zM14.596 14.596a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 111.06-1.06l1.06 1.06a.75.75 0 010 1.06zM6.464 6.717a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 011.06-1.061l1.06 1.06a.75.75 0 010 1.06z" clipRule="evenodd" />
    <path d="M10 0a10 10 0 100 20 10 10 0 000-20zM3.684 12.316A7.5 7.5 0 0112.5 4.54v.003l-.001-.002a7.5 7.5 0 01-8.814 7.775z" />
     <path d="M9.462 3.11a.75.75 0 01.077 1.06l-.001.002a7.5 7.5 0 008.814 7.775 7.47 7.47 0 01-1.516.488.75.75 0 01-.607-1.353 5.98 5.98 0 00-.001-9.458.75.75 0 011.059-.08z" fill="#f97316" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center text-center mb-8 md:mb-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        Smoke<span className="text-orange-500">Less</span>
      </h1>
    </header>
  );
};
