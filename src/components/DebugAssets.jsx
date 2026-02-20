import { useState, useEffect } from 'react';
import { getAnimalImagePath, getAudioPath } from '../utils/assetPath';
import { motion } from 'framer-motion';

export default function DebugAssets() {
  const [imageStatus, setImageStatus] = useState({});
  const [audioStatus, setAudioStatus] = useState({});
  const [testSound, setTestSound] = useState(null);

  const animals = ['cow', 'dog', 'cat', 'sheep', 'duck'];
  const audioFiles = ['cow', 'dog', 'cat', 'sheep', 'duck', 'correct', 'wrong'];

  useEffect(() => {
    // Check images in public folder
    animals.forEach(animal => {
      const imgPath = getAnimalImagePath(`${animal}.jpg`);
      console.log(`Checking image: ${imgPath}`);
      
      const img = new Image();
      img.src = imgPath;
      img.onload = () => {
        setImageStatus(prev => ({ ...prev, [animal]: '✅ Loaded' }));
      };
      img.onerror = () => {
        setImageStatus(prev => ({ ...prev, [animal]: '❌ Not Found' }));
      };
    });

    // Check audio files in public folder
    audioFiles.forEach(audio => {
      const audioPath = getAudioPath(`${audio}.mp3`);
      console.log(`Checking audio: ${audioPath}`);
      
      fetch(audioPath, { method: 'HEAD' })
        .then(res => {
          setAudioStatus(prev => ({ 
            ...prev, 
            [audio]: res.ok ? '✅ Found' : '❌ Not Found' 
          }));
        })
        .catch(() => {
          setAudioStatus(prev => ({ ...prev, [audio]: '❌ Error' }));
        });
    });
  }, []);

  const testAudioPlay = (audioFile) => {
    const audio = new Audio(getAudioPath(`${audioFile}.mp3`));
    audio.play()
      .then(() => console.log(`Playing ${audioFile}`))
      .catch(err => console.error(`Failed to play ${audioFile}:`, err));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-xl m-4 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-4 text-purple-600">🔍 Asset Debugger</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="font-bold text-lg mb-2">📁 Public Folder Structure:</p>
        <code className="block bg-gray-800 text-white p-3 rounded text-sm">
          public/<br/>
          ├── assets/<br/>
          │   ├── audio/<br/>
          │   │   ├── cow.mp3<br/>
          │   │   ├── dog.mp3<br/>
          │   │   └── ...<br/>
          │   └── images/<br/>
          │       └── animals/<br/>
          │           ├── cow.jpg<br/>
          │           ├── dog.jpg<br/>
          │           └── ...<br/>
          └── ...
        </code>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span>🖼️</span> Images (public/assets/images/animals/)
          </h3>
          <div className="space-y-2">
            {animals.map(animal => (
              <div key={animal} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-medium">{animal}.jpg</span>
                <span className={imageStatus[animal]?.includes('✅') ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {imageStatus[animal] || '⏳ Checking...'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span>🔊</span> Audio (public/assets/audio/)
          </h3>
          <div className="space-y-2">
            {audioFiles.map(audio => (
              <div key={audio} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{audio}.mp3</span>
                  <button
                    onClick={() => testAudioPlay(audio)}
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    disabled={audioStatus[audio] !== '✅ Found'}
                  >
                    Test
                  </button>
                </div>
                <span className={audioStatus[audio]?.includes('✅') ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {audioStatus[audio] || '⏳ Checking...'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
        <p className="font-bold text-lg mb-2">📌 Quick Fix Guide:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Make sure files are in: <code className="bg-gray-200 px-1">public/assets/images/animals/</code></li>
          <li>Make sure files are in: <code className="bg-gray-200 px-1">public/assets/audio/</code></li>
          <li>File names must match EXACTLY (case-sensitive)</li>
          <li>Extensions: .jpg for images, .mp3 for audio</li>
          <li>Refresh the page after moving files</li>
        </ul>
      </div>

      <div className="mt-4 text-center">
        <a 
          href="/" 
          className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          ← Back to Games
        </a>
      </div>
    </motion.div>
  );
}