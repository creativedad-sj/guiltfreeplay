import { useCounting } from '../../hooks/useGameLogic/useCounting';
import GameLayout from '../common/GameLayout';
import FeedbackMessage from '../common/FeedbackMessage';
import Confetti from '../common/Confetti';

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

  return (
    <GameLayout title="Counting Fun" score={score}>
      <FeedbackMessage feedback={feedback} />

      <div className="text-center mb-6">
        <p className="text-text-secondary mb-2">How many {object.name}?</p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex justify-center gap-2 text-6xl bg-gray-100 py-6 px-8 rounded-full flex-wrap">
            {Array.from({ length: count }).map((_, i) => (
              <span key={i} className="inline-block animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {object.emoji}
              </span>
            ))}
          </div>
          <button
            onClick={() => speak(`How many ${object.name}?`)}
            className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl hover:bg-primary/30 transition-colors"
            aria-label="Repeat instruction"
          >
            🔊
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <div
            key={num}
            onClick={() => handleNumberClick(num)}
            className={`
              bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-4 text-2xl font-bold
              text-center cursor-pointer shadow-lg transition-all transform hover:scale-110 active:scale-90
              ${shakeId === num ? 'animate-shake' : ''}
            `}
            role="button"
            tabIndex={0}
          >
            {num}
          </div>
        ))}
      </div>

      {showConfetti && <Confetti />}
    </GameLayout>
  );
}