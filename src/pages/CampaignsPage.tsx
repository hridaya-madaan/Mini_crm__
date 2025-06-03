import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowUpRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileEdit,
  BarChart,
  Trash2,
  Users,
  Calendar,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Campaign } from '../types';
import { toast } from 'sonner';

// Generate mock campaigns data
const generateMockCampaigns = (): Campaign[] => {
  return [
    {
      id: 'campaign-1',
      name: 'Summer Sale Promotion',
      createdAt: '2025-04-15T10:30:00Z',
      status: 'active',
      audienceSize: 456,
      sentCount: 432,
      failedCount: 24,
      successRate: 94.7,
      segmentRules: {
        type: 'group',
        operator: 'AND',
        rules: [
          {
            type: 'condition',
            field: 'totalSpend',
            operator: 'greater_than',
            value: 5000,
          },
          {
            type: 'condition',
            field: 'lastActivity',
            operator: 'after',
            value: '2025-01-01T00:00:00Z',
          },
        ],
      },
      message: 'Hi {{name}}, enjoy our summer sale with 20% off using code SUMMER20!',
    },
    {
      id: 'campaign-2',
      name: 'Win-back Inactive Customers',
      createdAt: '2025-04-10T15:45:00Z',
      status: 'completed',
      audienceSize: 238,
      sentCount: 210,
      failedCount: 28,
      successRate: 88.2,
      segmentRules: {
        type: 'group',
        operator: 'AND',
        rules: [
          {
            type: 'condition',
            field: 'lastActivity',
            operator: 'before',
            value: '2025-01-01T00:00:00Z',
          },
          {
            type: 'condition',
            field: 'totalSpend',
            operator: 'greater_than',
            value: 1000,
          },
        ],
      },
      message: 'Hi {{name}}, we miss you! Come back and enjoy 15% off your next purchase with code COMEBACK15.',
    },
    {
      id: 'campaign-3',
      name: 'New Product Launch',
      createdAt: '2025-04-05T09:15:00Z',
      status: 'scheduled',
      audienceSize: 1245,
      sentCount: 0,
      failedCount: 0,
      successRate: 0,
      segmentRules: {
        type: 'group',
        operator: 'OR',
        rules: [
          {
            type: 'condition',
            field: 'tags',
            operator: 'contains',
            value: 'tech-enthusiast',
          },
          {
            type: 'condition',
            field: 'totalSpend',
            operator: 'greater_than',
            value: 10000,
          },
        ],
      },
      message: 'Hi {{name}}, be the first to check out our latest product launch! Use FIRST10 for 10% off.',
      scheduledFor: '2025-04-20T08:00:00Z',
    },
    {
      id: 'campaign-4',
      name: 'VIP Customer Appreciation',
      createdAt: '2025-03-28T14:20:00Z',
      status: 'active',
      audienceSize: 87,
      sentCount: 82,
      failedCount: 5,
      successRate: 94.3,
      segmentRules: {
        type: 'group',
        operator: 'AND',
        rules: [
          {
            type: 'condition',
            field: 'totalSpend',
            operator: 'greater_than',
            value: 20000,
          },
          {
            type: 'condition',
            field: 'visits',
            operator: 'greater_than',
            value: 10,
          },
        ],
      },
      message: 'Hi {{name}}, as one of our most valued customers, enjoy a special 25% discount on your next purchase. Use code VIP25.',
    },
    {
      id: 'campaign-5',
      name: 'Cart Abandonment Reminder',
      createdAt: '2025-03-22T11:10:00Z',
      status: 'failed',
      audienceSize: 325,
      sentCount: 215,
      failedCount: 110,
      successRate: 66.2,
      segmentRules: {
        type: 'group',
        operator: 'AND',
        rules: [
          {
            type: 'condition',
            field: 'tags',
            operator: 'contains',
            value: 'cart-abandoner',
          },
        ],
      },
      message: 'Hi {{name}}, did you forget something? Complete your purchase now and get free shipping with code FREESHIP.',
    },
  ];
};

// Campaign status badge component
const StatusBadge = ({ status }: { status: Campaign['status'] }) => {
  let bgColor = '';
  let textColor = '';
  let icon = null;
  
  switch (status) {
    case 'active':
      bgColor = 'bg-green-900/20';
      textColor = 'text-green-500';
      icon = <CheckCircle size={12} className="mr-1" />;
      break;
    case 'completed':
      bgColor = 'bg-blue-900/20';
      textColor = 'text-blue-500';
      icon = <CheckCircle size={12} className="mr-1" />;
      break;
    case 'scheduled':
      bgColor = 'bg-yellow-900/20';
      textColor = 'text-yellow-500';
      icon = <Clock size={12} className="mr-1" />;
      break;
    case 'failed':
      bgColor = 'bg-red-900/20';
      textColor = 'text-red-500';
      icon = <AlertTriangle size={12} className="mr-1" />;
      break;
    default:
      bgColor = 'bg-secondary-800';
      textColor = 'text-secondary-400';
      break;
  }
  
  return (
    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {icon}
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  );
};

// Campaign dropdown menu
const CampaignMenu = ({ 
  campaign,
  onDuplicate,
  onDelete
}: { 
  campaign: Campaign;
  onDuplicate: (campaign: Campaign) => void;
  onDelete: (campaignId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-md text-secondary-400 hover:bg-secondary-800 hover:text-white transition-colors focus:outline-none"
      >
        <MoreVertical size={16} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-48 bg-secondary-800 border border-secondary-700 rounded-md shadow-lg z-10"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1">
            <button
              onClick={() => {
                window.open(`/campaigns/${campaign.id}/analytics`, '_blank');
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
            >
              <BarChart size={14} className="mr-2" />
              View Analytics
            </button>
            
            <button
              onClick={() => {
                onDuplicate(campaign);
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
            >
              <FileEdit size={14} className="mr-2" />
              Duplicate
            </button>
            
            <button
              onClick={() => {
                onDelete(campaign.id);
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-red-900/20"
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// AI insights component
const AiInsights = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="glass-card p-4 lg:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles size={18} className="text-primary-500 mr-2" />
          <h3 className="text-lg font-semibold text-white">AI Campaign Insights</h3>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-primary-400 hover:text-primary-300 text-sm flex items-center"
        >
          <span>View All Insights</span>
          <ArrowRight size={16} className="ml-1" />
        </motion.button>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-16 bg-secondary-800 rounded-lg mb-4"></div>
          <div className="h-16 bg-secondary-800 rounded-lg"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-secondary-800/60 border border-secondary-700 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="bg-primary-900/30 rounded-full p-2 mr-3">
                <Users size={16} className="text-primary-400" />
              </div>
              
              <div>
                <h4 className="font-medium text-white text-sm mb-1">Segment Opportunity</h4>
                <p className="text-secondary-400 text-sm">Your "Win-back" campaign had 88% success rate. Consider targeting an additional 156 customers with similar profiles.</p>
                
                <button className="mt-2 text-xs text-primary-400 hover:text-primary-300 flex items-center">
                  <span>Expand Audience</span>
                  <ArrowUpRight size={12} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-800/60 border border-secondary-700 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="bg-primary-900/30 rounded-full p-2 mr-3">
                <Calendar size={16} className="text-primary-400" />
              </div>
              
              <div>
                <h4 className="font-medium text-white text-sm mb-1">Timing Optimization</h4>
                <p className="text-secondary-400 text-sm">High-value customers engage 37% more when messages are sent on Thursday evenings. Consider rescheduling your VIP campaign.</p>
                
                <button className="mt-2 text-xs text-primary-400 hover:text-primary-300 flex items-center">
                  <span>Optimize Schedule</span>
                  <ArrowUpRight size={12} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Campaign['status'] | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch campaigns
    const timer = setTimeout(() => {
      setCampaigns(generateMockCampaigns());
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDuplicateCampaign = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: `campaign-${Date.now()}`,
      name: `${campaign.name} (Copy)`,
      createdAt: new Date().toISOString(),
      status: 'draft',
      sentCount: 0,
      failedCount: 0,
      successRate: 0,
    };
    
    setCampaigns([newCampaign, ...campaigns]);
    toast.success(`Campaign "${campaign.name}" duplicated`);
  };
  
  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
    toast.success('Campaign deleted successfully');
  };
  
  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  
  return (
    <div className="h-full overflow-y-auto pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Campaigns</h2>
          <p className="text-secondary-400">Create and manage your customer communication campaigns</p>
        </div>
        
        <div className="mt-4 lg:mt-0">
          <button
            onClick={() => navigate('/campaigns/create')}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Create Campaign
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-card p-4 lg:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-lg font-semibold text-white mb-2 md:mb-0">Campaign History</h3>
              
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns..."
                    className="input py-1 pl-8 pr-4 text-sm w-full"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
                </div>
                
                <div className="relative">
                  <div className="flex items-center input py-1 px-3 text-sm cursor-pointer" onClick={() => {}}>
                    <Filter size={14} className="mr-2 text-secondary-500" />
                    <span>Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                    <ChevronDown size={14} className="ml-2 text-secondary-500" />
                  </div>
                  
                  <div className="absolute mt-1 right-0 w-40 bg-secondary-800 border border-secondary-700 rounded-md shadow-lg z-10 hidden">
                    <div className="py-1">
                      <button
                        onClick={() => setStatusFilter('all')}
                        className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
                      >
                        All
                      </button>
                      
                      <button
                        onClick={() => setStatusFilter('active')}
                        className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
                      >
                        Active
                      </button>
                      
                      <button
                        onClick={() => setStatusFilter('completed')}
                        className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
                      >
                        Completed
                      </button>
                      
                      <button
                        onClick={() => setStatusFilter('scheduled')}
                        className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
                      >
                        Scheduled
                      </button>
                      
                      <button
                        onClick={() => setStatusFilter('failed')}
                        className="flex w-full items-center px-4 py-2 text-sm text-secondary-300 hover:bg-secondary-700 hover:text-white"
                      >
                        Failed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-secondary-800/50 rounded-lg p-4 animate-pulse">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-5 w-1/3 bg-secondary-700 rounded"></div>
                      <div className="h-5 w-20 bg-secondary-700 rounded-full"></div>
                    </div>
                    <div className="h-4 w-1/2 bg-secondary-700 rounded mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-1/4 bg-secondary-700 rounded"></div>
                      <div className="h-4 w-1/4 bg-secondary-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <motion.div
                      key={campaign.id}
                      variants={itemVariants}
                      className="bg-secondary-800/50 hover:bg-secondary-800 transition-colors rounded-lg p-4 border border-secondary-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{campaign.name}</h4>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={campaign.status} />
                          <CampaignMenu 
                            campaign={campaign} 
                            onDuplicate={handleDuplicateCampaign}
                            onDelete={handleDeleteCampaign}
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-secondary-400 mb-3">
                        {new Date(campaign.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                        {campaign.scheduledFor && ` • Scheduled for ${new Date(campaign.scheduledFor).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}`}
                      </p>
                      
                      <div className="flex flex-wrap justify-between gap-y-2">
                        <div className="flex items-center text-sm">
                          <Users size={14} className="mr-1 text-secondary-500" />
                          <span className="text-secondary-300">
                            Audience: <span className="text-white">{campaign.audienceSize.toLocaleString()}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="flex items-center mr-3">
                            <CheckCircle size={14} className="mr-1 text-green-500" />
                            <span className="text-secondary-300">
                              Sent: <span className="text-white">{campaign.sentCount.toLocaleString()}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <AlertTriangle size={14} className="mr-1 text-red-500" />
                            <span className="text-secondary-300">
                              Failed: <span className="text-white">{campaign.failedCount.toLocaleString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-secondary-500">No campaigns found matching your filters</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}
                      className="mt-2 text-primary-400 hover:text-primary-300 text-sm"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <AiInsights />
          
          <div className="glass-card p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
            
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-secondary-800 rounded-lg"></div>
                <div className="h-20 bg-secondary-800 rounded-lg"></div>
                <div className="h-20 bg-secondary-800 rounded-lg"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-secondary-800/60 border border-secondary-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium text-white">Delivery Rate</h4>
                    <span className="text-green-500 text-sm">91.5%</span>
                  </div>
                  
                  <div className="h-2 bg-secondary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '91.5%' }}></div>
                  </div>
                  
                  <p className="text-xs text-secondary-500 mt-2">
                    Average across all campaigns
                  </p>
                </div>
                
                <div className="bg-secondary-800/60 border border-secondary-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium text-white">Engagement Rate</h4>
                    <span className="text-primary-500 text-sm">28.3%</span>
                  </div>
                  
                  <div className="h-2 bg-secondary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '28.3%' }}></div>
                  </div>
                  
                  <p className="text-xs text-secondary-500 mt-2">
                    Based on open and click-through rates
                  </p>
                </div>
                
                <div className="bg-secondary-800/60 border border-secondary-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium text-white">Conversion Rate</h4>
                    <span className="text-yellow-500 text-sm">12.7%</span>
                  </div>
                  
                  <div className="h-2 bg-secondary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '12.7%' }}></div>
                  </div>
                  
                  <p className="text-xs text-secondary-500 mt-2">
                    Percentage of recipients who completed the desired action
                  </p>
                </div>
                
                <div className="mt-6">
                  <button className="w-full btn btn-secondary">
                    <BarChart size={16} className="mr-2" />
                    View Detailed Analytics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;