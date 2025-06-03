import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

const petals = Array.from({ length: 8 });

const petalVariants = {
  animate: i => ({
    rotate: i * 45,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }
  }),
  pulse: {
    scale: [1, 1.15, 1],
    transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
  }
};

const FlowerLoadingScreen = () => (
  <motion.div
    className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ width: 140, height: 140 }}
    >
      {/* Petals */}
      {petals.map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={petalVariants}
          animate={["animate", "pulse"]}
          className="absolute left-1/2 top-1/2"
          style={{
            originX: "50%",
            originY: "50%",
            x: -24,
            y: -60,
            zIndex: 1,
          }}
        >
          <Flower2 size={36} className="text-fuchsia-400 drop-shadow-lg" strokeWidth={2}/>
        </motion.div>
      ))}
      {/* Glowing AI core */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full shadow-2xl"
        style={{
          x: -28,
          y: -28,
          width: 56,
          height: 56,
          background: "radial-gradient(circle at 50% 50%, #60a5fa 60%, #818cf8 100%)",
          boxShadow: "0 0 32px 8px #818cf888",
        }}
        animate={{
          scale: [1, 1.05, 1],
          filter: [
            "drop-shadow(0 0 8px #60a5fa99)",
            "drop-shadow(0 0 16px #818cf8cc)",
            "drop-shadow(0 0 8px #60a5fa99)"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut"
        }}
      />
      {}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          x: -20,
          y: -20,
          zIndex: 2,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear"
        }}
      >
        {}
        <Flower2 size={40} className="text-blue-200 drop-shadow" strokeWidth={1.4}/>
      </motion.div>
    </motion.div>
    {}
    <motion.p
      className="mt-8 text-blue-200 text-base font-medium tracking-wide"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      
    </motion.p>
  </motion.div>
);

export default FlowerLoadingScreen;