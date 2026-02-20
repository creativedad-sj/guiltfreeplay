import { useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export const useSpeech = () => {
  const { voiceEnabled } = useSettings();

  const speak = useCallback((text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech to avoid overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;      // slightly slower for kids
    utterance.pitch = 1.2;      // a bit higher, friendlier
    utterance.volume = 1;
    utterance.lang = 'en-US';

    // Try to pick a friendly female voice (optional)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google UK English Female'));
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  return speak;
};