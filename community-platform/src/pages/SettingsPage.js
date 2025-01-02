import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${props => props.theme.darkMode ? '#2a2a3d' : '#ffffff'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfilePicture = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #e0e0e0;
  margin-right: 1.5rem;
`;

const OnlineStatus = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.darkMode ? '#2a2a3d' : '#ffffff'};
  background-color: ${props => props.isOnline ? '#52c41a' : '#d9d9d9'};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background: ${props => props.theme.darkMode ? '#2a2a3d' : '#ffffff'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
`;

const CardTitle = styled.h2`
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.darkMode ? '#3a3a4d' : '#eaeaea'};
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.darkMode ? '#3a3a4d' : '#dddddd'};
  border-radius: 4px;
  background: ${props => props.theme.darkMode ? '#1e1e2f' : '#ffffff'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #4a90e2;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #4a90e2;
    color: white;
    
    &:hover {
      background: #357abd;
    }
  ` : `
    background: transparent;
    color: ${props.theme.darkMode ? '#ffffff' : '#333333'};
    border: 1px solid ${props.theme.darkMode ? '#3a3a4d' : '#dddddd'};
    
    &:hover {
      background: ${props.theme.darkMode ? '#3a3a4d' : '#f5f5f5'};
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Alert = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  background: ${props => props.type === 'error' ? '#ff4d4f20' : '#52c41a20'};
  color: ${props => props.type === 'error' ? '#ff4d4f' : '#52c41a'};
  border: 1px solid ${props => props.type === 'error' ? '#ff4d4f' : '#52c41a'};
`;

const Email = styled.p`
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  font-size: 1.1rem;
  margin: 0;
`;

const SettingsPage = () => {
  const { darkMode, toggleDarkMode, changeFontSize } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { isOnline, updateOnlineStatus } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const [settings, setSettings] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    return {
      email: '',
      preferences: {
        theme: darkMode ? 'dark' : 'light',
        language: language || 'en',
        fontSize: savedFontSize
      },
      privacy: {
        profileVisibility: true,
        onlineStatus: isOnline
      }
    };
  });

  useEffect(() => {
    const loadUserSettings = () => {
      try {
        const userId = localStorage.getItem('loggedInUserId');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.userid === userId);
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        const onlineStatus = localStorage.getItem('onlineStatus') === 'true';

        if (user) {
          setSettings(prev => ({
            email: user.email || '',
            preferences: {
              theme: user.profile?.preferences?.displayTheme?.toLowerCase() || 'light',
              language: user.profile?.preferences?.language || 'en',
              fontSize: savedFontSize
            },
            privacy: {
              profileVisibility: user.profile?.privacy?.profileVisibility ?? true,
              onlineStatus: onlineStatus
            }
          }));

          const fontSizeMap = {
            small: 14,
            medium: 16,
            large: 20
          };
          changeFontSize(fontSizeMap[savedFontSize]);
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
        showAlert('error', t('alerts.error'));
      }
    };

    loadUserSettings();
  }, [changeFontSize, t]);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));

    if (category === 'preferences') {
      if (setting === 'theme') {
        toggleDarkMode();
      }
      if (setting === 'language' && setLanguage) {
        setLanguage(value);
        localStorage.setItem('languagePreference', value);
      }
      if (setting === 'fontSize') {
        const fontSizeMap = {
          small: 14,
          medium: 16,
          large: 20
        };
        changeFontSize(fontSizeMap[value]);
        localStorage.setItem('fontSize', value);
        
        setSettings(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            fontSize: value
          }
        }));
      }
    }

    if (category === 'privacy' && setting === 'onlineStatus') {
      updateOnlineStatus(value);
      localStorage.setItem('onlineStatus', value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('loggedInUserId');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
      const userIndex = users.findIndex(user => user.userid === userId);

      if (userIndex !== -1) {
        const user = users[userIndex];
        
        users[userIndex] = {
          ...user,
          email: settings.email,
          profile: {
            ...user.profile,
            preferences: {
              displayTheme: settings.preferences.theme === 'dark' ? 'Dark' : 'Light',
              language: settings.preferences.language,
              fontSize: settings.preferences.fontSize 
            },
            privacy: {
              ...user.profile.privacy,
              profileVisibility: settings.privacy.profileVisibility,
              onlineStatus: settings.privacy.onlineStatus,
              lastOnline: new Date().toISOString()
            }
          }
        };

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
        localStorage.setItem('fontSize', settings.preferences.fontSize); 
        showAlert('success', t('alerts.success'));
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showAlert('error', t('alerts.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {alert && (
        <Alert type={alert.type}>
          {alert.type === 'success' ? t('settings.alerts.success') : t('settings.alerts.error')}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <ProfileSection>
          <ProfilePicture>
            {settings.privacy.onlineStatus && (
              <OnlineStatus isOnline={isOnline} />
            )}
          </ProfilePicture>
          <ProfileInfo>
            <Email>{settings.email}</Email>
            <Button type="button" onClick={() => navigate('/set-password')}>
              {t('settings.buttons.changePassword')}
            </Button>
          </ProfileInfo>
        </ProfileSection>

        <Card>
          <CardTitle>{t('settings.preferences.title')}</CardTitle>
          <FormGroup>
            <Label htmlFor="theme">{t('settings.preferences.theme')}</Label>
            <Select
              id="theme"
              value={settings.preferences.theme}
              onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
            >
              <option value="light">{t('settings.preferences.themes.light')}</option>
              <option value="dark">{t('settings.preferences.themes.dark')}</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="language">{t('settings.preferences.language')}</Label>
            <Select
              id="language"
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
            >
              <option value="en">{t('settings.preferences.languages.english')}</option>
              <option value="fr">{t('settings.preferences.languages.french')}</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fontSize">{t('settings.preferences.fontSize')}</Label>
            <Select
              id="fontSize"
              value={settings.preferences.fontSize}
              onChange={(e) => handleSettingChange('preferences', 'fontSize', e.target.value)}
            >
              <option value="small">{t('settings.preferences.fontSizes.small')}</option>
              <option value="medium">{t('settings.preferences.fontSizes.medium')}</option>
            <option value="large">{t('settings.preferences.fontSizes.large')}</option>
            </Select>
          </FormGroup>
        </Card>

        <Card>
          <CardTitle>{t('settings.privacy.title')}</CardTitle>
          <FormGroup>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="profileVisibility">
                {t('settings.privacy.profileVisibility')}
              </Label>
              <Switch>
                <input
                  type="checkbox"
                  id="profileVisibility"
                  checked={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.checked)}
                />
                <span />
              </Switch>
            </div>
          </FormGroup>
          <FormGroup>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="onlineStatus">
                {t('settings.privacy.onlineStatus')}
              </Label>
              <Switch>
                <input
                  type="checkbox"
                  id="onlineStatus"
                  checked={settings.privacy.onlineStatus}
                  onChange={(e) => handleSettingChange('privacy', 'onlineStatus', e.target.checked)}
                />
                <span />
              </Switch>
            </div>
          </FormGroup>
        </Card>

        <ButtonGroup>
          <Button type="submit" primary disabled={loading}>
            {loading ? t('settings.buttons.saving') : t('settings.buttons.save')}
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default SettingsPage;