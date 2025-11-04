
import React from 'react';

interface CounterProps {
  todayCount: number;
  onAddCigarette: () => void;
}

const PlusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const Counter: React.FC<CounterProps> = ({ todayCount, onAddCigarette }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center h-full">
      <h2 className="text-lg font-medium text-gray-400 mb-2">Aujourd'hui</h2>
      <p className="text-7xl font-bold text-white mb-6">{todayCount}</p>
      <button
        onClick={onAddCigarette}
        aria-label="Ajouter une cigarette"
        className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
      >
        <PlusIcon />
      </button>
    </div>
  );
};