// Helper to get correct asset path from public folder
export const getAssetPath = (path) => `/${path}`;

export const getAudioPath = (filename) => getAssetPath(`assets/audio/${filename}`);
export const getImagePath = (filename) => getAssetPath(`assets/images/${filename}`);
export const getAnimalImagePath = (filename) => getAssetPath(`assets/images/animals/${filename}`);
export const getAnimationPath = (filename) => getAssetPath(`assets/animations/${filename}`);