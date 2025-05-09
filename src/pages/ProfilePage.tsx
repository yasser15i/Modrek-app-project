import React, { useState } from 'react';
import { ArrowRight, User, Volume2, Save, X, Plus } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/UI/Button';
import { useApp } from '../context/AppContext';
import { ImportantInfo } from '../types';

const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [newInfo, setNewInfo] = useState<ImportantInfo>({ label: '', detail: '' });
  const [showAddInfo, setShowAddInfo] = useState(false);

  const handleSaveProfile = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleAddInfo = () => {
    if (newInfo.label && newInfo.detail) {
      setEditedProfile({
        ...editedProfile,
        importantInfo: [...editedProfile.importantInfo, newInfo],
      });
      setNewInfo({ label: '', detail: '' });
      setShowAddInfo(false);
    }
  };

  const handleRemoveInfo = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      importantInfo: editedProfile.importantInfo.filter((_, i) => i !== index),
    });
  };

  const testVoice = () => {
    const utterance = new SpeechSynthesisUtterance('مرحباً، أنا مُدرك مساعدك الشخصي للذاكرة');
    utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
    utterance.volume = editedProfile.preferences.voiceVolume / 100;
    utterance.rate = editedProfile.preferences.voiceSpeed;
    window.speechSynthesis.speak(utterance);
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
          <h1 className="text-2xl font-bold">الملف الشخصي</h1>
          
          <div className="mr-auto">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}
                  icon={<X className="w-5 h-5" />}
                >
                  إلغاء
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  icon={<Save className="w-5 h-5" />}
                >
                  حفظ
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                icon={<User className="w-5 h-5" />}
              >
                تعديل
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">المعلومات الشخصية</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العمر</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editedProfile.age}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.age}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">جهة الاتصال في حالات الطوارئ</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.emergencyContact.name}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      emergencyContact: {
                        ...editedProfile.emergencyContact,
                        name: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.emergencyContact.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">صلة القرابة</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.emergencyContact.relation}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      emergencyContact: {
                        ...editedProfile.emergencyContact,
                        relation: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.emergencyContact.relation}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.emergencyContact.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      emergencyContact: {
                        ...editedProfile.emergencyContact,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  dir="ltr"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.emergencyContact.phone}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">معلومات مهمة</h2>
            {isEditing && !showAddInfo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddInfo(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                إضافة معلومة
              </Button>
            )}
          </div>
          
          {showAddInfo && isEditing && (
            <div className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <input
                    type="text"
                    value={newInfo.label}
                    onChange={(e) => setNewInfo({ ...newInfo, label: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="مثال: فصيلة الدم، الأدوية"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التفاصيل</label>
                  <input
                    type="text"
                    value={newInfo.detail}
                    onChange={(e) => setNewInfo({ ...newInfo, detail: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddInfo(false);
                      setNewInfo({ label: '', detail: '' });
                    }}
                  >
                    إلغاء
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddInfo}
                    disabled={!newInfo.label || !newInfo.detail}
                  >
                    إضافة
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {(isEditing ? editedProfile.importantInfo : profile.importantInfo).length > 0 ? (
            <div className="space-y-3">
              {(isEditing ? editedProfile.importantInfo : profile.importantInfo).map(
                (info, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <p className="text-gray-600 text-sm">{info.detail}</p>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveInfo(index)}
                        className="text-error-500 hover:bg-error-50"
                      >
                        حذف
                      </Button>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">لا توجد معلومات مهمة بعد.</p>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold mb-4">الإعدادات</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">مستوى الصوت</label>
                <span className="text-sm text-gray-500">{editedProfile.preferences.voiceVolume}%</span>
              </div>
              
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editedProfile.preferences.voiceVolume}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      preferences: {
                        ...editedProfile.preferences,
                        voiceVolume: parseInt(e.target.value),
                      },
                    })
                  }
                  disabled={!isEditing}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  onClick={testVoice}
                  icon={<Volume2 className="w-4 h-4" />}
                >
                  اختبار
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">سرعة النطق</label>
                <span className="text-sm text-gray-500">
                  {editedProfile.preferences.voiceSpeed}x
                </span>
              </div>
              
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={editedProfile.preferences.voiceSpeed}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    preferences: {
                      ...editedProfile.preferences,
                      voiceSpeed: parseFloat(e.target.value),
                    },
                  })
                }
                disabled={!isEditing}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">حجم الخط</label>
              {isEditing ? (
                <select
                  value={editedProfile.preferences.textSize}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      preferences: {
                        ...editedProfile.preferences,
                        textSize: e.target.value as 'صغير' | 'متوسط' | 'كبير',
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="صغير">صغير</option>
                  <option value="متوسط">متوسط</option>
                  <option value="كبير">كبير</option>
                </select>
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.preferences.textSize}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المظهر</label>
              {isEditing ? (
                <select
                  value={editedProfile.preferences.theme}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      preferences: {
                        ...editedProfile.preferences,
                        theme: e.target.value as 'فاتح' | 'داكن',
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="فاتح">فاتح</option>
                  <option value="داكن">داكن</option>
                </select>
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profile.preferences.theme}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;