import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';
import SettingsDropdown from './SettingsDropdown';

export default function GameLayout({ title, children, score, homeLink = '/' }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6 relative">
          <Link to={homeLink}>
            <Button variant="secondary" size="small">← Home</Button>
          </Link>

          <div className="flex items-center gap-3">
            {score !== undefined && (
              <motion.div 
                key={score} 
                initial={{ scale: 1.5 }} 
                animate={{ scale: 1 }} 
                className="score-badge"
              >
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

        <h1 className="text-3xl font-bold text-center text-text-primary mb-6">{title}</h1>

        <div className="kid-card">
          {children}
        </div>
      </div>
    </div>
  );
}