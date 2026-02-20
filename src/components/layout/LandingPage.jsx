import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const modules = [
  {
    path: '/animal-game',
    title: 'Animal Game',
    emoji: '🐶',
    description: 'Learn animal sounds and names',
    color: 'from-primary to-secondary',
  },
  {
    path: '/shape-match',
    title: 'Shape Match',
    emoji: '🔵',
    description: 'Match shapes and colors',
    color: 'from-secondary to-accent',
  },
  {
    path: '/counting',
    title: 'Counting',
    emoji: '🍎',
    description: 'Count from 1 to 5',
    color: 'from-accent to-primary',
  },
  {
    path: '/emotion-game',
    title: 'Emotions',
    emoji: '😊',
    description: 'Learn about feelings',
    color: 'from-primary to-accent',
  },
  {
    path: '/sports-game',
    title: 'Sports Gear',
    emoji: '⚽',
    description: 'Learn sports equipment',
    color: 'from-green-400 to-emerald-500',
  },
  {
    path: '/instruments-game',
    title: 'Instruments',
    emoji: '🎸',
    description: 'Discover musical instruments',
    color: 'from-purple-400 to-pink-500',
  },
  {
    path: '/vehicles-game',
    title: 'Vehicles',
    emoji: '🚗',
    description: 'Explore cars, trains, and more',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    path: '/landmarks-game',
    title: 'Landmarks',
    emoji: '🗼',
    description: 'Famous places around the world',
    color: 'from-yellow-400 to-orange-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-4">
            🎈 Guilt‑Free Kids
          </h1>
          <p className="text-xl text-text-secondary">Playground for ages 3‑4</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {modules.map((module) => (
            <motion.div key={module.path} variants={itemVariants}>
              <Link to={module.path} className="block">
                <div className={`rounded-3xl p-6 bg-gradient-to-br ${module.color} shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-8xl mb-4 text-center animate-float">
                      {module.emoji}
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center mb-2">
                      {module.title}
                    </h2>
                    <p className="text-white text-center text-lg">
                      {module.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="secondary" size="medium">
                📊 Parent Dashboard
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="secondary" size="medium">
                ⚙️ Settings
              </Button>
            </Link>
          </div>
          <p className="text-text-secondary mt-4">
            ✨ Tap any game to start learning! ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}