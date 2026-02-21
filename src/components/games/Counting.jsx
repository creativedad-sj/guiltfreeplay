import { useCounting } from '../../hooks/useGameLogic/useCounting';
import GameLayout from '../common/GameLayout';
import GameOption from '../common/GameOption';
import Confetti from '../common/Confetti';
import FeedbackMessage from '../common/FeedbackMessage';
import { useState, useEffect } from 'react';

export default function Counting() {
  const {
    count,
    object,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleNumberClick,
    speak,
  } = useCounting();

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
    <GameLayout title="Counting Fun" score={score}>
      <FeedbackMessage feedback={feedback} />

      <div className="text-center mb-3">
        <p className="text-text-secondary text-sm mb-1">How many {object.name}?</p>
        <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full py-2 px-4">
          <div className="flex gap-1 text-4xl">
            {Array.from({ length: count }).map((_, i) => (
              <span key={i}>{object.emoji}</span>
            ))}
          </div>
          <button
            onClick={() => speak(`How many ${object.name}?`)}
            className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl hover:bg-primary/30 transition-colors"
            aria-label="Repeat instruction"
          >
            🔊
          </button>
        </div>
      </div>

      <div className={`
        grid gap-3 place-items-center h-full
        ${orientation === 'portrait' 
          ? 'grid-cols-2 grid-rows-2' 
          : 'grid-cols-4 grid-rows-1'
        }
      `}>
        {[1,2,3,4,5,6,7,8,9,10].map((num) => (
          <GameOption
            key={num}
            onClick={() => handleNumberClick(num)}
            shake={shakeId === num}
          >
            <span className="text-7xl">{num}</span>
            <span>Number {num}</span>
          </GameOption>
        ))}
      </div>

      {showConfetti && <Confetti />}
    </GameLayout>
  );
}