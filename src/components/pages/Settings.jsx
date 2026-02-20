import { Link } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import Button from '../common/Button';

export default function Settings() {
  const {
    soundEnabled,
    vibrationEnabled,
    voiceEnabled,
    toggleSound,
    toggleVibration,
    toggleVoice,
  } = useSettings();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto kid-card">
        <h1 className="text-3xl font-bold text-text-primary mb-6">Parent Settings</h1>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-lg font-medium">🔊 Sound Effects</span>
            <button
              onClick={toggleSound}
              className={`toggle-switch ${soundEnabled ? 'bg-success' : 'bg-gray-300'}`}
              data-enabled={soundEnabled}
            >
              <div className="toggle-knob" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-lg font-medium">📳 Vibration</span>
            <button
              onClick={toggleVibration}
              className={`toggle-switch ${vibrationEnabled ? 'bg-success' : 'bg-gray-300'}`}
              data-enabled={vibrationEnabled}
            >
              <div className="toggle-knob" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-lg font-medium">🗣️ Voice Instructions</span>
            <button
              onClick={toggleVoice}
              className={`toggle-switch ${voiceEnabled ? 'bg-success' : 'bg-gray-300'}`}
              data-enabled={voiceEnabled}
            >
              <div className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="primary">← Back to Games</Button>
          </Link>
        </div>

        <p className="text-xs text-text-secondary text-center mt-4">
          Settings are saved automatically
        </p>
      </div>
    </div>
  );
}