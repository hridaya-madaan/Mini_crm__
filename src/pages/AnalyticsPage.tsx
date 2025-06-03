import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  BarChart2, 
  TrendingUp,
  Users,
  Clock,
  Download,
  Wallet,
  BellRing,
  Target,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // Chart Data
  const campaignEffectivenessData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Delivery Rate',
        data: [88, 92, 90, 94, 91, 93],
        fill: false,
        borderColor: 'rgba(168, 85, 247, 1)', // Fuchsia
        tension: 0.4,
      },
      {
        label: 'Engagement Rate',
        data: [25, 28, 22, 30, 27, 32],
        fill: false,
        borderColor: 'rgba(59, 130, 246, 1)', // Blue
        tension: 0.4,
      },
      {
        label: 'Conversion Rate',
        data: [12, 10, 8, 14, 12, 15],
        fill: false,
        borderColor: 'rgba(251, 191, 36, 1)', // Yellow
        tension: 0.4,
      },
    ],
  };
  
  const customerSegmentsData = {
    labels: ['High Value', 'Regular', 'New', 'At Risk', 'Inactive', 'Loyal'],
    datasets: [
      {
        label: 'Customer Count',
        data: [125, 387, 213, 156, 302, 178],
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e0cfff',
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#2a2542',
        titleColor: '#fff',
        bodyColor: '#f3e8ff',
        borderColor: '#a084e8',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#bdaaff',
        },
      },
      y: {
        grid: {
          color: '#443C68',
          drawBorder: false,
        },
        ticks: {
          color: '#bdaaff',
          callback: function(value: string) {
            return value + '%';
          },
        },
      },
    },
  };
  
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#2a2542',
        titleColor: '#fff',
        bodyColor: '#f3e8ff',
        borderColor: '#a084e8',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#bdaaff',
        },
      },
      y: {
        grid: {
          color: '#443C68',
          drawBorder: false,
        },
        ticks: {
          color: '#bdaaff',
        },
      },
    },
  };
  
  return (
    <div className="h-full overflow-y-auto pb-8 bg-gradient-to-br from-[#18122B] via-[#393053] to-[#443C68] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg,#F0A6CA,#A084E8,#8F43EE,#A084E8,#F0A6CA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Analytics</h2>
          <p className="text-purple-200">Visualize campaign growth and discover hidden customer patterns</p>
        </div>
        
        <div className="flex items-center mt-4 lg:mt-0">
          <div className="flex border border-purple-800 rounded-lg overflow-hidden shadow">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm font-medium ${
                timeRange === 'week' 
                  ? 'bg-fuchsia-700 text-white' 
                  : 'bg-[#393053] text-purple-200 hover:text-white hover:bg-fuchsia-800'
              }`}
            >
              Week
            </button>
            
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm font-medium ${
                timeRange === 'month' 
                  ? 'bg-fuchsia-700 text-white' 
                  : 'bg-[#393053] text-purple-200 hover:text-white hover:bg-fuchsia-800'
              }`}
            >
              Month
            </button>
            
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1 text-sm font-medium ${
                timeRange === 'quarter' 
                  ? 'bg-fuchsia-700 text-white' 
                  : 'bg-[#393053] text-purple-200 hover:text-white hover:bg-fuchsia-800'
              }`}
            >
              Quarter
            </button>
          </div>
          
          <button className="ml-3 btn btn-ghost text-purple-100">
            <Calendar size={16} className="mr-1" />
            <span>Apr 1 - Apr 30, 2025</span>
          </button>
          
          <button className="ml-2 btn btn-ghost text-purple-100 hover:text-fuchsia-400">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        <motion.div 
          className="glass-card p-5 bg-[#232042]/60 border border-[#443C68] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-200 font-medium">Total Customers</h3>
            <div className="p-2 rounded-lg bg-fuchsia-900/30">
              <Users size={20} className="text-fuchsia-400" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-purple-900 rounded-lg w-24 mb-2"></div>
              <div className="h-5 bg-purple-900 rounded-lg w-32"></div>
            </div>
          ) : (
            <div>
              <p className="text-3xl font-bold text-white">1,286</p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                <span>+52 new friends this month</span>
              </p>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="glass-card p-5 bg-[#232042]/60 border border-[#443C68] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-200 font-medium">Avg. Response Time</h3>
            <div className="p-2 rounded-lg bg-fuchsia-900/30">
              <Clock size={20} className="text-fuchsia-400" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-purple-900 rounded-lg w-24 mb-2"></div>
              <div className="h-5 bg-purple-900 rounded-lg w-32"></div>
            </div>
          ) : (
            <div>
              <p className="text-3xl font-bold text-white">2.8 hrs</p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                <span>0.5 hrs quicker than last month</span>
              </p>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="glass-card p-5 bg-[#232042]/60 border border-[#443C68] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-200 font-medium">Campaign Count</h3>
            <div className="p-2 rounded-lg bg-fuchsia-900/30">
              <BellRing size={20} className="text-fuchsia-400" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-purple-900 rounded-lg w-24 mb-2"></div>
              <div className="h-5 bg-purple-900 rounded-lg w-32"></div>
            </div>
          ) : (
            <div>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                <span>+3 creative launches</span>
              </p>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="glass-card p-5 bg-[#232042]/60 border border-[#443C68] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-200 font-medium">Revenue Impact</h3>
            <div className="p-2 rounded-lg bg-fuchsia-900/30">
              <Wallet size={20} className="text-fuchsia-400" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-purple-900 rounded-lg w-24 mb-2"></div>
              <div className="h-5 bg-purple-900 rounded-lg w-32"></div>
            </div>
          ) : (
            <div>
              <p className="text-3xl font-bold text-white">₹85.4K</p>
              <p className="text-sm text-green-400 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                <span>+12.7% vibrant growth</span>
              </p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div 
          className="glass-card lg:col-span-2 bg-[#232042]/60 border border-[#443C68] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Campaign Effectiveness</h3>
              <button className="btn btn-sm btn-ghost flex items-center text-purple-200 hover:text-white">
                <BarChart2 size={14} className="mr-1" />
                Explore Details
              </button>
            </div>
            <div className="h-80">
              {isLoading ? (
                <div className="h-full w-full bg-purple-900/40 rounded animate-pulse flex items-center justify-center">
                  <p className="text-purple-200">Loading graph...</p>
                </div>
              ) : (
                <Line data={campaignEffectivenessData} options={lineChartOptions} />
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card bg-[#232042]/60 border border-[#443C68] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
              <div className="flex items-center text-xs px-3 py-1 bg-fuchsia-900/30 text-fuchsia-200 rounded-full">
                <Sparkles size={10} className="mr-1" />
                <span>Smart AI</span>
              </div>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-purple-900 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-purple-900 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#393053]/60 border border-[#443C68]">
                  <div className="flex items-start">
                    <div className="bg-fuchsia-900/20 p-2 rounded-full mr-3">
                      <Target size={16} className="text-fuchsia-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">Engagement Patterns</h4>
                      <p className="text-purple-200 text-sm">
                        High-value customers (₹10K+) interact 42% more with campaigns tailored to their purchase story.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#393053]/60 border border-[#443C68]">
                  <div className="flex items-start">
                    <div className="bg-fuchsia-900/20 p-2 rounded-full mr-3">
                      <Users size={16} className="text-fuchsia-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">Segment Momentum</h4>
                      <p className="text-purple-200 text-sm">
                        “Win-back inactive” group is converting 23% better than other strategies. Double down for bigger wins!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#393053]/60 border border-[#443C68]">
                  <div className="flex items-start">
                    <div className="bg-fuchsia-900/20 p-2 rounded-full mr-3">
                      <Clock size={16} className="text-fuchsia-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">Best Timing</h4>
                      <p className="text-purple-200 text-sm">
                        Thursday evenings (6-8pm) deliver 37% higher open rates. Schedule smart!
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-2 text-fuchsia-300 hover:text-fuchsia-100 text-sm flex items-center justify-center">
                  <span>See More Insights</span>
                  <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Customer Segments Chart */}
      <motion.div 
        className="glass-card bg-[#232042]/60 border border-[#443C68] shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Customer Segments</h3>
            <button className="btn btn-sm btn-ghost flex items-center text-purple-200 hover:text-fuchsia-300">
              <Download size={14} className="mr-1" />
              Download Data
            </button>
          </div>
          <div className="h-80">
            {isLoading ? (
              <div className="h-full w-full bg-purple-900/40 rounded animate-pulse flex items-center justify-center">
                <p className="text-purple-200">Loading bar chart...</p>
              </div>
            ) : (
              <Bar data={customerSegmentsData} options={barChartOptions} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;