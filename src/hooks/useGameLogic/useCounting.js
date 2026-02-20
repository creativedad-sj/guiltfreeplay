import { useState, useCallback, useEffect } from 'react';
import { useSound } from '../useSound';
import { useVibration } from '../useVibration';
import { useSpeech } from '../useSpeech';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { countingObjects } from '../../utils/constants';

export const useCounting = () => {
  const { recordAttempt } = useGameProgress();
  const speak = useSpeech();
  const [count, setCount] = useState(1);
  const [object, setObject] = useState(countingObjects[0]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const playCorrectSound = useSound('correct');
  const playWrongSound = useSound('wrong');
  const vibrate = useVibration();

  const nextRound = useCallback(() => {
    const newCount = Math.floor(Math.random() * 10) + 1; // 1-10
    const newObject = countingObjects[Math.floor(Math.random() * countingObjects.length)];
    setCount(newCount);
    setObject(newObject);
    setFeedback({ show: false, type: '', message: '' });
    speak(`How many ${newObject.name}?`);
  }, [speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleNumberClick = (num) => {
    setAttempts(prev => prev + 1);
    if (num === count) {
      setScore(prev => prev + 1);
      setShowConfetti(true);
      playCorrectSound?.();
      recordAttempt('counting', true);
      setFeedback({ show: true, type: 'success', message: '🎉 Great counting!' });
      setTimeout(() => {
        setShowConfetti(false);
        nextRound();
      }, 1500);
    } else {
      vibrate(200);
      playWrongSound?.();
      setShakeId(num);
      recordAttempt('counting', false);
      setFeedback({ show: true, type: 'error', message: 'Oops! Try again' });
      setTimeout(() => {
        setShakeId(null);
        setFeedback({ show: false, type: '', message: '' });
      }, 800);
    }
  };

  return {
    count,
    object,
    score,
    attempts,
    feedback,
    shakeId,
    showConfetti,
    handleNumberClick,
    speak,
  };
};