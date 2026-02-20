import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'large', 
  className = '', 
  disabled = false, 
  ...props 
}) {
  const baseClass = 'kid-button'; // Base kid-friendly button

  const variants = {
    primary: 'bg-primary hover:bg-primary/90',
    secondary: 'bg-secondary hover:bg-secondary/90',
    success: 'bg-success hover:bg-success/90',
    danger: 'bg-error hover:bg-error/90',
  };

  const sizes = {
    small: 'py-2 px-4 text-xl',
    medium: 'py-3 px-6 text-2xl',
    large: 'py-4 px-8 text-3xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {children}
    </motion.button>
  );
}