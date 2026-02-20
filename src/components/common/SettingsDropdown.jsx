import { useSettings } from '../../contexts/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsDropdown({ isOpen, onClose }) {
  const { soundEnabled, vibrationEnabled, toggleSound, toggleVibration } = useSettings();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-700">Settings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🔊 Sound</span>
            <button
              onClick={toggleSound}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">📳 Vibration</span>
            <button
              onClick={toggleVibration}
              className={`w-12 h-6 rounded-full transition-colors ${
                vibrationEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">Settings are saved automatically</p>
      </motion.div>
    </AnimatePresence>
  );
}