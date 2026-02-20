import { useState, useCallback, useEffect } from 'react';
import { useSound } from '../useSound';
import { useVibration } from '../useVibration';
import { useSpeech } from '../useSpeech';
import { useGameProgress } from '../../contexts/GameProgressContext';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const useCategoryGame = (categoryItems, gameId, categoryName) => {
  const { recordAttempt } = useGameProgress();
  const speak = useSpeech();
  const [currentItem, setCurrentItem] = useState(null);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const playCorrectSound = useSound('correct');
  const playWrongSound = useSound('wrong');
  const vibrate = useVibration();

  // Pre-create sound hooks for items that have sounds
  const itemSounds = {};
  categoryItems.forEach(item => {
    if (item.sound) {
      itemSounds[item.id] = useSound(item.sound);
    }
  });

  const nextRound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * categoryItems.length);
    const newItem = categoryItems[randomIndex];
    setCurrentItem(newItem);
    // Show 4 random items (including target)
    const otherItems = categoryItems.filter(i => i.id !== newItem.id);
    const shuffledOthers = shuffle(otherItems).slice(0, 3); // take 3 others
    const options = shuffle([newItem, ...shuffledOthers]);
    setShuffledItems(options);
    setFeedback({ show: false, type: '', message: '' });
    speak(`Find the ${newItem.name}`);
  }, [categoryItems, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleItemClick = (item) => {
    setAttempts(prev => prev + 1);
    if (itemSounds[item.id]) itemSounds[item.id]();

    if (item.id === currentItem.id) {
      setScore(prev => prev + 1);
      setShowConfetti(true);
      playCorrectSound?.();
      recordAttempt(gameId, true);
      setFeedback({ show: true, type: 'success', message: '🎉 Great!' });
      setTimeout(() => {
        setShowConfetti(false);
        nextRound();
      }, 1500);
    } else {
      vibrate(200);
      playWrongSound?.();
      setShakeId(item.id);
      recordAttempt(gameId, false);
      setFeedback({ show: true, type: 'error', message: 'Try again!' });
      setTimeout(() => {
        setShakeId(null);
        setFeedback({ show: false, type: '', message: '' });
      }, 800);
    }
  };

  return {
    currentItem,
    shuffledItems,
    score,
    attempts,
    feedback,
    shakeId,
    showConfetti,
    handleItemClick,
    speak,
  };
};