import React, { useState } from 'react';
import { ArrowRight, Plus, Search } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import MemoryCard from '../components/Memory/MemoryCard';
import Button from '../components/UI/Button';
import { useApp } from '../context/AppContext';
import { Memory } from '../types';

const MemoriesPage: React.FC = () => {
  const { memories, addMemory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [newMemory, setNewMemory] = useState<Partial<Memory>>({
    title: '',
    description: '',
    date: new Date(),
    tags: [],
    people: [],
    location: '',
  });

  const filteredMemories = memories.filter(
    (memory) =>
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (memory.people && memory.people.some((person) => person.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleAddMemory = () => {
    if (newMemory.title && newMemory.description) {
      const memoryToAdd: Memory = {
        id: Date.now().toString(),
        title: newMemory.title,
        description: newMemory.description,
        date: newMemory.date || new Date(),
        tags: newMemory.tags || [],
        people: newMemory.people || [],
        location: newMemory.location || '',
      };
      
      addMemory(memoryToAdd);
      setIsAddingMemory(false);
      setNewMemory({
        title: '',
        description: '',
        date: new Date(),
        tags: [],
        people: [],
        location: '',
      });
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !newMemory.tags?.includes(newTag)) {
        setNewMemory({
          ...newMemory,
          tags: [...(newMemory.tags || []), newTag],
        });
        e.currentTarget.value = '';
      }
    }
  };

  const handlePeopleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newPerson = e.currentTarget.value.trim();
      if (newPerson && !newMemory.people?.includes(newPerson)) {
        setNewMemory({
          ...newMemory,
          people: [...(newMemory.people || []), newPerson],
        });
        e.currentTarget.value = '';
      }
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
          <h1 className="text-2xl font-bold">الذكريات</h1>
          
          <div className="mr-auto">
            <Button
              variant="primary"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => setIsAddingMemory(true)}
            >
              ذكرى جديدة
            </Button>
          </div>
        </div>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="ابحث في الذكريات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 pr-12 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        {isAddingMemory ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">إضافة ذكرى جديدة</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان
                </label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="عنوان الذكرى"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف
                </label>
                <textarea
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="اكتب تفاصيل الذكرى هنا..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  التاريخ
                </label>
                <input
                  type="date"
                  value={newMemory.date ? new Date(newMemory.date).toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewMemory({ ...newMemory, date: new Date(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المكان
                </label>
                <input
                  type="text"
                  value={newMemory.location || ''}
                  onChange={(e) => setNewMemory({ ...newMemory, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أين حدثت هذه الذكرى؟"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الأشخاص (اضغط Enter لإضافة كل شخص)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newMemory.people?.map((person, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-800"
                    >
                      {person}
                      <button
                        type="button"
                        className="mr-1 text-secondary-600 hover:text-secondary-900"
                        onClick={() =>
                          setNewMemory({
                            ...newMemory,
                            people: newMemory.people?.filter((_, i) => i !== index),
                          })
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  onKeyDown={handlePeopleInput}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أضف أسماء الأشخاص المرتبطين بهذه الذكرى"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوسوم (اضغط Enter لإضافة كل وسم)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newMemory.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
                    >
                      {tag}
                      <button
                        type="button"
                        className="mr-1 text-primary-600 hover:text-primary-900"
                        onClick={() =>
                          setNewMemory({
                            ...newMemory,
                            tags: newMemory.tags?.filter((_, i) => i !== index),
                          })
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أضف وسوم لتصنيف الذكرى (مثال: عائلة، سفر)"
                />
              </div>
              
              <div className="flex justify-end space-x-3 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  onClick={() => setIsAddingMemory(false)}
                >
                  إلغاء
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddMemory}
                  disabled={!newMemory.title || !newMemory.description}
                >
                  حفظ الذكرى
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredMemories.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-soft">
                <p className="text-gray-500 mb-4">لا توجد ذكريات بعد.</p>
                <Button
                  variant="primary"
                  icon={<Plus className="w-5 h-5" />}
                  onClick={() => setIsAddingMemory(true)}
                >
                  أضف ذكرى جديدة
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMemories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoriesPage;