import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Upload,
  Download,
  Users,
  Tag,
  Filter,
  ChevronDown,
  ChevronUp,
  //MoreHorizontal,
  ArrowUpDown,
  Mail,
  Phone,
  Gauge,
  Calendar,
  Clock,
  CheckCircle2,
  Ban,
  Tag as TagIcon,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { Customer } from '../types';
import { toast } from 'sonner';

// Generate mock customer data
const generateMockCustomers = (count: number): Customer[] => {
  const customers: Customer[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `cust-${(Math.random() * 10000).toFixed(0).padStart(4, '0')}`;
    const names = [
      'Aisha Patel', 'Rahul ', 'Rohit', 'Ronit Kumar', 'Puneet',
      'Shweta', 'Sourabh', 'Chhavi', 'Shivani', 'Kapil',
      'Tarun', 'Amita', 'Soia', 'Naveen', 'IT GURUKUL'
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    const phone = `+91 ${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`;
    const totalSpend = Math.floor(Math.random() * 50000) + 500;
    const visits = Math.floor(Math.random() * 30) + 1;
    
    // Last activity between 1 and 120 days ago
    const lastActivityDays = Math.floor(Math.random() * 120) + 1;
    const lastActivity = new Date();
    lastActivity.setDate(lastActivity.getDate() - lastActivityDays);
    
    // Last order between 1 and 180 days ago
    const lastOrderDays = Math.floor(Math.random() * 180) + 1;
    const lastOrder = new Date();
    lastOrder.setDate(lastOrder.getDate() - lastOrderDays);
    
    const tags = [];
    const possibleTags = ['high-value', 'new-customer', 'regular', 'inactive', 'vip', 'promotion-responder'];
    const tagCount = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < tagCount; j++) {
      const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)];
      if (!tags.includes(randomTag)) {
        tags.push(randomTag);
      }
    }
    
    customers.push({
      id,
      name,
      email,
      phone,
      totalSpend,
      visits,
      lastActivity: lastActivity.toISOString(),
      lastOrder: lastOrder.toISOString(),
      tags,
    });
  }
  
  return customers;
};

interface CustomerRowProps {
  customer: Customer;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const CustomerRow = ({ customer, isExpanded, onToggleExpand }: CustomerRowProps) => {
  const [isTagInputVisible, setIsTagInputVisible] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>(customer.tags);
  
  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setIsTagInputVisible(false);
      toast.success(`Tag added to ${customer.name}`);
    }
  };
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    toast.success(`Tag removed from ${customer.name}`);
  };
  
  return (
    <motion.div
      layout
      className="border border-secondary-800 rounded-lg overflow-hidden mb-4"
    >
      <div 
        className={`p-4 bg-secondary-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-secondary-800 transition-colors`}
        onClick={onToggleExpand}
      >
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white font-medium">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-white">{customer.name}</h4>
            <div className="text-sm text-secondary-400 flex flex-wrap items-center">
              <span className="flex items-center">
                <Mail size={12} className="mr-1" />
                {customer.email}
              </span>
              <span className="mx-2 text-secondary-600">•</span>
              <span className="flex items-center">
                <Phone size={12} className="mr-1" />
                {customer.phone}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 text-sm">
          <div className="flex items-center">
            <Gauge size={14} className="mr-1 text-secondary-500" />
            <span className="text-secondary-300">
              <span className="text-white font-medium">₹{customer.totalSpend.toLocaleString()}</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-secondary-500" />
            <span className="text-secondary-300">
              <span className="text-white font-medium">
                {Math.floor((Date.now() - new Date(customer.lastActivity).getTime()) / (1000 * 60 * 60 * 24))} days
              </span>
            </span>
          </div>
          
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="p-1 rounded-full hover:bg-secondary-700"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary-900 p-4 border-t border-secondary-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-sm font-medium text-secondary-400 mb-2">Customer Details</h5>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Customer ID</span>
                  <span className="text-sm text-secondary-300">{customer.id}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Total Spend</span>
                  <span className="text-sm text-white font-medium">₹{customer.totalSpend.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Total Visits</span>
                  <span className="text-sm text-white">{customer.visits}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-secondary-400 mb-2">Activity</h5>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Last Active</span>
                  <span className="text-sm text-secondary-300 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(customer.lastActivity).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Last Order</span>
                  <span className="text-sm text-secondary-300 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(customer.lastOrder).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Status</span>
                  {new Date(customer.lastActivity) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? (
                    <span className="text-sm text-green-500 flex items-center">
                      <CheckCircle2 size={12} className="mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="text-sm text-red-500 flex items-center">
                      <Ban size={12} className="mr-1" />
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-secondary-400">Tags</h5>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTagInputVisible(!isTagInputVisible);
                  }}
                  className="text-xs flex items-center text-primary-400 hover:text-primary-300"
                >
                  <PlusCircle size={12} className="mr-1" />
                  Add Tag
                </button>
              </div>
              
              {isTagInputVisible && (
                <div className="mb-2 flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Tag name..."
                    className="input py-1 px-2 text-sm flex-1"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addTag();
                    }}
                    className="ml-2 btn btn-primary btn-sm py-1"
                  >
                    Add
                  </button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-secondary-800 text-secondary-300 rounded-full px-2 py-1 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TagIcon size={10} className="mr-1 text-primary-400" />
                      <span>{tag}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTag(tag);
                        }}
                        className="ml-1 text-secondary-500 hover:text-secondary-300"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-secondary-500">No tags assigned</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-secondary-800 flex justify-end">
            <button className="btn btn-sm btn-primary">
              <Mail size={14} className="mr-1" />
              Send Message
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Customer>('totalSpend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch customers
    const timer = setTimeout(() => {
      setCustomers(generateMockCustomers(15));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Sort and filter customers
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = tagFilter === 'all' || customer.tags.includes(tagFilter);
      
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortField === 'totalSpend' || sortField === 'visits') {
        return sortDirection === 'asc' 
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }
      
      if (sortField === 'lastActivity' || sortField === 'lastOrder') {
        const dateA = new Date(a[sortField]).getTime();
        const dateB = new Date(b[sortField]).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      const valueA = String(a[sortField]).toLowerCase();
      const valueB = String(b[sortField]).toLowerCase();
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(customers.flatMap(customer => customer.tags))
  );
  
  return (
    <div className="h-full overflow-y-auto pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Customers</h2>
          <p className="text-secondary-400">View and manage your customer database</p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-wrap gap-2">
          <button className="btn btn-secondary">
            <Upload size={16} className="mr-1" />
            Import
          </button>
          
          <button className="btn btn-secondary">
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      
      <div className="glass-card p-4 lg:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers by name, email, or ID..."
              className="input w-full pl-10"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <button className="btn btn-secondary flex items-center gap-1">
                <Tag size={16} />
                <span>{tagFilter === 'all' ? 'All Tags' : tagFilter}</span>
                <ChevronDown size={14} />
              </button>
              
              {/* Tag filter dropdown would go here */}
            </div>
            
            <div className="relative">
              <button className="btn btn-secondary flex items-center gap-1">
                <Filter size={16} />
                <span>Filters</span>
                <ChevronDown size={14} />
              </button>
              
              {/* Filter dropdown would go here */}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-secondary-400">
            <Users size={16} className="mr-1" />
            <span>{filteredCustomers.length} customers</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSort('totalSpend')}
              className={`flex items-center text-sm ${
                sortField === 'totalSpend' ? 'text-primary-400' : 'text-secondary-400'
              }`}
            >
              <span>Total Spend</span>
              <ArrowUpDown size={14} className="ml-1" />
            </button>
            
            <button
              onClick={() => handleSort('lastActivity')}
              className={`flex items-center text-sm ${
                sortField === 'lastActivity' ? 'text-primary-400' : 'text-secondary-400'
              }`}
            >
              <span>Last Active</span>
              <ArrowUpDown size={14} className="ml-1" />
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="border border-secondary-800 rounded-lg overflow-hidden mb-4">
                <div className="p-4 bg-secondary-800/50 animate-pulse">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary-700 rounded-full mr-3"></div>
                    <div>
                      <div className="h-5 w-32 bg-secondary-700 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-secondary-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  isExpanded={expandedCustomerId === customer.id}
                  onToggleExpand={() => setExpandedCustomerId(expandedCustomerId === customer.id ? null : customer.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-secondary-700 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No customers found</h3>
                <p className="text-secondary-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setTagFilter('all');
                  }}
                  className="btn btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
            
            {filteredCustomers.length > 0 && (
              <div className="mt-4 flex justify-center">
                <button className="btn btn-ghost text-primary-400 hover:text-primary-300">
                  Load More Customers
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;