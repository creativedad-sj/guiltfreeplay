import { useState, useCallback, useEffect } from 'react';
import { useSound } from '../useSound';
import { useVibration } from '../useVibration';
import { useSpeech } from '../useSpeech';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { emotions } from '../../utils/constants';

const generateOptions = (target) => {
  const options = [target];
  while (options.length < 3) {
    const random = emotions[Math.floor(Math.random() * emotions.length)];
    if (!options.some(e => e.id === random.id)) {
      options.push(random);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

export const useEmotionGame = () => {
  const { recordAttempt } = useGameProgress();
  const speak = useSpeech();
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showStars, setShowStars] = useState(false);

  const playCorrectSound = useSound('correct');
  const playWrongSound = useSound('wrong');
  const vibrate = useVibration();

  const nextRound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * emotions.length);
    const newTarget = emotions[randomIndex];
    setTarget(newTarget);
    setOptions(generateOptions(newTarget));
    setFeedback({ show: false, type: '', message: '' });
    speak(`Find the ${newTarget.label} face`);
  }, [speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleEmotionClick = (emotion) => {
    setAttempts(prev => prev + 1);
    if (emotion.id === target.id) {
      setScore(prev => prev + 1);
      setShowStars(true);
      playCorrectSound?.();
      recordAttempt('emotion-game', true);
      setFeedback({ show: true, type: 'success', message: '😊 You got it!' });
      setTimeout(() => {
        setShowStars(false);
        nextRound();
      }, 1500);
    } else {
      vibrate(200);
      playWrongSound?.();
      setShakeId(emotion.id);
      recordAttempt('emotion-game', false);
      setFeedback({ show: true, type: 'error', message: 'Not quite...' });
      setTimeout(() => {
        setShakeId(null);
        setFeedback({ show: false, type: '', message: '' });
      }, 800);
    }
  };

  return {
    target,
    options,
    score,
    attempts,
    feedback,
    shakeId,
    showStars,
    handleEmotionClick,
    speak,
  };
};