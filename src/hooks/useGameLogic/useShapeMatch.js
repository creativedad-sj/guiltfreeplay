import { useState, useCallback, useEffect } from 'react';
import { useSound } from '../useSound';
import { useVibration } from '../useVibration';
import { useSpeech } from '../useSpeech';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { shapes } from '../../utils/constants';

const generateOptions = (targetShape) => {
  const options = [targetShape];
  const otherShapes = shapes.filter(s => s.id !== targetShape.id);
  const shuffled = otherShapes.sort(() => Math.random() - 0.5);
  const count = Math.min(3, shuffled.length); // ensure we have up to 3 others
  for (let i = 0; i < count; i++) {
    options.push(shuffled[i]);
  }
  return options.sort(() => Math.random() - 0.5);
};

export const useShapeMatch = () => {
  const { recordAttempt } = useGameProgress();
  const speak = useSpeech();
  const [currentShape, setCurrentShape] = useState(null);
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
    const randomIndex = Math.floor(Math.random() * shapes.length);
    const shape = shapes[randomIndex];
    setCurrentShape(shape);
    setOptions(generateOptions(shape));
    setFeedback({ show: false, type: '', message: '' });
    speak(`Find the ${shape.name}`);
  }, [speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionClick = (shape) => {
    setAttempts(prev => prev + 1);
    if (shape.id === currentShape.id) {
      setScore(prev => prev + 1);
      setShowStars(true);
      playCorrectSound?.();
      recordAttempt('shape-match', true);
      speak('Amazing!');
      setFeedback({ show: true, type: 'success', message: '🌟 Perfect!' });
      setTimeout(() => {
        setShowStars(false);
        nextRound();
      }, 1500);
    } else {
      vibrate(200);
      playWrongSound?.();
      setShakeId(shape.id);
      recordAttempt('shape-match', false);
      speak('Try again');
      setFeedback({ show: true, type: 'error', message: 'Try again!' });
      setTimeout(() => {
        setShakeId(null);
        setFeedback({ show: false, type: '', message: '' });
      }, 800);
    }
  };

  return {
    currentShape,
    options,
    score,
    attempts,
    feedback,
    shakeId,
    showStars,
    handleOptionClick,
    speak,
  };
};