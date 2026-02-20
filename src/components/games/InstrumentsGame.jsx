import { useCategoryGame } from '../../hooks/useGameLogic/useCategoryGame';
import { instruments } from '../../utils/constants';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import GameLayout from '../common/GameLayout';
import GameOption from '../common/GameOption';
import Confetti from '../common/Confetti';
import FeedbackMessage from '../common/FeedbackMessage';

export default function InstrumentsGame() {
  const {
    currentItem,
    shuffledItems,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleItemClick,
    speak,
  } = useCategoryGame(instruments, 'instruments-game', 'Musical Instruments');

  const { imageErrors, loading } = useImagePreloader(instruments);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-6xl animate-bounce mb-4">🎸</div>
        <div className="text-2xl text-text-secondary font-bold">Loading Fun...</div>
      </div>
    );
  }

  return (
    <GameLayout title="Musical Instruments" score={score}>
      <FeedbackMessage feedback={feedback} />

      {currentItem && (
        <div className="text-center mb-6">
          <p className="text-text-secondary mb-2">Find the...</p>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-full py-3 px-6">
            <span className="text-5xl">{currentItem.emoji}</span>
            <span className="text-3xl font-bold text-text-primary">{currentItem.name}</span>
            <button
              onClick={() => speak(`Find the ${currentItem.name}`)}
              className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl hover:bg-primary/30 transition-colors"
              aria-label="Repeat instruction"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {shuffledItems.map((item) => (
          <GameOption
            key={item.id}
            onClick={() => handleItemClick(item)}
            isSelected={currentItem?.id === item.id}
            shake={shakeId === item.id}
          >
            <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-100 mb-2">
              {imageErrors[item.id] ? (
                <span className="text-5xl">{item.emoji}</span>
              ) : (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <span className="text-3xl">{item.emoji}</span>
            <span className="text-sm font-medium text-text-secondary">{item.name}</span>
          </GameOption>
        ))}
      </div>

      {showConfetti && <Confetti />}
    </GameLayout>
  );
}