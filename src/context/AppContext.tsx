import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, Reminder, Memory, UserProfile } from '../types';

interface AppContextType {
  messages: Message[];
  reminders: Reminder[];
  memories: Memory[];
  profile: UserProfile;
  isListening: boolean;
  isSpeaking: boolean;
  addMessage: (message: Message) => void;
  addReminder: (reminder: Reminder) => void;
  removeReminder: (id: string) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  addMemory: (memory: Memory) => void;
  removeMemory: (id: string) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  startListening: () => void;
  stopListening: () => void;
  startSpeaking: (text: string) => void;
  stopSpeaking: () => void;
}

// Default user profile
const defaultProfile: UserProfile = {
  name: 'المستخدم',
  age: 65,
  emergencyContact: {
    name: 'أحمد',
    relation: 'ابن',
    phone: '0555555555'
  },
  importantInfo: [
    { label: 'مرض السكري', detail: 'النوع الثاني' },
    { label: 'الحساسية', detail: 'البنسلين' }
  ],
  preferences: {
    voiceVolume: 80,
    voiceSpeed: 1,
    textSize: 'كبير',
    theme: 'فاتح'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load data from localStorage on initialization
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    const savedReminders = localStorage.getItem('reminders');
    const savedMemories = localStorage.getItem('memories');
    const savedProfile = localStorage.getItem('profile');

    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedReminders) setReminders(JSON.parse(savedReminders));
    if (savedMemories) setMemories(JSON.parse(savedMemories));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  // Functions to manage messages
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  // Functions to manage reminders
  const addReminder = (reminder: Reminder) => {
    setReminders(prev => [...prev, reminder]);
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, ...updates } : reminder
      )
    );
  };

  // Functions to manage memories
  const addMemory = (memory: Memory) => {
    setMemories(prev => [...prev, memory]);
  };

  const removeMemory = (id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(prev => 
      prev.map(memory => 
        memory.id === id ? { ...memory, ...updates } : memory
      )
    );
  };

  // Function to update profile
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  // Speech recognition functions (simplified for now)
  const startListening = () => {
    setIsListening(true);
    // In a real app, we would initialize the SpeechRecognition API here
  };

  const stopListening = () => {
    setIsListening(false);
    // In a real app, we would stop the SpeechRecognition API here
  };

  // Text-to-speech functions (simplified for now)
  const startSpeaking = (text: string) => {
    setIsSpeaking(true);
    // In a real app, we would use the SpeechSynthesis API here
    
    // Simple implementation:
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
    utterance.rate = profile.preferences.voiceSpeed;
    utterance.volume = profile.preferences.voiceVolume / 100;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const value = {
    messages,
    reminders,
    memories,
    profile,
    isListening,
    isSpeaking,
    addMessage,
    addReminder,
    removeReminder,
    updateReminder,
    addMemory,
    removeMemory,
    updateMemory,
    updateProfile,
    startListening,
    stopListening,
    startSpeaking,
    stopSpeaking
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};