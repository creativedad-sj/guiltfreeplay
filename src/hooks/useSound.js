import { Howl } from 'howler';
import { useRef, useCallback } from 'react';
import { getAudioPath } from '../utils/assetPath';
import { useSettings } from '../contexts/SettingsContext';

const soundMap = {
  cow: getAudioPath('cow.mp3'),
  dog: getAudioPath('dog.mp3'),
  cat: getAudioPath('cat.mp3'),
  sheep: getAudioPath('sheep.mp3'),
  duck: getAudioPath('duck.mp3'),
  correct: getAudioPath('correct.mp3'),
  wrong: getAudioPath('wrong.mp3'),
};

export function useSound(soundName) {
  const { soundEnabled } = useSettings();
  const soundRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Initialize Howl instance
  if (!soundRef.current && soundName && soundMap[soundName]) {
    soundRef.current = new Howl({
      src: [soundMap[soundName]],
      html5: true,
      preload: true,
      onend: () => { isPlayingRef.current = false; },
    });
  }

  const play = useCallback(() => {
    if (!soundEnabled || !soundRef.current) return;
    
    // Stop current playback if any
    if (isPlayingRef.current) {
      soundRef.current.stop();
    }
    
    soundRef.current.play();
    isPlayingRef.current = true;
  }, [soundEnabled]);

  return play;
}