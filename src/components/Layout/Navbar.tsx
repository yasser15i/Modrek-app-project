import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Calendar, Book, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { profile } = useApp();

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'المحادثة', href: '/chat', icon: MessageCircle },
    { name: 'التذكيرات', href: '/reminders', icon: Calendar },
    { name: 'الذكريات', href: '/memories', icon: Book },
    { name: 'الملف الشخصي', href: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-primary-600 rounded-full bg-white shadow-md"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-primary-500/95 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl font-bold">مُدرك</h2>
            <p className="text-primary-100">مرحباً {profile.name}</p>
          </div>
          
          <nav className="flex flex-col items-center space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center text-lg px-4 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-white text-primary-600 font-semibold'
                    : 'text-white hover:bg-primary-400'
                }`}
              >
                <item.icon className="w-6 h-6 ml-2" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:right-0 md:w-64 md:bg-primary-500 md:text-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-24 border-b border-primary-400">
            <h2 className="text-2xl font-bold">مُدرك</h2>
          </div>
          
          <div className="px-4 py-6 text-center">
            <p className="text-primary-100">مرحباً {profile.name}</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-white text-primary-600 font-semibold'
                    : 'text-white hover:bg-primary-400'
                }`}
              >
                <item.icon className="w-5 h-5 ml-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-primary-400 text-center">
            <p className="text-sm text-primary-100">مُدرك - مساعد الذاكرة الذكي</p>
            <p className="text-sm text-primary-100">الإصدار 1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;