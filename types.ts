
export interface Cigarette {
  timestamp: number;
  reason: string;
}

export interface DailyData {
  date: string; // YYYY-MM-DD
  cigarettes: Cigarette[];
}
