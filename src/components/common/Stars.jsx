import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Stars({ duration = 1000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1000 }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div key={i}
          initial={{ scale:0, opacity:1 }}
          animate={{ scale:2, opacity:0 }}
          transition={{ duration:1, delay:i*0.03 }}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: 'gold',
            fontSize: '2rem',
          }}>
          ⭐
        </motion.div>
      ))}
    </div>
  );
}