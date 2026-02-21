import { useEmotionGame } from '../../hooks/useGameLogic/useEmotionGame';
import GameLayout from '../common/GameLayout';
import GameOption from '../common/GameOption';
import Stars from '../common/Stars';
import FeedbackMessage from '../common/FeedbackMessage';
import { useState, useEffect } from 'react';

export default function EmotionGame() {
  const {
    target,
    options,
    score,
    feedback,
    shakeId,
    showStars,
    handleEmotionClick,
    speak,
  } = useEmotionGame();

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
    <GameLayout title="Emotion Game" score={score}>
      <FeedbackMessage feedback={feedback} />

      {target && (
        <div className="text-center mb-3">
          <p className="text-text-secondary text-sm mb-1">Find the...</p>
          <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full py-2 px-4">
            <span className="text-4xl">{target.emoji}</span>
            <span className="text-2xl font-bold text-text-primary">{target.label}</span>
            <button
              onClick={() => speak(`Find the ${target.label} face`)}
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
        {options.map((emotion) => (
          <GameOption
            key={emotion.id}
            onClick={() => handleEmotionClick(emotion)}
            shake={shakeId === emotion.id}
          >
            <span className="text-7xl">{emotion.emoji}</span>
            <span>{emotion.label}</span>
          </GameOption>
        ))}
      </div>

      {showStars && <Stars />}
    </GameLayout>
  );
}