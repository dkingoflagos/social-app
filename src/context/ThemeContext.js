import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../theme/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app-theme');
      if (savedTheme && Object.keys(themes).includes(savedTheme)) {
        setCurrentTheme(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTheme = async (themeName) => {
    if (Object.keys(themes).includes(themeName)) {
      try {
        await AsyncStorage.setItem('app-theme', themeName);
        setCurrentTheme(themeName);
      } catch (error) {
        console.log('Error saving theme:', error);
      }
    }
  };

  const theme = themes[currentTheme] || themes.light;

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, theme, isLoading }}>
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
