export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  visits: number;
  lastActivity: string;
  lastOrder: string;
  tags: string[];
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  amount: number;
  status: 'processing' | 'completed' | 'cancelled';
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Campaign {
  id: string;
  name: string;
  createdAt: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'failed';
  audienceSize: number;
  sentCount: number;
  failedCount: number;
  successRate: number;
  segmentRules: SegmentRule;
  message: string;
  scheduledFor?: string;
}

export interface SegmentRule {
  type: 'group'; // always group at the top level
  operator: 'AND' | 'OR';
  rules: (SegmentRule | SegmentCondition)[];
}

export interface SegmentCondition {
  type: 'condition';
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'exists' | 'not_exists' | 'before' | 'after';
  value: string | number | boolean | Date | null;
}

export interface CommunicationLog {
  id: string;
  campaignId: string;
  customerId: string;
  status: 'pending' | 'sent' | 'failed';
  message: string;
  sentAt?: string;
  deliveredAt?: string;
  failureReason?: string;
}

export interface NaturalLanguageToRules {
  query: string;
  rules: SegmentRule;
}