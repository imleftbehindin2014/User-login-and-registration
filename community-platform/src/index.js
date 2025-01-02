import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage';
import SetPasswordPage from './pages/SetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AuthProvider, { useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './styles/tailwind.css';
import './styles/globals.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { darkMode } = useTheme();
  return (
    <StyledThemeProvider theme={{ darkMode }}>
      <GlobalStyles darkMode={darkMode} />
      <Router>
        <div className="App">
          <Navbar />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={
                <>
                  <Routes>
                    <Route path="/" element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile-customization" element={
                      <ProtectedRoute>
                        <ProfileCustomizationPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/set-password" element={
                      <ProtectedRoute>
                        <SetPasswordPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);