import React, { useState } from 'react';
import { ArrowRight, Plus, Search, Calendar, Clock } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import ReminderItem from '../components/Reminder/ReminderItem';
import Button from '../components/UI/Button';
import { useApp } from '../context/AppContext';
import { Reminder } from '../types';

const ReminderPage: React.FC = () => {
  const { reminders, addReminder, removeReminder, updateReminder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    description: '',
    date: new Date(),
    isCompleted: false,
    isRecurring: false,
    recurrencePattern: 'daily',
    categoryColor: 'primary-500',
    priority: 'medium',
  });

  const filteredReminders = reminders.filter(
    (reminder) =>
      reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reminder.description && reminder.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.date) {
      const reminderToAdd: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        description: newReminder.description,
        date: newReminder.date || new Date(),
        isCompleted: false,
        isRecurring: newReminder.isRecurring || false,
        recurrencePattern: newReminder.recurrencePattern,
        categoryColor: newReminder.categoryColor || 'primary-500',
        priority: newReminder.priority || 'medium',
      };
      
      addReminder(reminderToAdd);
      setIsAddingReminder(false);
      setNewReminder({
        title: '',
        description: '',
        date: new Date(),
        isCompleted: false,
        isRecurring: false,
        recurrencePattern: 'daily',
        categoryColor: 'primary-500',
        priority: 'medium',
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
      updateReminder(id, { isCompleted: !reminder.isCompleted });
    }
  };

  const handleReminderClick = (reminder: Reminder) => {
    setSelectedReminder(reminder);
  };

  const handleUpdateReminder = () => {
    if (selectedReminder && selectedReminder.id) {
      updateReminder(selectedReminder.id, selectedReminder);
      setSelectedReminder(null);
    }
  };

  return (
    <div className="md:mr-64 min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => window.history.back()}
            className="ml-3"
          />
          <h1 className="text-2xl font-bold">التذكيرات</h1>
          
          <div className="mr-auto">
            <Button
              variant="primary"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => {
                setIsAddingReminder(true);
                setSelectedReminder(null);
              }}
            >
              تذكير جديد
            </Button>
          </div>
        </div>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="ابحث في التذكيرات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 pr-12 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        {isAddingReminder || selectedReminder ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">
              {selectedReminder ? 'تحديث التذكير' : 'إضافة تذكير جديد'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان
                </label>
                <input
                  type="text"
                  value={selectedReminder ? selectedReminder.title : newReminder.title}
                  onChange={(e) =>
                    selectedReminder
                      ? setSelectedReminder({ ...selectedReminder, title: e.target.value })
                      : setNewReminder({ ...newReminder, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="عنوان التذكير"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف (اختياري)
                </label>
                <textarea
                  value={
                    selectedReminder
                      ? selectedReminder.description || ''
                      : newReminder.description || ''
                  }
                  onChange={(e) =>
                    selectedReminder
                      ? setSelectedReminder({ ...selectedReminder, description: e.target.value })
                      : setNewReminder({ ...newReminder, description: e.target.value })
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="تفاصيل إضافية عن التذكير"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline-block w-4 h-4 ml-1" />
                    التاريخ
                  </label>
                  <input
                    type="date"
                    value={
                      selectedReminder
                        ? new Date(selectedReminder.date).toISOString().split('T')[0]
                        : newReminder.date
                        ? new Date(newReminder.date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) =>
                      selectedReminder
                        ? setSelectedReminder({
                            ...selectedReminder,
                            date: new Date(e.target.value),
                          })
                        : setNewReminder({ ...newReminder, date: new Date(e.target.value) })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="inline-block w-4 h-4 ml-1" />
                    الوقت
                  </label>
                  <input
                    type="time"
                    value={
                      selectedReminder
                        ? new Date(selectedReminder.date).toTimeString().slice(0, 5)
                        : newReminder.date
                        ? new Date(newReminder.date).toTimeString().slice(0, 5)
                        : ''
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const newDate = selectedReminder
                        ? new Date(selectedReminder.date)
                        : new Date(newReminder.date || new Date());
                      newDate.setHours(hours, minutes);
                      
                      selectedReminder
                        ? setSelectedReminder({ ...selectedReminder, date: newDate })
                        : setNewReminder({ ...newReminder, date: newDate });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الأولوية
                </label>
                <select
                  value={selectedReminder ? selectedReminder.priority : newReminder.priority}
                  onChange={(e) => {
                    const value = e.target.value as 'low' | 'medium' | 'high';
                    selectedReminder
                      ? setSelectedReminder({ ...selectedReminder, priority: value })
                      : setNewReminder({ ...newReminder, priority: value });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={selectedReminder ? selectedReminder.isRecurring : newReminder.isRecurring}
                  onChange={(e) =>
                    selectedReminder
                      ? setSelectedReminder({
                          ...selectedReminder,
                          isRecurring: e.target.checked,
                        })
                      : setNewReminder({ ...newReminder, isRecurring: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2"
                />
                <label htmlFor="isRecurring" className="text-sm text-gray-700">
                  تكرار التذكير
                </label>
              </div>
              
              {(selectedReminder ? selectedReminder.isRecurring : newReminder.isRecurring) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نمط التكرار
                  </label>
                  <select
                    value={
                      selectedReminder
                        ? selectedReminder.recurrencePattern
                        : newReminder.recurrencePattern
                    }
                    onChange={(e) => {
                      const value = e.target.value as 'daily' | 'weekly' | 'monthly';
                      selectedReminder
                        ? setSelectedReminder({
                            ...selectedReminder,
                            recurrencePattern: value,
                          })
                        : setNewReminder({ ...newReminder, recurrencePattern: value });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                  </select>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsAddingReminder(false);
                    setSelectedReminder(null);
                  }}
                >
                  إلغاء
                </Button>
                
                {selectedReminder && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (selectedReminder) {
                        removeReminder(selectedReminder.id);
                        setSelectedReminder(null);
                      }
                    }}
                    className="ml-auto"
                  >
                    حذف
                  </Button>
                )}
                
                <Button
                  variant="primary"
                  onClick={selectedReminder ? handleUpdateReminder : handleAddReminder}
                  disabled={
                    selectedReminder
                      ? !selectedReminder.title
                      : !newReminder.title || !newReminder.date
                  }
                >
                  {selectedReminder ? 'تحديث' : 'حفظ'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredReminders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-soft">
                <p className="text-gray-500 mb-4">لا توجد تذكيرات بعد.</p>
                <Button
                  variant="primary"
                  icon={<Plus className="w-5 h-5" />}
                  onClick={() => setIsAddingReminder(true)}
                >
                  أضف تذكير جديد
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-medium mb-3">التذكيرات القادمة</h2>
                {filteredReminders
                  .filter((r) => !r.isCompleted && new Date(r.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((reminder) => (
                    <ReminderItem
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={handleToggleComplete}
                      onClick={handleReminderClick}
                    />
                  ))}
                
                {filteredReminders.some((r) => r.isCompleted) && (
                  <>
                    <h2 className="text-lg font-medium mt-6 mb-3">التذكيرات المكتملة</h2>
                    {filteredReminders
                      .filter((r) => r.isCompleted)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((reminder) => (
                        <ReminderItem
                          key={reminder.id}
                          reminder={reminder}
                          onToggle={handleToggleComplete}
                          onClick={handleReminderClick}
                        />
                      ))}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderPage;