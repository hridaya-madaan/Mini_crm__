import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Send, 
  Users, 
  Loader, 
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import RuleBuilder from '../components/campaigns/RuleBuilder';
import { SegmentRule, Campaign } from '../types';

const CreateCampaignPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [segmentRules, setSegmentRules] = useState<SegmentRule>({
    type: 'group',
    operator: 'AND',
    rules: []
  });
  const [previewCount, setPreviewCount] = useState<number | null>(null);
  
  // Set preview count when rules change
  useEffect(() => {
    if (segmentRules.rules.length === 0) {
      setPreviewCount(null);
      return;
    }

    // Simulate API call to get preview count
    const timer = setTimeout(() => {
      // Generate random number between 100 and 500
      const count = Math.floor(Math.random() * 400) + 100;
      setPreviewCount(count);
    }, 500);

    return () => clearTimeout(timer);
  }, [segmentRules]);

  const handleRuleChange = (newRules: SegmentRule) => {
    setSegmentRules(newRules);
  };

  const generateAIMessage = () => {
    if (!previewCount) return;
    
    setAiGenerating(true);
    
    // Simulate API call to AI service
    setTimeout(() => {
      // Generate message based on rules
      let message = '';
      
      // Check if rules contain high spend condition
      const hasHighSpend = segmentRules.rules.some(rule => 
        rule.type === 'condition' && 
        rule.field === 'totalSpend' && 
        rule.operator === 'greater_than' && 
        (rule.value as number) > 5000
      );
      
      // Check if rules contain inactive condition
      const hasInactive = segmentRules.rules.some(rule => 
        rule.type === 'condition' && 
        rule.field === 'lastActivity' && 
        rule.operator === 'before'
      );
      
      if (hasHighSpend && hasInactive) {
        message = "Hi {{name}}, we miss you! As one of our most valued customers, we'd like to offer you 20% off your next purchase. Use code WELCOME20 at checkout.";
      } else if (hasHighSpend) {
        message = "Hi {{name}}, thank you for being one of our premium customers! Here's a special 15% discount just for you on our latest collection. Use code VIP15 at checkout.";
      } else if (hasInactive) {
        message = "Hi {{name}}, it's been a while! We've got some exciting new products we think you'll love. Come back and enjoy 10% off with code COMEBACK10.";
      } else {
        message = "Hi {{name}}, we have a special offer just for you! Enjoy 10% off your next purchase with code SPECIAL10. Valid for the next 7 days only.";
      }
      
      setCampaignMessage(message);
      setAiGenerating(false);
    }, 1500);
  };
  
  const handleSubmit = async () => {
    if (!campaignName.trim()) {
      toast.error('Please enter a campaign name');
      return;
    }
    
    if (!campaignMessage.trim()) {
      toast.error('Please enter a campaign message');
      return;
    }
    
    if (!previewCount) {
      toast.error('Your segment conditions are not valid');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create campaign
    setTimeout(() => {
      // Mock campaign creation
      const newCampaign: Campaign = {
        id: `campaign-${Date.now()}`,
        name: campaignName,
        createdAt: new Date().toISOString(),
        status: 'active',
        audienceSize: previewCount,
        sentCount: 0,
        failedCount: 0,
        successRate: 0,
        segmentRules,
        message: campaignMessage,
      };
      
      // Normally we would add this to state or make an API call
      console.log('Created campaign:', newCampaign);
      
      toast.success('Campaign created successfully!');
      navigate('/campaigns');
    }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto pb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/campaigns')}
            className="mr-4 p-1 rounded-md text-secondary-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-white">Create Campaign</h2>
        </div>
        
        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
              step === 1 ? 'bg-primary-600 text-white' : 'bg-primary-700/20 text-primary-300'
            }`}>
              1
            </div>
            
            <div className={`h-1 w-16 mx-2 ${
              step > 1 ? 'bg-primary-600' : 'bg-secondary-800'
            }`}></div>
            
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
              step === 2 ? 'bg-primary-600 text-white' : 'bg-primary-700/20 text-primary-300'
            }`}>
              2
            </div>
            
            <div className={`h-1 w-16 mx-2 ${
              step > 2 ? 'bg-primary-600' : 'bg-secondary-800'
            }`}></div>
            
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
              step === 3 ? 'bg-primary-600 text-white' : 'bg-primary-700/20 text-primary-300'
            }`}>
              3
            </div>
          </div>
          
          <div className="flex mt-2 text-sm">
            <div className={`w-8 text-center ${step === 1 ? 'text-primary-400' : 'text-secondary-500'}`}></div>
            <div className="w-16 mx-2"></div>
            <div className={`w-8 text-center ${step === 2 ? 'text-primary-400' : 'text-secondary-500'}`}></div>
            <div className="w-16 mx-2"></div>
            <div className={`w-8 text-center ${step === 3 ? 'text-primary-400' : 'text-secondary-500'}`}></div>
          </div>
          
          <div className="flex mt-1 text-xs">
            <div className={`w-8 ${step === 1 ? 'text-primary-400' : 'text-secondary-500'}`}>Define</div>
            <div className="w-16 mx-2"></div>
            <div className={`w-16 ${step === 2 ? 'text-primary-400' : 'text-secondary-500'}`}>Compose</div>
            <div className="w-16 mx-2"></div>
            <div className={`w-8 ${step === 3 ? 'text-primary-400' : 'text-secondary-500'}`}>Review</div>
          </div>
        </div>
        
        {/* Step 1: Define Audience */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Campaign Details</h3>
              
              <div className="mb-4">
                <label htmlFor="campaignName" className="block text-sm font-medium text-secondary-300 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter a descriptive name for your campaign"
                  className="input w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-secondary-300">
                    Define Your Audience
                  </label>
                  
                  <span className="text-xs text-secondary-500">
                    Add conditions to narrow your audience
                  </span>
                </div>
                
                <RuleBuilder 
                  rules={segmentRules} 
                  onChange={handleRuleChange} 
                  previewCount={previewCount || undefined}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!previewCount}
                className="btn btn-primary"
              >
                Continue to Message
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Compose Message */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Compose Message</h3>
                
                <div className="flex items-center text-xs px-3 py-1 bg-primary-900/30 text-primary-400 rounded-full">
                  <Users size={12} className="mr-1" />
                  <span>Audience: {previewCount} customers</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="campaignMessage" className="block text-sm font-medium text-secondary-300">
                    Message Content
                  </label>
                  
                  <span className="text-xs text-secondary-500">
                    Use {{name}} to personalize with customer's name
                  </span>
                </div>
                
                <div className="relative">
                  <textarea
                    id="campaignMessage"
                    value={campaignMessage}
                    onChange={(e) => setCampaignMessage(e.target.value)}
                    placeholder="Enter your message content..."
                    className="input w-full h-40 resize-none"
                  />
                  
                  <div className="absolute bottom-2 right-2">
                    <button
                      onClick={generateAIMessage}
                      disabled={aiGenerating || !previewCount}
                      className="btn btn-sm btn-ghost flex items-center gap-1 py-1 px-2 text-xs"
                    >
                      {aiGenerating ? (
                        <>
                          <Loader size={12} className="animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} className="text-primary-400" />
                          <span>AI Assist</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary-800/50 rounded-lg border border-secondary-700">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Lightbulb size={16} className="text-primary-400" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Message Tips</h4>
                    
                    <ul className="text-xs text-secondary-400 space-y-1 list-disc pl-4">
                      <li>Keep messages concise and focused on a single call-to-action</li>
                      <li>Personalize with {{name}} placeholder to increase engagement</li>
                      <li>Include a clear value proposition</li>
                      <li>Add a sense of urgency when appropriate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn btn-secondary"
              >
                Back
              </button>
              
              <button
                onClick={() => setStep(3)}
                disabled={!campaignMessage.trim()}
                className="btn btn-primary"
              >
                Continue to Review
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Review and Launch */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Review Campaign</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-secondary-400 mb-2">Campaign Name</h4>
                  <p className="text-white px-4 py-3 bg-secondary-800 rounded-lg">{campaignName}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-secondary-400">Audience</h4>
                    
                    <div className="flex items-center text-xs px-3 py-1 bg-primary-900/30 text-primary-400 rounded-full">
                      <Users size={12} className="mr-1" />
                      <span>{previewCount} customers</span>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-secondary-800 rounded-lg mb-2">
                    <RuleBuilder 
                      rules={segmentRules} 
                      onChange={handleRuleChange}
                      showPreview={false}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-secondary-400 mb-2">Message</h4>
                  
                  <div className="p-4 bg-secondary-800 rounded-lg">
                    <div className="glass-card p-4 max-w-sm mx-auto">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center text-white">
                          X
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-white">Xeno</p>
                          <p className="text-xs text-secondary-500">Just now</p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-secondary-200">
                        {campaignMessage.replace(/{{name}}/g, 'John')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn btn-secondary"
              >
                Back
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Launching...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Launch Campaign</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreateCampaignPage;