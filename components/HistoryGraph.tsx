
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { DailyData } from '../types';

interface HistoryGraphProps {
  data: DailyData[];
}

type TimePeriod = 7 | 14 | 30 | 60;
const TIME_PERIODS: TimePeriod[] = [7, 14, 30, 60];

const processDataForGraph = (data: DailyData[], days: number) => {
    const dataMap = new Map(data.map(item => [item.date, item.cigarettes.length]));
    const result = [];
    const today = new Date();
  
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      const count = dataMap.get(dateString) || 0;
      
      result.push({
        name: date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
        date: dateString,
        cigarettes: count,
      });
    }
    return result;
};


export const HistoryGraph: React.FC<HistoryGraphProps> = ({ data }) => {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>(7);

    const availablePeriods = useMemo(() => {
        if (!data || data.length === 0) return [];
        const firstDate = new Date(data[0].date);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - firstDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        return TIME_PERIODS.filter(period => diffDays >= period);
    }, [data]);
    
    // Adjust timePeriod if it becomes unavailable
    React.useEffect(() => {
        if (availablePeriods.length > 0 && !availablePeriods.includes(timePeriod)) {
            setTimePeriod(availablePeriods[availablePeriods.length - 1]);
        } else if (availablePeriods.length === 0) {
            setTimePeriod(7); // default
        }
    }, [availablePeriods, timePeriod]);


    const chartData = useMemo(() => processDataForGraph(data, timePeriod), [data, timePeriod]);
    
    const todayString = useMemo(() => new Date().toISOString().split('T')[0], []);

    const totalCigarettes = data.reduce((sum, day) => sum + day.cigarettes.length, 0);

    if (totalCigarettes === 0) {
        return (
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center h-96 flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold mb-2 text-white">Historique</h3>
                <p className="text-gray-400">Commencez à enregistrer pour voir votre progression.</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white mb-4 sm:mb-0">Votre consommation</h3>
                <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
                    {TIME_PERIODS.map(period => (
                        <button
                            key={period}
                            onClick={() => setTimePeriod(period)}
                            disabled={!availablePeriods.includes(period)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                timePeriod === period ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                            } ${!availablePeriods.includes(period) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {period}j
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                            contentStyle={{
                                backgroundColor: '#111827',
                                borderColor: '#374151',
                                borderRadius: '0.5rem',
                                color: '#e5e7eb'
                            }}
                            labelStyle={{ fontWeight: 'bold' }}
                        />
                        <Bar dataKey="cigarettes" name="Cigarettes" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.date === todayString ? "#ea580c" : "#f97316"} />
                             ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};