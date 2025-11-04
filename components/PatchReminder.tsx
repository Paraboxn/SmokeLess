
import React from 'react';

const PatchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PatchReminder: React.FC = () => {
    return (
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex items-center h-full border-l-4 border-orange-500">
            <div className="flex-shrink-0 mr-4">
                <PatchIcon />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Rappel quotidien</h3>
                <p className="text-gray-300">N'oubliez pas votre patch aujourd'hui !</p>
            </div>
        </div>
    );
};