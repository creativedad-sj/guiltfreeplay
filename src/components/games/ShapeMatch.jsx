import { useShapeMatch } from '../../hooks/useGameLogic/useShapeMatch';
import GameLayout from '../common/GameLayout';
import GameOption from '../common/GameOption';
import Stars from '../common/Stars';
import FeedbackMessage from '../common/FeedbackMessage';
import { useState, useEffect } from 'react';

export default function ShapeMatch() {
  const {
    currentShape,
    options,
    score,
    feedback,
    shakeId,
    showStars,
    handleOptionClick,
    speak,
  } = useShapeMatch();

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
    <GameLayout title="Shape Match" score={score}>
      <FeedbackMessage feedback={feedback} />

      {currentShape && (
        <div className="text-center mb-3">
          <p className="text-text-secondary text-sm mb-1">Find the...</p>
          <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full py-2 px-4">
            <div className={`w-10 h-10 ${currentShape.color} rounded flex items-center justify-center text-white text-2xl`}>
              {currentShape.emoji}
            </div>
            <span className="text-2xl font-bold text-text-primary">{currentShape.name}</span>
            <button
              onClick={() => speak(`Find the ${currentShape.name}`)}
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
        {options.map((shape) => (
          <GameOption
            key={shape.id}
            onClick={() => handleOptionClick(shape)}
            shake={shakeId === shape.id}
          >
            <div className={`w-20 h-20 ${shape.color} rounded-xl flex items-center justify-center text-white text-5xl`}>
              {shape.emoji}
            </div>
            <span>{shape.name}</span>
          </GameOption>
        ))}
      </div>

      {showStars && <Stars />}
    </GameLayout>
  );
}