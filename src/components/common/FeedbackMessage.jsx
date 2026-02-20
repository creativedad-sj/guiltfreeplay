import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackMessage({ feedback }) {
  if (!feedback.show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 ${
          feedback.type === 'success' ? 'feedback-success' : 'feedback-error'
        }`}
      >
        {feedback.message}
      </motion.div>
    </AnimatePresence>
  );
}