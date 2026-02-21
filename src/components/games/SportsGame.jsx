import { useCategoryGame } from '../../hooks/useGameLogic/useCategoryGame';
import { sportsEquipment } from '../../utils/constants';
import GameLayout from '../common/GameLayout';
import GameOption from '../common/GameOption';
import Confetti from '../common/Confetti';
import FeedbackMessage from '../common/FeedbackMessage';
import { useState, useEffect } from 'react';

export default function SportsGame() {
  const {
    currentItem,
    shuffledItems,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleItemClick,
    speak,
  } = useCategoryGame(sportsEquipment, 'sports-game', 'Sports Equipment');

  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GameLayout title="Sports Equipment" score={score}>
      <FeedbackMessage feedback={feedback} />

      {currentItem && (
        <div className="text-center mb-3">
          <p className="text-text-secondary text-sm mb-1">Find the...</p>
          <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full py-2 px-4">
            <span className="text-5xl">{currentItem.emoji}</span>
            <span className="text-2xl font-bold text-text-primary">{currentItem.name}</span>
            <button
              onClick={() => speak(`Find the ${currentItem.name}`)}
              className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl hover:bg-primary/30 transition-colors"
              aria-label="Repeat instruction"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      <div className={`
        grid gap-3 place-items-center h-full
        ${orientation === 'portrait' 
          ? 'grid-cols-2 grid-rows-2' 
          : 'grid-cols-4 grid-rows-1'
        }
      `}>
        {shuffledItems.map((item) => (
          <GameOption
            key={item.id}
            onClick={() => handleItemClick(item)}
            shake={shakeId === item.id}
          >
            <span className="text-7xl">{item.emoji}</span>
            <span>{item.name}</span>
          </GameOption>
        ))}
      </div>

      {showConfetti && <Confetti />}
    </GameLayout>
  );
}