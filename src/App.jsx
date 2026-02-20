import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { GameProgressProvider } from './contexts/GameProgressContext';
import LandingPage from './components/layout/LandingPage';

// Existing games
const AnimalGame = lazy(() => import('./components/games/AnimalGame'));
const ShapeMatch = lazy(() => import('./components/games/ShapeMatch'));
const Counting = lazy(() => import('./components/games/Counting'));
const EmotionGame = lazy(() => import('./components/games/EmotionGame'));

// New games
const SportsGame = lazy(() => import('./components/games/SportsGame'));
const InstrumentsGame = lazy(() => import('./components/games/InstrumentsGame'));
const VehiclesGame = lazy(() => import('./components/games/VehiclesGame'));
const LandmarksGame = lazy(() => import('./components/games/LandmarksGame'));

// Dashboard and settings
const ParentDashboard = lazy(() => import('./components/pages/ParentDashboard'));
const Settings = lazy(() => import('./components/pages/Settings'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="text-6xl animate-bounce mb-4">🎮</div>
      <div className="text-2xl text-text-secondary font-bold">Loading fun...</div>
    </div>
  </div>
);

function App() {
  return (
    <SettingsProvider>
      <GameProgressProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/animal-game" element={<AnimalGame />} />
            <Route path="/shape-match" element={<ShapeMatch />} />
            <Route path="/counting" element={<Counting />} />
            <Route path="/emotion-game" element={<EmotionGame />} />
            <Route path="/sports-game" element={<SportsGame />} />
            <Route path="/instruments-game" element={<InstrumentsGame />} />
            <Route path="/vehicles-game" element={<VehiclesGame />} />
            <Route path="/landmarks-game" element={<LandmarksGame />} />
            <Route path="/dashboard" element={<ParentDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </GameProgressProvider>
    </SettingsProvider>
  );
}

export default App;