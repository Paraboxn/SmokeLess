
import React, { useState, useEffect } from 'react';

interface AddCigaretteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (reason: string) => void;
}

const PRESET_REASONS = [
  { reason: 'Anxious', emoji: '😟' },
  { reason: 'Bored', emoji: '🥱' },
  { reason: 'Socializing', emoji: '👥' },
  { reason: 'Happy', emoji: '😊' },
];


export const AddCigaretteModal: React.FC<AddCigaretteModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [customReason, setCustomReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCustomReason('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCustomReasonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customReason.trim()) {
      onAdd(customReason.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Fermer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="modal-title" className="text-2xl font-bold text-center mb-6">Pourquoi cette cigarette ?</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {PRESET_REASONS.map(({ reason, emoji }) => (
            <button 
              key={reason}
              onClick={() => onAdd(reason)}
              className="p-4 bg-gray-800 rounded-lg text-lg hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 flex flex-col items-center justify-center gap-2 h-28"
            >
              <span className="text-4xl" aria-hidden="true">{emoji}</span>
              <span>{reason}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleCustomReasonSubmit}>
          <label htmlFor="custom-reason" className="block text-sm font-medium text-gray-400 mb-2">
            Autre raison
          </label>
          <div className="flex gap-2">
            <input 
              id="custom-reason"
              type="text"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Ex: Après le repas"
              className="flex-grow bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              type="submit"
              className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              disabled={!customReason.trim()}
            >
              Ajouter
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};