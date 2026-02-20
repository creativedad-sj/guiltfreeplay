import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Confetti({ duration = 2000 }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 5 + Math.random() * 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }));
    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1000 }}>
      {pieces.map(piece => (
        <motion.div key={piece.id}
          initial={{ x: `${piece.x}vw`, y: `${piece.y}vh`, rotate: piece.rotation, scale:0 }}
          animate={{ y: '120vh', rotate: piece.rotation + 360, scale: [0,1,1,0.5] }}
          transition={{ duration: 1.5 + piece.delay, ease: 'easeOut', delay: piece.delay }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
}