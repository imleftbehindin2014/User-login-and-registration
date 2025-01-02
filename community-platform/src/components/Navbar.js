import React, { useState } from 'react';
import { Menu, Home, User, Settings, Globe } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  const { darkMode } = useTheme();
  const { t, language, setLanguage } = useLanguage();

  if (location.pathname === '/login') {
    return null;
  }

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
    localStorage.setItem('languagePreference', newLang);
    setIsLanguageDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`bg-gradient-to-r ${
      darkMode 
        ? 'from-gray-800 to-gray-900' 
        : 'from-blue-600 to-blue-800'
    } shadow-lg transition-colors duration-200 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0 flex items-center">
         <span className="text-white text-xl font-bold tracking-tight">
  </span>
</div>

<div className="hidden md:flex items-center space-x-4">
  <NavItem 
    icon={<Home size={18} />} 
    text={t('navigation.home')} 
    to="/" 
    isActive={location.pathname === '/'} 
    darkMode={darkMode} 
    closeMobileMenu={closeMobileMenu} 
  />
  <NavItem 
    icon={<User size={18} />} 
    text={t('navigation.profile')} 
    to="/profile" 
    isActive={location.pathname === '/profile'} 
    darkMode={darkMode} 
    closeMobileMenu={closeMobileMenu} 
  />
  <NavItem 
    icon={<Settings size={18} />} 
    text={t('navigation.settings')} 
    to="/settings" 
    isActive={location.pathname === '/settings'} 
    darkMode={darkMode} 
    closeMobileMenu={closeMobileMenu} 
  />
            
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-700 
                  ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'} hover:text-white`}
              >
                <Globe size={18} className="mr-2" />
                {language.toUpperCase()}
              </button>
              
              {isLanguageDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50
                ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                <div className="py-1">
                  <button
        onClick={toggleLanguage}
        className={`block px-4 py-2 text-sm w-full text-left
          ${darkMode 
            ? 'text-gray-200 hover:bg-gray-700' 
            : 'text-gray-700 hover:bg-gray-100'}`}
      >
        {language === 'en' ? 'Français' : 'English'}
      </button>
    </div>
  </div>
)}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-white 
                ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavItem text={t?.home} to="/" isActive={location.pathname === '/'} darkMode={darkMode} closeMobileMenu={closeMobileMenu} />
            <MobileNavItem text={t?.profile} to="/profile" isActive={location.pathname === '/profile'} darkMode={darkMode} closeMobileMenu={closeMobileMenu} />
            <MobileNavItem text={t?.settings} to="/settings" isActive={location.pathname === '/settings'} darkMode={darkMode} closeMobileMenu={closeMobileMenu} />
            <button
              onClick={toggleLanguage}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 
                ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'} hover:text-white`}
            >
              <Globe size={18} className="inline mr-2" />
              {language === 'en' ? 'Français' : 'English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ icon, text, to, isActive, darkMode, closeMobileMenu }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
      ${isActive 
        ? `${darkMode ? 'bg-gray-700' : 'bg-blue-700'} text-white` 
        : `text-blue-100 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'} hover:text-white`
      }`}
    onClick={closeMobileMenu}
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

const MobileNavItem = ({ text, to, isActive, darkMode, closeMobileMenu }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out
      ${isActive 
        ? `${darkMode ? 'bg-gray-700' : 'bg-blue-700'} text-white` 
        : `text-blue-100 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'} hover:text-white`
      }`}
    onClick={closeMobileMenu}
  >
    {text}
  </Link>
);

export default Navbar;