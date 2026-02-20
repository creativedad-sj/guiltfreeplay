import { motion } from 'framer-motion';

export default function GameOption({
  children,
  onClick,
  isSelected = false,
  shake = false,
  className = '',
  ...props
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        shake
          ? {
              x: [-10, 10, -10, 10, -5, 5, 0],
              transition: { duration: 0.4 },
            }
          : {}
      }
      onClick={onClick}
      className={`game-option ${isSelected ? 'border-primary ring-4 ring-primary/20' : ''} ${className}`}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </motion.div>
  );
}