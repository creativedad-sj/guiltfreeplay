import { Link } from 'react-router-dom';
import { useGameProgress } from '../../contexts/GameProgressContext';
import Button from '../common/Button';

const gameInfo = {
  'animal-game': { name: 'Animal Game', icon: '🐶' },
  'shape-match': { name: 'Shape Match', icon: '🔵' },
  'counting': { name: 'Counting', icon: '🍎' },
  'emotion-game': { name: 'Emotion Game', icon: '😊' },
};

export default function ParentDashboard() {
  const { stats, resetGameStats } = useGameProgress();

  const calculateAccuracy = (correct, attempts) => {
    if (attempts === 0) return 0;
    return Math.round((correct / attempts) * 100);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Never';
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📊 Parent Dashboard</h1>
          <Link to="/">
            <Button variant="secondary">← Back to Games</Button>
          </Link>
        </div>

        {/* Overall Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Overall Progress</h2>
          {Object.keys(stats).length === 0 ? (
            <p className="text-gray-500">No games played yet. Let's start playing!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Object.values(stats).reduce((acc, g) => acc + g.attempts, 0)}
                </div>
                <div className="text-gray-600">Total Attempts</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Object.values(stats).reduce((acc, g) => acc + g.correct, 0)}
                </div>
                <div className="text-gray-600">Total Correct</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {calculateAccuracy(
                    Object.values(stats).reduce((acc, g) => acc + g.correct, 0),
                    Object.values(stats).reduce((acc, g) => acc + g.attempts, 0)
                  )}%
                </div>
                <div className="text-gray-600">Overall Accuracy</div>
              </div>
            </div>
          )}
        </div>

        {/* Per-Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(gameInfo).map(([gameId, info]) => {
            const gameStats = stats[gameId] || { attempts: 0, correct: 0, lastPlayed: null, history: [] };
            return (
              <div key={gameId} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{info.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">{info.name}</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attempts:</span>
                    <span className="font-semibold">{gameStats.attempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Correct:</span>
                    <span className="font-semibold">{gameStats.correct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-semibold">
                      {calculateAccuracy(gameStats.correct, gameStats.attempts)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Played:</span>
                    <span className="font-semibold text-sm">{formatDate(gameStats.lastPlayed)}</span>
                  </div>
                </div>

                {gameStats.history && gameStats.history.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-500 mb-2">Recent attempts:</p>
                    <div className="flex gap-1 flex-wrap">
                      {gameStats.history.slice(0, 5).map((entry, idx) => (
                        <span
                          key={idx}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            entry.correct ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}
                          title={new Date(entry.date).toLocaleString()}
                        >
                          {entry.correct ? '✓' : '✗'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => resetGameStats(gameId)}
                  className="mt-4 text-sm text-red-500 hover:text-red-700"
                >
                  Reset {info.name} stats
                </button>
              </div>
            );
          })}
        </div>

        {/* Global Reset */}
        <div className="mt-8 text-center">
          <button
            onClick={() => resetGameStats()}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Reset All Stats
          </button>
        </div>
      </div>
    </div>
  );
}