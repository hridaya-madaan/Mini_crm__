import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Calendar,
  DollarSign,
  Hash,
  Tag,
  Clock,
  Check,
  X,
  Sparkles,
  Search,
} from 'lucide-react';
import { SegmentRule, SegmentCondition } from '../../types';

interface RuleBuilderProps {
  rules: SegmentRule;
  onChange: (rules: SegmentRule) => void;
  className?: string;
  previewCount?: number;
  showPreview?: boolean;
}

const fieldOptions = [
  { value: 'totalSpend', label: 'Total Spend', icon: <DollarSign size={16} /> },
  { value: 'visits', label: 'Visits', icon: <Hash size={16} /> },
  { value: 'lastActivity', label: 'Last Activity', icon: <Clock size={16} /> },
  { value: 'lastOrder', label: 'Last Order', icon: <Calendar size={16} /> },
  { value: 'tags', label: 'Tags', icon: <Tag size={16} /> },
];

const operatorOptions: Record<string, { value: string; label: string }[]> = {
  default: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Does not equal' },
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Does not equal' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
  ],
  date: [
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
  ],
  array: [
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does not contain' },
  ],
};

const NaturalLanguageInput = ({ 
  onSubmit 
}: { 
  onSubmit: (rules: SegmentRule) => void 
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);

    // Mock API call to AI service
    setTimeout(() => {
      // Parsed rules example
      const parsedRules: SegmentRule = {
        type: 'group',
        operator: 'AND',
        rules: []
      };
      
      // Example parsing for "Customers who spent more than 10000 and haven't visited in 90 days"
      if (query.toLowerCase().includes('spent more than') && query.toLowerCase().includes('haven\'t visited')) {
        parsedRules.rules = [
          {
            type: 'condition',
            field: 'totalSpend',
            operator: 'greater_than',
            value: 10000
          },
          {
            type: 'condition',
            field: 'lastActivity',
            operator: 'before',
            value: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
      } 
      // Example parsing for "Inactive customers for 30 days"
      else if (query.toLowerCase().includes('inactive') && query.toLowerCase().includes('days')) {
        const days = query.match(/\d+/)?.[0] || '30';
        parsedRules.rules = [
          {
            type: 'condition',
            field: 'lastActivity',
            operator: 'before',
            value: new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
      }
      // Default fallback if no patterns match
      else {
        parsedRules.rules = [
          {
            type: 'condition',
            field: 'totalSpend',
            operator: 'greater_than',
            value: 5000
          }
        ];
      }
      
      onSubmit(parsedRules);
      setIsLoading(false);
      setQuery('');
    }, 1500);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Sparkles size={16} className="text-primary-500 mr-2" />
        <h3 className="text-sm font-medium text-secondary-300">AI-Powered Segment Creation</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your audience in plain English..."
            className="input w-full pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
            <Search size={16} />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Generate Rules'
          )}
        </button>
      </form>
      
      <div className="mt-2 text-xs text-secondary-500">
        Try: "Customers who spent more than ₹10,000 and haven't visited in 90 days" or "Inactive customers for 30 days"
      </div>
    </div>
  );
};

const RuleBuilder = ({ rules, onChange, className = '', previewCount, showPreview = true }: RuleBuilderProps) => {
  // Helper to get a unique ID for drag and drop
  const getUniqueId = () => `rule-${Math.random().toString(36).substring(2, 11)}`;
  
  // Add a new condition to a group
  const addCondition = (groupId: string) => {
    const updatedRules = JSON.parse(JSON.stringify(rules));
    
    const findGroupAndAddCondition = (rule: SegmentRule | SegmentCondition, parentId: string): boolean => {
      if (rule.type === 'condition') return false;
      
      if (parentId === groupId) {
        rule.rules.push({
          type: 'condition',
          field: 'totalSpend',
          operator: 'greater_than',
          value: 0,
        });
        return true;
      }
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (findGroupAndAddCondition(rule.rules[i], parentId)) {
          return true;
        }
      }
      
      return false;
    };
    
    findGroupAndAddCondition(updatedRules, groupId);
    onChange(updatedRules);
  };
  
  // Add a new group to a group
  const addGroup = (groupId: string) => {
    const updatedRules = JSON.parse(JSON.stringify(rules));
    
    const findGroupAndAddGroup = (rule: SegmentRule | SegmentCondition, parentId: string): boolean => {
      if (rule.type === 'condition') return false;
      
      if (parentId === groupId) {
        rule.rules.push({
          type: 'group',
          operator: 'AND',
          rules: [],
        });
        return true;
      }
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (findGroupAndAddGroup(rule.rules[i], parentId)) {
          return true;
        }
      }
      
      return false;
    };
    
    findGroupAndAddGroup(updatedRules, groupId);
    onChange(updatedRules);
  };
  
  // Toggle the operator of a group
  const toggleOperator = (groupId: string) => {
    const updatedRules = JSON.parse(JSON.stringify(rules));
    
    const findGroupAndToggleOperator = (rule: SegmentRule | SegmentCondition, parentId: string): boolean => {
      if (rule.type === 'condition') return false;
      
      if (parentId === groupId) {
        rule.operator = rule.operator === 'AND' ? 'OR' : 'AND';
        return true;
      }
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (findGroupAndToggleOperator(rule.rules[i], parentId)) {
          return true;
        }
      }
      
      return false;
    };
    
    findGroupAndToggleOperator(updatedRules, groupId);
    onChange(updatedRules);
  };
  
  // Update a condition
  const updateCondition = (
    conditionId: string, 
    field: string, 
    value: string | number | boolean | Date | null
  ) => {
    const updatedRules = JSON.parse(JSON.stringify(rules));
    
    const findConditionAndUpdate = (
      rule: SegmentRule | SegmentCondition, 
      parentId: string, 
      updateField: string, 
      updateValue: string | number | boolean | Date | null
    ): boolean => {
      if (rule.type === 'condition') {
        if (parentId === conditionId) {
          (rule as any)[updateField] = updateValue;
          return true;
        }
        return false;
      }
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (findConditionAndUpdate(rule.rules[i], conditionId, updateField, updateValue)) {
          return true;
        }
      }
      
      return false;
    };
    
    findConditionAndUpdate(updatedRules, conditionId, field, value);
    onChange(updatedRules);
  };
  
  // Delete a rule (condition or group)
  const deleteRule = (ruleId: string) => {
    const updatedRules = JSON.parse(JSON.stringify(rules));
    
    const findParentAndDeleteRule = (rule: SegmentRule | SegmentCondition, targetId: string): boolean => {
      if (rule.type === 'condition') return false;
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (targetId === getUniqueId()) {
          rule.rules.splice(i, 1);
          return true;
        }
        
        if (findParentAndDeleteRule(rule.rules[i], targetId)) {
          return true;
        }
      }
      
      return false;
    };
    
    findParentAndDeleteRule(updatedRules, ruleId);
    onChange(updatedRules);
  };
  
  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceGroupId = result.source.droppableId;
    const destinationGroupId = result.destination.droppableId;
    
    if (sourceGroupId === destinationGroupId && sourceIndex === destinationIndex) return;
    
    const updatedRules = JSON.parse(JSON.stringify(rules));
    
    // Find the source group and get the item
    let sourceItem: SegmentCondition | SegmentRule | null = null;
    
    const findSourceGroup = (rule: SegmentRule | SegmentCondition, groupId: string): boolean => {
      if (rule.type === 'condition') return false;
      
      if (groupId === sourceGroupId) {
        sourceItem = rule.rules[sourceIndex];
        rule.rules.splice(sourceIndex, 1);
        return true;
      }
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (findSourceGroup(rule.rules[i], groupId)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Find the destination group and insert the item
    const findDestinationGroup = (rule: SegmentRule | SegmentCondition, groupId: string): boolean => {
      if (rule.type === 'condition') return false;
      
      if (groupId === destinationGroupId) {
        rule.rules.splice(destinationIndex, 0, sourceItem as SegmentCondition | SegmentRule);
        return true;
      }
      
      for (let i = 0; i < rule.rules.length; i++) {
        if (findDestinationGroup(rule.rules[i], groupId)) {
          return true;
        }
      }
      
      return false;
    };
    
    findSourceGroup(updatedRules, sourceGroupId);
    findDestinationGroup(updatedRules, destinationGroupId);
    
    onChange(updatedRules);
  };
  
  // Render a rule group
  const renderRuleGroup = (group: SegmentRule, groupId: string, depth = 0) => {
    return (
      <div 
        className={`p-4 border ${depth === 0 ? 'border-secondary-700' : 'border-secondary-800'} rounded-lg bg-secondary-900/70 mb-4`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => toggleOperator(groupId)}
              className="px-3 py-1 text-sm font-medium rounded-md bg-secondary-800 text-secondary-300 hover:bg-secondary-700 transition-colors"
            >
              {group.operator}
            </button>
            <span className="text-secondary-400 text-sm ml-2">
              {group.operator === 'AND' 
                ? 'All conditions must match' 
                : 'Any condition can match'}
            </span>
          </div>
          
          {depth > 0 && (
            <button
              type="button"
              onClick={() => deleteRule(groupId)}
              className="text-secondary-500 hover:text-secondary-300 transition-colors"
              aria-label="Delete group"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
        
        <Droppable droppableId={groupId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              <AnimatePresence>
                {group.rules.map((rule, index) => (
                  <Draggable 
                    key={`${groupId}-rule-${index}`} 
                    draggableId={`${groupId}-rule-${index}`} 
                    index={index}
                  >
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <div 
                          {...provided.dragHandleProps}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-secondary-500 cursor-move"
                        >
                          <GripVertical size={16} />
                        </div>
                        
                        {rule.type === 'condition' 
                          ? renderCondition(rule as SegmentCondition, `${groupId}-rule-${index}`)
                          : renderRuleGroup(rule as SegmentRule, `${groupId}-rule-${index}`, depth + 1)
                        }
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => addCondition(groupId)}
            className="btn btn-ghost btn-sm"
          >
            <Plus size={14} />
            Add Condition
          </button>
          
          <button
            type="button"
            onClick={() => addGroup(groupId)}
            className="btn btn-ghost btn-sm"
          >
            <Plus size={14} />
            Add Group
          </button>
        </div>
      </div>
    );
  };
  
  // Render a condition
  const renderCondition = (condition: SegmentCondition, conditionId: string) => {
    const getOperatorOptions = (field: string) => {
      if (field === 'totalSpend' || field === 'visits') {
        return operatorOptions.number;
      } else if (field === 'lastActivity' || field === 'lastOrder') {
        return operatorOptions.date;
      } else if (field === 'tags') {
        return operatorOptions.array;
      }
      return operatorOptions.default;
    };
    
    return (
      <div className="pl-8 pr-4 py-3 bg-secondary-800/50 rounded-lg border border-secondary-800 flex items-center gap-2">
        <div className="flex-1">
          <select
            value={condition.field}
            onChange={(e) => updateCondition(conditionId, 'field', e.target.value)}
            className="input py-1 px-2 text-sm bg-secondary-900"
          >
            {fieldOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <select
            value={condition.operator}
            onChange={(e) => updateCondition(conditionId, 'operator', e.target.value)}
            className="input py-1 px-2 text-sm bg-secondary-900"
          >
            {getOperatorOptions(condition.field).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <input
            type={condition.field === 'totalSpend' || condition.field === 'visits' ? 'number' : 'text'}
            value={condition.value as string}
            onChange={(e) => {
              let value: string | number = e.target.value;
              if (condition.field === 'totalSpend' || condition.field === 'visits') {
                value = parseInt(value);
              }
              updateCondition(conditionId, 'value', value);
            }}
            className="input py-1 px-2 text-sm bg-secondary-900 w-full"
            placeholder="Value"
          />
        </div>
        
        <button
          type="button"
          onClick={() => deleteRule(conditionId)}
          className="text-secondary-500 hover:text-secondary-300 transition-colors p-1"
          aria-label="Delete condition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  };

  const handleNaturalLanguage = (newRules: SegmentRule) => {
    onChange(newRules);
  };

  return (
    <div className={className}>
      <NaturalLanguageInput onSubmit={handleNaturalLanguage} />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        {renderRuleGroup(rules, 'root')}
      </DragDropContext>
      
      {showPreview && (
        <div className="mt-4 p-4 border border-secondary-700 rounded-lg bg-secondary-900/70">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-secondary-300">Preview Audience</h3>
            
            <div className="flex items-center gap-1">
              <motion.div 
                animate={{ 
                  backgroundColor: previewCount ? '#3b82f6' : '#ef4444',
                  x: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  x: { repeat: previewCount ? 0 : 3, duration: 0.1 }
                }}
                className="h-2 w-2 rounded-full"
              />
              
              <span className="text-xs text-secondary-400">
                {previewCount ? 'Segment is valid' : 'Add at least one condition'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-800 flex items-center justify-center">
                <Users size={14} className="text-primary-300" />
              </div>
              
              <div>
                <p className="text-white font-medium">
                  {previewCount || 0} Customers
                </p>
                <p className="text-xs text-secondary-500">
                  in this segment
                </p>
              </div>
            </div>
            
            {previewCount ? (
              <div className="flex gap-2">
                <div className="flex items-center px-3 py-1 bg-green-900/20 text-green-500 rounded-md text-xs">
                  <Check size={12} className="mr-1" />
                  Segment Valid
                </div>
              </div>
            ) : (
              <div className="flex items-center px-3 py-1 bg-red-900/20 text-red-500 rounded-md text-xs">
                <X size={12} className="mr-1" />
                Invalid Segment
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleBuilder;