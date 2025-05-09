import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageCircle, Calendar, Book, User, Bell } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/UI/Button';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, reminders, startSpeaking } = useApp();
  
  // Get today's reminders
  const todayReminders = reminders.filter((reminder) => {
    const today = new Date();
    const reminderDate = new Date(reminder.date);
    
    return (
      reminderDate.getDate() === today.getDate() &&
      reminderDate.getMonth() === today.getMonth() &&
      reminderDate.getFullYear() === today.getFullYear() &&
      !reminder.isCompleted
    );
  });

  // Welcome message when component mounts
  useEffect(() => {
    const welcomeMessage = `مرحباً ${profile.name}، كيف يمكنني مساعدتك اليوم؟`;
    
    // Delay the welcome message slightly for better UX
    const timer = setTimeout(() => {
      startSpeaking(welcomeMessage);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [profile.name, startSpeaking]);

  return (
    <div className="md:mr-64">
      <Navbar />
      
      <main className="p-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-l from-primary-100 to-primary-200 rounded-2xl p-6 mb-8 shadow-soft">
          <div className="flex items-center mb-4">
            <Brain className="w-10 h-10 text-primary-600 ml-3" />
            <div>
              <h1 className="text-2xl font-bold text-primary-800">
                مرحباً، {profile.name}
              </h1>
              <p className="text-primary-600">
                أنا مُدرك، مساعدك الشخصي للذاكرة
              </p>
            </div>
          </div>
          
          <p className="text-primary-700 mb-4">
            كيف يمكنني مساعدتك اليوم؟
          </p>
          
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/chat')}
            className="w-full md:w-auto"
            icon={<MessageCircle className="w-5 h-5" />}
          >
            بدء محادثة جديدة
          </Button>
        </div>
        
        {todayReminders.length > 0 && (
          <div className="bg-white rounded-xl shadow-soft p-5 mb-8">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-primary-500 ml-2" />
              <h2 className="text-xl font-semibold">تذكيرات اليوم</h2>
            </div>
            
            <div className="space-y-3">
              {todayReminders.slice(0, 3).map((reminder) => (
                <div 
                  key={reminder.id}
                  className="p-3 border-r-4 border-primary-500 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate('/reminders')}
                >
                  <p className="font-medium">{reminder.title}</p>
                  {reminder.description && (
                    <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                  )}
                </div>
              ))}
              
              {todayReminders.length > 3 && (
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/reminders')}
                  className="w-full mt-2"
                >
                  عرض كل التذكيرات ({todayReminders.length})
                </Button>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="bg-white rounded-xl shadow-soft p-6 cursor-pointer hover:shadow-md transition-shadow flex items-center"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle className="w-10 h-10 text-primary-500 ml-4" />
            <div>
              <h3 className="text-lg font-semibold">التحدث مع مُدرك</h3>
              <p className="text-gray-600">دردش معي لتخزين الذكريات أو لأذكرك بالتفاصيل</p>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl shadow-soft p-6 cursor-pointer hover:shadow-md transition-shadow flex items-center"
            onClick={() => navigate('/reminders')}
          >
            <Calendar className="w-10 h-10 text-secondary-500 ml-4" />
            <div>
              <h3 className="text-lg font-semibold">التذكيرات</h3>
              <p className="text-gray-600">تنظيم المواعيد والتذكيرات اليومية</p>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl shadow-soft p-6 cursor-pointer hover:shadow-md transition-shadow flex items-center"
            onClick={() => navigate('/memories')}
          >
            <Book className="w-10 h-10 text-accent-500 ml-4" />
            <div>
              <h3 className="text-lg font-semibold">الذكريات</h3>
              <p className="text-gray-600">سجل للذكريات والأحداث المهمة</p>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl shadow-soft p-6 cursor-pointer hover:shadow-md transition-shadow flex items-center"
            onClick={() => navigate('/profile')}
          >
            <User className="w-10 h-10 text-primary-600 ml-4" />
            <div>
              <h3 className="text-lg font-semibold">الملف الشخصي</h3>
              <p className="text-gray-600">تحديث المعلومات الشخصية والإعدادات</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;