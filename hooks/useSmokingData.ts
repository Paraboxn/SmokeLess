
import { useState, useEffect, useCallback } from 'react';
import type { DailyData, Cigarette } from '../types';

const STORAGE_KEY = 'smokeLessData';

const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useSmokingData = () => {
  const [smokingData, setSmokingData] = useState<DailyData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        let parsedData: DailyData[] | any[] = JSON.parse(storedData);
        
        // Simple migration for old data structure
        if (parsedData.length > 0 && parsedData[0].hasOwnProperty('count')) {
            parsedData = parsedData.map(oldEntry => {
                // Robust date parsing to avoid cross-browser inconsistencies
                const [year, month, day] = oldEntry.date.split('-').map(Number);
                const dateForTimestamp = new Date(year, month - 1, day);

                return {
                    date: oldEntry.date,
                    cigarettes: Array.from({ length: oldEntry.count }, () => ({
                        timestamp: dateForTimestamp.getTime(),
                        reason: 'Inconnue'
                    }))
                };
            });
        }

        // Sort data just in case it's not ordered
        parsedData.sort((a, b) => a.date.localeCompare(b.date));
        setSmokingData(parsedData as DailyData[]);
      }
    } catch (error) {
      console.error("Failed to load or migrate data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(smokingData));
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [smokingData, isLoaded]);

  const addCigarette = useCallback((reason: string) => {
    const todayString = getTodayDateString();
    const newCigarette: Cigarette = { timestamp: Date.now(), reason };
    
    setSmokingData(prevData => {
      const todayDataIndex = prevData.findIndex(d => d.date === todayString);
      
      if (todayDataIndex !== -1) {
        // Update today's count
        return prevData.map((d, index) => 
          index === todayDataIndex ? { ...d, cigarettes: [...d.cigarettes, newCigarette] } : d
        );
      } else {
        // Add new entry for today and sort
        const newData = [...prevData, { date: todayString, cigarettes: [newCigarette] }];
        newData.sort((a, b) => a.date.localeCompare(b.date));
        return newData;
      }
    });
  }, []);

  return { smokingData, addCigarette, isLoaded };
};