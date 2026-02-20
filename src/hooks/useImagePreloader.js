import { useState, useEffect } from 'react';

export const useImagePreloader = (items) => {
  const [imageErrors, setImageErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      items.map(item => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = item.image;
          img.onload = resolve;
          img.onerror = () => {
            setImageErrors(prev => ({ ...prev, [item.id]: true }));
            resolve();
          };
        });
      })
    ).then(() => setLoading(false));
  }, [items]);

  return { imageErrors, loading };
};