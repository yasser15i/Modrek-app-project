export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isRead: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: Date;
  isCompleted: boolean;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  categoryColor: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  images?: string[];
  people?: string[];
  location?: string;
}

export interface ImportantInfo {
  label: string;
  detail: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface UserPreferences {
  voiceVolume: number;
  voiceSpeed: number;
  textSize: 'صغير' | 'متوسط' | 'كبير';
  theme: 'فاتح' | 'داكن';
}

export interface UserProfile {
  name: string;
  age: number;
  emergencyContact: EmergencyContact;
  importantInfo: ImportantInfo[];
  preferences: UserPreferences;
}