import { useEmotionGame } from '../../hooks/useGameLogic/useEmotionGame';
import GameLayout from '../common/GameLayout';
import FeedbackMessage from '../common/FeedbackMessage';
import Stars from '../common/Stars';

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

  return (
    <GameLayout title="Emotion Game" score={score}>
      <FeedbackMessage feedback={feedback} />

      {target && (
        <div className="text-center mb-6">
          <p className="text-text-secondary mb-2">Find the...</p>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-full py-3 px-6">
            <div className={`inline-block px-4 py-2 rounded-full ${target.bg} ${target.color} text-2xl font-bold`}>
              {target.label} face {target.emoji}
            </div>
            <button
              onClick={() => speak(`Find the ${target.label} face`)}
              className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl hover:bg-primary/30 transition-colors"
              aria-label="Repeat instruction"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {options.map((emotion) => (
          <div
            key={emotion.id}
            onClick={() => handleEmotionClick(emotion)}
            className={`
              ${emotion.bg} rounded-3xl p-6 cursor-pointer shadow-lg flex flex-col items-center gap-2
              transition-all transform hover:scale-110 active:scale-90
              ${shakeId === emotion.id ? 'animate-shake' : ''}
            `}
            role="button"
            tabIndex={0}
          >
            <span className="text-7xl">{emotion.emoji}</span>
            <span className={`text-lg font-medium ${emotion.color}`}>{emotion.label}</span>
          </div>
        ))}
      </div>

      {showStars && <Stars />}
    </GameLayout>
  );
}