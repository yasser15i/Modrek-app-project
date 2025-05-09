import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Reminder } from '../../types';
import { formatDate, formatTime } from '../../utils/dateUtils';

interface ReminderItemProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onClick: (reminder: Reminder) => void;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ reminder, onToggle, onClick }) => {
  const getPriorityIcon = () => {
    switch (reminder.priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-error-500" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-warning-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const isOverdue = new Date(reminder.date) < new Date() && !reminder.isCompleted;

  return (
    <div 
      className={`bg-white rounded-lg p-4 shadow-soft mb-3 transition-all cursor-pointer border-r-4 hover:shadow-md ${
        reminder.isCompleted 
          ? 'border-success-500 opacity-75' 
          : isOverdue 
            ? 'border-error-500' 
            : `border-${reminder.categoryColor}`
      }`}
      onClick={() => onClick(reminder)}
    >
      <div className="flex items-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(reminder.id);
          }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border mr-3 ${
            reminder.isCompleted ? 'bg-success-500 border-success-500' : 'border-gray-300'
          }`}
        >
          {reminder.isCompleted && <CheckCircle className="w-6 h-6 text-white" />}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-medium ${reminder.isCompleted ? 'line-through text-gray-500' : ''}`}>
            {reminder.title}
          </h3>
          
          {reminder.description && (
            <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
          )}
          
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <div className="flex items-center ml-3">
              {getPriorityIcon()}
              <span className="mr-1">
                {formatDate(reminder.date)} - {formatTime(reminder.date)}
              </span>
            </div>
            
            {reminder.isRecurring && (
              <span className="inline-flex text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                {reminder.recurrencePattern === 'daily' && 'يومي'}
                {reminder.recurrencePattern === 'weekly' && 'أسبوعي'}
                {reminder.recurrencePattern === 'monthly' && 'شهري'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderItem;