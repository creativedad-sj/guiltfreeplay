import { getAssetPath } from './assetPath';

// ---------- Animals ----------
export const animals = [
  {
    id: 'cow',
    name: 'Cow',
    emoji: '🐮',
    sound: 'cow',
    image: getAssetPath('assets/images/animals/cow.jpg'),
    color: 'bg-amber-600',
  },
  {
    id: 'dog',
    name: 'Dog',
    emoji: '🐶',
    sound: 'dog',
    image: getAssetPath('assets/images/animals/dog.jpg'),
    color: 'bg-orange-400',
  },
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    sound: 'cat',
    image: getAssetPath('assets/images/animals/cat.jpg'),
    color: 'bg-gray-400',
  },
  {
    id: 'sheep',
    name: 'Sheep',
    emoji: '🐑',
    sound: 'sheep',
    image: getAssetPath('assets/images/animals/sheep.jpg'),
    color: 'bg-white',
  },
  {
    id: 'duck',
    name: 'Duck',
    emoji: '🦆',
    sound: 'duck',
    image: getAssetPath('assets/images/animals/duck.jpg'),
    color: 'bg-yellow-400',
  },
];

// ---------- Shapes ----------
export const shapes = [
  { id: 'circle', name: 'Circle', emoji: '⬤', color: 'bg-red-400' },
  { id: 'square', name: 'Square', emoji: '■', color: 'bg-blue-400' },
  { id: 'triangle', name: 'Triangle', emoji: '▲', color: 'bg-green-400' },
  { id: 'rectangle', name: 'Rectangle', emoji: '▬', color: 'bg-yellow-400' },
  { id: 'star', name: 'Star', emoji: '★', color: 'bg-purple-400' },
  { id: 'heart', name: 'Heart', emoji: '♥', color: 'bg-pink-400' },
  { id: 'oval', name: 'Oval', emoji: '⬭', color: 'bg-indigo-400' },
  { id: 'diamond', name: 'Diamond', emoji: '♦', color: 'bg-orange-400' },
];

// ---------- Counting Objects ----------
export const countingObjects = [
  { emoji: '🍎', name: 'apples' },
  { emoji: '⚽', name: 'balls' },
  { emoji: '⭐', name: 'stars' },
  { emoji: '🚗', name: 'cars' },
  { emoji: '🐶', name: 'dogs' },
  { emoji: '📚', name: 'books' },
];

// ---------- Emotions ----------
export const emotions = [
  { id: 'happy', emoji: '😊', label: 'happy', bg: 'bg-yellow-200', color: 'text-yellow-800' },
  { id: 'sad', emoji: '😢', label: 'sad', bg: 'bg-blue-200', color: 'text-blue-800' },
  { id: 'angry', emoji: '😠', label: 'angry', bg: 'bg-red-200', color: 'text-red-800' },
  { id: 'surprised', emoji: '😲', label: 'surprised', bg: 'bg-purple-200', color: 'text-purple-800' },
  { id: 'scared', emoji: '😨', label: 'scared', bg: 'bg-gray-200', color: 'text-gray-800' },
  { id: 'silly', emoji: '😜', label: 'silly', bg: 'bg-green-200', color: 'text-green-800' },
];

// ---------- Sports Equipment ----------
export const sportsEquipment = [
  { id: 'ball', name: 'Ball', emoji: '⚽', image: getAssetPath('assets/images/sports/ball.jpg') },
  { id: 'bat', name: 'Bat', emoji: '🏏', image: getAssetPath('assets/images/sports/bat.jpg') },
  { id: 'racket', name: 'Racket', emoji: '🎾', image: getAssetPath('assets/images/sports/racket.jpg') },
  { id: 'glove', name: 'Glove', emoji: '🧤', image: getAssetPath('assets/images/sports/glove.jpg') },
  { id: 'helmet', name: 'Helmet', emoji: '⛑️', image: getAssetPath('assets/images/sports/helmet.jpg') },
  { id: 'skateboard', name: 'Skateboard', emoji: '🛹', image: getAssetPath('assets/images/sports/skateboard.jpg') },
];

// ---------- Musical Instruments ----------
export const instruments = [
  { id: 'piano', name: 'Piano', emoji: '🎹', image: getAssetPath('assets/images/instruments/piano.jpg') },
  { id: 'guitar', name: 'Guitar', emoji: '🎸', image: getAssetPath('assets/images/instruments/guitar.jpg') },
  { id: 'drums', name: 'Drums', emoji: '🥁', image: getAssetPath('assets/images/instruments/drums.jpg') },
  { id: 'violin', name: 'Violin', emoji: '🎻', image: getAssetPath('assets/images/instruments/violin.jpg') },
  { id: 'trumpet', name: 'Trumpet', emoji: '🎺', image: getAssetPath('assets/images/instruments/trumpet.jpg') },
  { id: 'flute', name: 'Flute', emoji: '🎼', image: getAssetPath('assets/images/instruments/flute.jpg') },
];

// ---------- Vehicles ----------
export const vehicles = [
  { id: 'car', name: 'Car', emoji: '🚗', image: getAssetPath('assets/images/vehicles/car.jpg') },
  { id: 'bus', name: 'Bus', emoji: '🚌', image: getAssetPath('assets/images/vehicles/bus.jpg') },
  { id: 'train', name: 'Train', emoji: '🚂', image: getAssetPath('assets/images/vehicles/train.jpg') },
  { id: 'airplane', name: 'Airplane', emoji: '✈️', image: getAssetPath('assets/images/vehicles/airplane.jpg') },
  { id: 'boat', name: 'Boat', emoji: '⛵', image: getAssetPath('assets/images/vehicles/boat.jpg') },
  { id: 'bicycle', name: 'Bicycle', emoji: '🚲', image: getAssetPath('assets/images/vehicles/bicycle.jpg') },
];

// ---------- Landmarks ----------
export const landmarks = [
  { id: 'eiffel', name: 'Eiffel Tower', emoji: '🗼', image: getAssetPath('assets/images/landmarks/eiffel.jpg') },
  { id: 'pyramid', name: 'Pyramid', emoji: '🔺', image: getAssetPath('assets/images/landmarks/pyramid.jpg') },
  { id: 'statue', name: 'Statue of Liberty', emoji: '🗽', image: getAssetPath('assets/images/landmarks/statue.jpg') },
  { id: 'taj', name: 'Taj Mahal', emoji: '🕌', image: getAssetPath('assets/images/landmarks/taj.jpg') },
  { id: 'bigben', name: 'Big Ben', emoji: '⏰', image: getAssetPath('assets/images/landmarks/bigben.jpg') },
];