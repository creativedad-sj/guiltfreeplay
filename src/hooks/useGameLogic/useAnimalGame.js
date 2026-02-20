import { useState, useCallback, useEffect } from 'react';
import { useSound } from '../useSound';
import { useVibration } from '../useVibration';
import { useSpeech } from '../useSpeech';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { animals } from '../../utils/constants';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const useAnimalGame = () => {
  const { recordAttempt } = useGameProgress();
  const speak = useSpeech();
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [shuffledAnimals, setShuffledAnimals] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const playCorrectSound = useSound('correct');
  const playWrongSound = useSound('wrong');
  const vibrate = useVibration();

  const animalSounds = {};
  animals.forEach(animal => { animalSounds[animal.id] = useSound(animal.sound); });

  const nextRound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const newAnimal = animals[randomIndex];
    setCurrentAnimal(newAnimal);
    setShuffledAnimals(shuffle(animals));
    setFeedback({ show: false, type: '', message: '' });
    speak(`Find the ${newAnimal.name}`);
  }, [speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleAnimalClick = (animal) => {
    setAttempts(prev => prev + 1);
    animalSounds[animal.id]?.();

    if (animal.id === currentAnimal.id) {
      setScore(prev => prev + 1);
      setShowConfetti(true);
      playCorrectSound?.();
      recordAttempt('animal-game', true);
      setFeedback({ show: true, type: 'success', message: '🎉 Amazing!' });
      setTimeout(() => {
        setShowConfetti(false);
        nextRound();
      }, 1500);
    } else {
      vibrate(200);
      playWrongSound?.();
      setShakeId(animal.id);
      recordAttempt('animal-game', false);
      setFeedback({ show: true, type: 'error', message: 'Try again!' });
      setTimeout(() => {
        setShakeId(null);
        setFeedback({ show: false, type: '', message: '' });
      }, 800);
    }
  };

  return {
    currentAnimal,
    shuffledAnimals,
    score,
    attempts,
    feedback,
    shakeId,
    showConfetti,
    handleAnimalClick,
    speak, // expose for repeat button
  };
};