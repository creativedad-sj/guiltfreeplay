import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';
import SettingsDropdown from './SettingsDropdown';

export default function GameLayout({ title, children, score, homeLink = '/' }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
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
    <div className="h-screen flex flex-col bg-background p-2 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 relative flex-shrink-0">
        <Link to={homeLink}>
          <Button variant="secondary" size="small">← Home</Button>
        </Link>

        <div className="flex items-center gap-2">
          {score !== undefined && (
            <motion.div key={score} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="score-badge">
              ⭐ {score}
            </motion.div>
          )}

          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-2xl hover:bg-gray-50 transition-colors"
              aria-label="Settings"
            >
              ⚙️
            </button>
            <SettingsDropdown isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-text-primary mb-2 flex-shrink-0">{title}</h1>

      {/* Game content – takes remaining space, no scroll */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-lg max-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}