import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [vibrationEnabled, setVibrationEnabled] = useState(() => {
    const saved = localStorage.getItem('vibrationEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    const saved = localStorage.getItem('voiceEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('vibrationEnabled', JSON.stringify(vibrationEnabled));
  }, [vibrationEnabled]);

  useEffect(() => {
    localStorage.setItem('voiceEnabled', JSON.stringify(voiceEnabled));
  }, [voiceEnabled]);

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleVibration = () => setVibrationEnabled(prev => !prev);
  const toggleVoice = () => setVoiceEnabled(prev => !prev);

  return (
    <SettingsContext.Provider value={{
      soundEnabled,
      vibrationEnabled,
      voiceEnabled,
      toggleSound,
      toggleVibration,
      toggleVoice,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};