import { motion } from 'framer-motion';

export default function GameOption({
  children,
  onClick,
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
      className={`
        bg-white rounded-2xl shadow-lg p-2 flex flex-col items-center cursor-pointer
        border-2 border-transparent hover:border-primary/50 transition-all
        ${className}
      `}
      role="button"
      tabIndex={0}
      {...props}
    >
      {/* Large emoji / image */}
      <div className="w-28 h-28 flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 mb-1">
        {children[0]}
      </div>
      {/* Name label */}
      <span className="text-base font-medium text-text-secondary text-center">
        {children[1]}
      </span>
    </motion.div>
  );
}