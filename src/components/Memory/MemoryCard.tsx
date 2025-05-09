import React from 'react';
import { Memory } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { BookOpen, MapPin, Users, Tag } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  onClick?: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-soft p-4 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{memory.title}</h3>
      
      <p className="text-gray-600 mb-3 text-sm line-clamp-2">{memory.description}</p>
      
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="ml-2">{formatDate(memory.date)}</span>
      </div>
      
      {memory.location && (
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 ml-1" />
          <span>{memory.location}</span>
        </div>
      )}
      
      {memory.people && memory.people.length > 0 && (
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Users className="w-4 h-4 ml-1" />
          <span>{memory.people.join(', ')}</span>
        </div>
      )}
      
      {memory.tags && memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {memory.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700"
            >
              <Tag className="w-3 h-3 ml-1" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryCard;