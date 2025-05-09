import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import MemoriesPage from './pages/MemoriesPage';
import ReminderPage from './pages/ReminderPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import { AppProvider } from './context/AppContext';
import './styles/rtl.css';

function App() {
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = 'ar';
    document.title = 'مُدرك | مساعد الذاكرة الذكي';
  }, [isRTL]);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 font-cairo">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/voice" element={<VoiceAssistantPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/reminders" element={<ReminderPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;