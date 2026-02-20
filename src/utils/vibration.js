export const triggerVibration = (duration = 200) => {
  if (window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(duration);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }
};