import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlobalStyles } from './components/GlobalStyles';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SetPasswordPage from './pages/SetPasswordPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const styledTheme = {
    ...theme,
    darkMode: theme?.darkMode ?? false,
    fontSizePixels: theme?.fontSizePixels ?? 16,
    fontSizes: {
      small: theme?.fontSizes?.small ?? '12px',
      medium: theme?.fontSizes?.medium ?? '16px',
      large: theme?.fontSizes?.large ?? '20px',
    },
    colors: {
      background: theme?.colors?.background ?? '#f0f2f5',
      text: theme?.colors?.text ?? '#333',
    }
  };

  return (
    <StyledThemeProvider theme={styledTheme}>
      <GlobalStyles />
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-customization"
          element={
            <ProtectedRoute>
              <ProfileCustomizationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-password"
          element={
            <ProtectedRoute>
              <SetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <Router>
      <CustomThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </LanguageProvider>
      </CustomThemeProvider>
    </Router>
  );
}

export default App;