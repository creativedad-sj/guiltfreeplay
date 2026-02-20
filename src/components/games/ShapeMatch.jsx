import { useShapeMatch } from '../../hooks/useGameLogic/useShapeMatch';
import GameLayout from '../common/GameLayout';
import FeedbackMessage from '../common/FeedbackMessage';
import Stars from '../common/Stars';

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

  return (
    <GameLayout title="Shape Match" score={score}>
      <FeedbackMessage feedback={feedback} />

      {currentShape && (
        <div className="text-center mb-6">
          <p className="text-text-secondary mb-2">Find the...</p>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-full py-3 px-6">
            <div className={`w-16 h-16 ${currentShape.color} rounded-lg flex items-center justify-center text-4xl text-white`}>
              {currentShape.emoji}
            </div>
            <span className="text-3xl font-bold text-text-primary">{currentShape.name}</span>
            <button
              onClick={() => speak(`Find the ${currentShape.name}`)}
              className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl hover:bg-primary/30 transition-colors"
              aria-label="Repeat instruction"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((shape) => (
          <div
            key={shape.id}
            onClick={() => handleOptionClick(shape)}
            className={`
              ${shape.color} rounded-2xl p-6 cursor-pointer shadow-lg flex flex-col items-center gap-2
              transition-all transform hover:scale-105 active:scale-95
              ${shakeId === shape.id ? 'animate-shake' : ''}
              ${currentShape?.id === shape.id ? 'ring-4 ring-primary ring-opacity-50' : ''}
            `}
            role="button"
            tabIndex={0}
          >
            <span className="text-7xl text-white">{shape.emoji}</span>
            <span className="text-xl font-medium text-white">{shape.name}</span>
          </div>
        ))}
      </div>

      {showStars && <Stars />}
    </GameLayout>
  );
}