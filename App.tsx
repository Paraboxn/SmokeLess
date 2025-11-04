
import React, { useState } from 'react';
import { useSmokingData } from './hooks/useSmokingData';
import { Header } from './components/Header';
import { Counter } from './components/Counter';
import { HistoryGraph } from './components/HistoryGraph';
import { PatchReminder } from './components/PatchReminder';
import { AddCigaretteModal } from './components/AddCigaretteModal';

const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
  const { smokingData, addCigarette, isLoaded } = useSmokingData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayCount = smokingData.find(d => d.date === getTodayDateString())?.cigarettes.length || 0;

  const handleAddCigaretteWithReason = (reason: string) => {
    if (reason.trim()) {
      addCigarette(reason);
    }
    setIsModalOpen(false);
  };

  if (!isLoaded) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-100 font-sans">
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <Counter todayCount={todayCount} onAddCigarette={() => setIsModalOpen(true)} />
          </div>
          <div className="md:col-span-2">
            <PatchReminder />
          </div>
        </div>
        <HistoryGraph data={smokingData} />
      </main>
      <AddCigaretteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCigaretteWithReason}
      />
    </div>
  );
};

export default App;