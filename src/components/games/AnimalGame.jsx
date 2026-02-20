import { useAnimalGame } from '../../hooks/useGameLogic/useAnimalGame';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import { animals } from '../../utils/constants';
import GameLayout from '../common/GameLayout';
import GameOption from '../common/GameOption';
import Confetti from '../common/Confetti';
import FeedbackMessage from '../common/FeedbackMessage';

export default function AnimalGame() {
  const {
    currentAnimal,
    shuffledAnimals,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleAnimalClick,
    speak,
  } = useAnimalGame();

  const { imageErrors, loading } = useImagePreloader(animals);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-6xl animate-bounce mb-4">🐾</div>
        <div className="text-2xl text-text-secondary font-bold">Loading Fun...</div>
      </div>
    );
  }

  return (
    <GameLayout title="Animal Sounds" score={score}>
      <FeedbackMessage feedback={feedback} />

      {currentAnimal && (
        <div className="text-center mb-6">
          <p className="text-text-secondary mb-2">🔍 Find the...</p>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-full py-3 px-6">
            <span className="text-5xl animate-bounce">{currentAnimal.emoji}</span>
            <span className="text-3xl font-bold text-text-primary">{currentAnimal.name}</span>
            <button
              onClick={() => speak(`Find the ${currentAnimal.name}`)}
              className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl hover:bg-primary/30 transition-colors"
              aria-label="Repeat instruction"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {shuffledAnimals.map((animal) => (
          <GameOption
            key={animal.id}
            onClick={() => handleAnimalClick(animal)}
            isSelected={currentAnimal?.id === animal.id}
            shake={shakeId === animal.id}
          >
            <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-100 mb-2">
              {imageErrors[animal.id] ? (
                <span className="text-5xl">{animal.emoji}</span>
              ) : (
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <span className="text-3xl">{animal.emoji}</span>
            <span className="text-sm font-medium text-text-secondary">{animal.name}</span>
          </GameOption>
        ))}
      </div>

      {showConfetti && <Confetti />}
    </GameLayout>
  );
}