import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  
  const [fontSize, setFontSize] = useState(() => {
    const savedSize = localStorage.getItem('fontSize');
    return savedSize ? parseInt(savedSize) : 16;
  });

  const theme = {
    darkMode,
    fontSizePixels: fontSize,
    fontSizes: {
      small: `${fontSize * 0.75}px`,    
      medium: `${fontSize}px`,           
      large: `${fontSize * 1.25}px`,     
    },
    colors: {
      background: darkMode ? '#333' : '#f0f2f5',
      text: darkMode ? '#fff' : '#333',
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const changeFontSize = (size) => {
    if (typeof size === 'number' && size >= 12 && size <= 20) {
      setFontSize(size);
      localStorage.setItem('fontSize', size.toString());
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [darkMode, fontSize]);

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      fontSize, 
      changeFontSize,
      theme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};