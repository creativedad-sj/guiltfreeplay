import React, { createContext, useContext, useState, useEffect } from 'react';

const GameProgressContext = createContext();

export const useGameProgress = () => useContext(GameProgressContext);

const STORAGE_KEY = 'gameProgress';

const defaultGameStats = {
  attempts: 0,
  correct: 0,
  lastPlayed: null,
  history: [],
};

export const GameProgressProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordAttempt = (gameId, isCorrect) => {
    setStats(prev => {
      const gameStats = prev[gameId] || { ...defaultGameStats };
      const newStats = {
        ...gameStats,
        attempts: gameStats.attempts + 1,
        correct: gameStats.correct + (isCorrect ? 1 : 0),
        lastPlayed: new Date().toISOString(),
      };
      const history = gameStats.history || [];
      const newHistory = [
        { date: new Date().toISOString(), correct: isCorrect ? 1 : 0 },
        ...history.slice(0, 9),
      ];
      newStats.history = newHistory;
      return {
        ...prev,
        [gameId]: newStats,
      };
    });
  };

  const resetGameStats = (gameId) => {
    if (gameId) {
      setStats(prev => ({
        ...prev,
        [gameId]: { ...defaultGameStats },
      }));
    } else {
      setStats({});
    }
  };

  return (
    <GameProgressContext.Provider value={{ stats, recordAttempt, resetGameStats }}>
      {children}
    </GameProgressContext.Provider>
  );
};