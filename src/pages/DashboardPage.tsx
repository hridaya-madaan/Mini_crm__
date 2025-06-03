import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BarChart3,
  BellRing,
  Wallet,
  TrendingUp,
  Flower2,
  Sparkles,
  Calendar,
  ArrowRight,
  Smile,
} from 'lucide-react';

const flowerColors = [
  'text-fuchsia-400',
  'text-violet-400',
  'text-blue-400',
  'text-pink-400',
  'text-yellow-400',
  'text-green-400',
];

const statCards = [
  {
    title: 'Total Users',
    value: '2,505',
    change: '+49 this month',
    icon: Users,
    iconColor: 'text-fuchsia-300',
    border: 'border-fuchsia-700/30',
    bg: 'bg-fuchsia-700/10',
    trend: 'up',
  },
  {
    title: 'Active Campaigns',
    value: '5',
    change: '+1 running',
    icon: BellRing,
    iconColor: 'text-purple-300',
    border: 'border-purple-700/30',
    bg: 'bg-purple-700/10',
    trend: 'up',
  },
  {
    title: 'Revenue Impact',
    value: '₹67.9K',
    change: '+19.9% growth',
    icon: Wallet,
    iconColor: 'text-green-300',
    border: 'border-green-700/30',
    bg: 'bg-green-700/10',
    trend: 'up',
  },
  {
    title: 'Engagement Rate',
    value: '25.1%',
    change: 'Bloom on Mondays!',
    icon: BarChart3,
    iconColor: 'text-yellow-300',
    border: 'border-yellow-700/30',
    bg: 'bg-yellow-700/10',
    trend: 'up',
  },
];

const blossomQuotes = [
  "Let your campaigns bloom with care 🌸",
  "Growth is a journey—water your roots daily 🌱",
  "Every customer is a seed—nurture and watch them flourish 🌻",
  "Bright ideas blossom into loyal fans! 🌷",
];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blossomIdx, setBlossomIdx] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setBlossomIdx((idx) => (idx + 1) % blossomQuotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  // Flower animation: petal positions
  const flowerPetals = Array.from({ length: 6 });

  return (
    <div className="min-h-screen h-full overflow-y-auto pb-8 bg-gradient-to-br from-[#18122B] via-[#393053] to-[#443C68]">
      {/* Interactive header with flower icon and greeting */}
      <div className="flex items-center gap-3 mb-8">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="relative inline-block"
        >
          <Flower2 size={44} className="text-fuchsia-300 drop-shadow animate-spin-slow" />
          {/* Spinning petals */}
          {flowerPetals.map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: 16 + 25 * Math.cos((i / 6) * 2 * Math.PI),
                top: 16 + 25 * Math.sin((i / 6) * 2 * Math.PI),
              }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + i * 0.2,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              <Flower2 size={20} className={flowerColors[i % flowerColors.length]} />
            </motion.div>
          ))}
        </motion.div>
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg,#F0A6CA,#A084E8,#8F43EE,#A084E8,#F0A6CA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome back, Bloom Creator!
          </h1>
          <motion.p
            key={blossomIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-fuchsia-200 mt-1 text-sm"
          >
            {blossomQuotes[blossomIdx]}
          </motion.p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
            className={`rounded-2xl p-5 border ${card.border} ${card.bg} shadow-lg overflow-hidden flex flex-col justify-between group relative`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-purple-200 font-semibold">{card.title}</h3>
              <div className={`p-2 rounded-full bg-[#232042]/60 shadow ${card.iconColor}`}>
                <card.icon size={22} />
              </div>
            </div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-[#393053]/60 rounded-lg w-24 mb-2"></div>
                <div className="h-5 bg-[#393053]/60 rounded-lg w-28"></div>
              </div>
            ) : (
              <div>
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <p className={`text-sm flex items-center mt-2 ${card.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  <TrendingUp size={14} className="mr-1" />
                  <span>{card.change}</span>
                </p>
              </div>
            )}
            {/* Animated flower sparkle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.7, 1.1, 0.7],
                rotate: [0, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + idx * 0.5,
                delay: idx * 0.3,
                ease: "easeInOut"
              }}
              className="absolute -top-5 -right-6"
            >
              <Sparkles size={26} className={flowerColors[idx % flowerColors.length]} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Flower AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-[#232042]/70 border border-fuchsia-700/30 rounded-2xl px-6 py-7 shadow-xl mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Flower2 size={30} className="text-fuchsia-300 animate-spin-slow" />
          <h2 className="text-xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg,#F0A6CA,#A084E8,#8F43EE,#A084E8,#F0A6CA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Flower AI Suggestions
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px #f0a6ca33" }}
            className="rounded-xl bg-[#393053]/60 border border-fuchsia-700/20 p-4 transition shadow"
          >
            <div className="flex items-center mb-2">
              <Smile size={18} className="text-yellow-300 mr-2" />
              <span className="text-fuchsia-200 font-semibold">Personalize Greetings</span>
            </div>
            <p className="text-purple-200 text-sm">
              Try sending a custom flower-themed greeting in your next campaign for a 17% higher opening rate!
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px #a084e833" }}
            className="rounded-xl bg-[#393053]/60 border border-fuchsia-700/20 p-4 transition shadow"
          >
            <div className="flex items-center mb-2">
              <Calendar size={18} className="text-green-300 mr-2" />
              <span className="text-fuchsia-200 font-semibold">Optimal Timing</span>
            </div>
            <p className="text-purple-200 text-sm">
              Thursdays 6-8pm see the most engagement. Let your messages bloom at the perfect hour!
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px #8f43ee33" }}
            className="rounded-xl bg-[#393053]/60 border border-fuchsia-700/20 p-4 transition shadow"
          >
            <div className="flex items-center mb-2">
              <Sparkles size={18} className="text-pink-300 mr-2" />
              <span className="text-fuchsia-200 font-semibold">Audience Segments</span>
            </div>
            <p className="text-purple-200 text-sm">
              The “Win-back” segment is ready to sprout—nurture them with a special offer for best results!
            </p>
          </motion.div>
        </div>
        <div className="flex justify-end mt-5">
          <button className="btn btn-secondary bg-fuchsia-700/80 text-white rounded-lg px-4 py-2 hover:bg-fuchsia-800 flex items-center font-semibold shadow">
            Explore More AI Tips <ArrowRight size={17} className="ml-2" />
          </button>
        </div>
      </motion.div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex flex-col items-center mt-10"
      >
        <div className="flex items-center gap-2">
          <Flower2 size={22} className="text-fuchsia-300" />
          <span className="text-fuchsia-200 text-sm">You’re cultivating a garden of happy customers!</span>
        </div>
      </motion.div>
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;