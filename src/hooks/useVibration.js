import { useSettings } from '../contexts/SettingsContext';
import { triggerVibration as baseTrigger } from '../utils/vibration';

export const useVibration = () => {
  const { vibrationEnabled } = useSettings();

  return (duration = 200) => {
    if (vibrationEnabled) {
      baseTrigger(duration);
    }
  };
};