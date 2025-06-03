import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartOff, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <HeartOff size={80} className="text-primary-600 mx-auto" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-secondary-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/dashboard" 
            className="btn btn-primary"
          >
            <Home size={18} />
            Return to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;