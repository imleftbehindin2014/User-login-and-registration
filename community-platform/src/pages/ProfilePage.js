import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Camera, MapPin, Calendar, Mail, Book, Award, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ darkMode }) => (darkMode ? '#1a1a2e' : '#f8f9fa')};
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const CoverPhotoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ darkMode }) => 
    darkMode 
      ? 'linear-gradient(45deg, #2a2a4a, #1a1a2e)'
      : 'linear-gradient(45deg, #3498db, #2ecc71)'
  };
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ darkMode }) => 
      darkMode 
        ? 'rgba(0, 0, 0, 0.3)'
        : 'rgba(255, 255, 255, 0.1)'
    };
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: -100px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const ProfileCard = styled.div`
  background: ${({ darkMode }) => (darkMode ? '#242444' : '#ffffff')};
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, ${({ darkMode }) => (darkMode ? '0.3' : '0.1')});
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
`;

const ProfileHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

const ProfilePhotoContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  input {
    display: none;
  }
`;

const OnlineStatusIndicator = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.isOnline ? '#52c41a' : '#d9d9d9'};
  border: 3px solid ${props => props.darkMode ? '#242444' : '#ffffff'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const ProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid ${({ darkMode }) => (darkMode ? '#353560' : '#ffffff')};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const PhotoOverlay = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${({ darkMode }) => (darkMode ? '#353560' : '#ffffff')};
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.h1`
  font-size: ${({ fontSize }) => fontSize + 16}px;
  font-weight: 700;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  margin: 0;
`;

const Bio = styled.p`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ darkMode }) => (darkMode ? '#b2b2d8' : '#636e72')};
  margin: 8px 0;
  line-height: 1.6;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ darkMode }) => (darkMode ? '#b2b2d8' : '#636e72')};
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? '#3498db' : 'transparent'};
  color: ${props => props.primary ? '#ffffff' : props.darkMode ? '#b2b2d8' : '#2d3436'};
  border: ${props => props.primary ? 'none' : '2px solid currentColor'};
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ fontSize }) => fontSize - 2}px;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.primary ? '#2980b9' : 'rgba(52, 152, 219, 0.1)'};
  }
`;

const InterestsAndSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  font-size: ${({ fontSize }) => fontSize + 4}px;
  font-weight: 600;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  margin-bottom: 16px;
  text-align: center;
`;

const InterestSkillCard = styled.div`
  background: ${({ darkMode }) => (darkMode ? '#2a2a4a' : '#f8f9fa')};
  padding: 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const InterestSkillIcon = styled.div`
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InterestSkillInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InterestSkillValue = styled.span`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  font-weight: 600;
`;

const NoItemsMessage = styled.div`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ darkMode }) => (darkMode ? '#b2b2d8' : '#636e72')};
  text-align: center;
  padding: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LogoutButton = styled(ActionButton)`
  background: ${props => props.darkMode ? '#dc3545' : '#fff'};
  color: ${props => props.darkMode ? '#fff' : '#dc3545'};
  border: 2px solid #dc3545;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #dc3545;
    color: #fff;
    transform: translateY(-2px);
  }
`;

const ProfilePage = () => {
  const { darkMode, fontSize } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(true);
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    email: '',
    location: '',
    joined: 'January 2024',
    interests: [],
    skills: [],
    profilePicture: '/api/placeholder/150/150'
  });

  useEffect(() => {
    if (user?.email) {
      try {
        const allProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
        const storedOnlineStatus = localStorage.getItem('onlineStatus') === 'true';
        setIsOnline(storedOnlineStatus);
        
        if (allProfiles[user.email]) {
          setProfileData(allProfiles[user.email]);
        } else {
          setProfileData(prev => ({
            ...prev,
            email: user.email,
            username: user.username || ''
          }));
        }
  
        const handleOnlineStatusChange = (event) => {
          if (event.key === 'onlineStatus') {
            const newStatus = event.newValue === 'true';
            setIsOnline(newStatus);
          }
        };
  
        window.addEventListener('storage', handleOnlineStatusChange);
        
        return () => {
          window.removeEventListener('storage', handleOnlineStatusChange);
        };
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, [user?.email, user?.username]);  

  const handleEditProfile = () => {
    navigate('/profile-customization');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file && user?.email) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newProfileData = {
          ...profileData,
          profilePicture: e.target.result
        };
        
        const allProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
        allProfiles[user.email] = {
          ...newProfileData,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('userProfiles', JSON.stringify(allProfiles));
        
        setProfileData(newProfileData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer darkMode={darkMode}>
      <CoverPhotoContainer>
        <CoverPhoto darkMode={darkMode} />
      </CoverPhotoContainer>
      
      <ContentWrapper>
        <ProfileCard darkMode={darkMode}>
          <ProfileHeader>
          <ProfilePhotoContainer>
  <ProfilePhoto 
    src={profileData.profilePicture} 
    alt={t('profile.actions.uploadPhoto')} 
    darkMode={darkMode} 
  />
  <PhotoOverlay 
    htmlFor="profilePictureUpload" 
    darkMode={darkMode}
    aria-label={t('profile.actions.uploadPhoto')}
  >
    <Camera size={24} color={darkMode ? '#ffffff' : '#2d3436'} />
  </PhotoOverlay>
  <input 
    type="file" 
    id="profilePictureUpload" 
    accept="image/*" 
    onChange={handleProfilePictureChange}
    style={{ display: 'none' }}
    aria-label={t('profile.actions.uploadPhoto')}
  />
  <OnlineStatusIndicator isOnline={isOnline} darkMode={darkMode} />
</ProfilePhotoContainer>
            
            <ProfileInfo>
              <Name darkMode={darkMode} fontSize={fontSize}>{profileData.username}</Name>
              <Bio darkMode={darkMode} fontSize={fontSize}>{profileData.bio}</Bio>
              <ProfileDetail darkMode={darkMode} fontSize={fontSize}>
                <Mail size={16} />
                {profileData.email}
              </ProfileDetail>
              <ProfileDetail darkMode={darkMode} fontSize={fontSize}>
                <MapPin size={16} />
                {profileData.location || t('profile.info.location')}
              </ProfileDetail>
              <ProfileDetail darkMode={darkMode} fontSize={fontSize}>
                <Calendar size={16} />
                {profileData.joined}
              </ProfileDetail>
            </ProfileInfo>
            
            <ButtonGroup>
              <ActionButton 
                primary 
                onClick={handleEditProfile} 
                darkMode={darkMode} 
                fontSize={fontSize}
              >
                {t('profile.actions.editProfile')}
              </ActionButton>
              <LogoutButton 
                onClick={handleLogout} 
                darkMode={darkMode} 
                fontSize={fontSize}
              >
                <LogOut size={16} />
                {t('profile.actions.logout')}
              </LogoutButton>
            </ButtonGroup>
          </ProfileHeader>
        </ProfileCard>
        
        <ProfileCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode} fontSize={fontSize}>
            {t('profile.sections.interests.title')}
          </SectionTitle>
          <InterestsAndSkillsGrid>
            {(!profileData.interests || profileData.interests.length === 0) ? (
              <NoItemsMessage darkMode={darkMode} fontSize={fontSize}>
                {t('profile.sections.interests.empty')}
              </NoItemsMessage>
            ) : (
              profileData.interests.map((interest, index) => (
                <InterestSkillCard key={`interest-${index}`} darkMode={darkMode}>
                  <InterestSkillIcon>
                    <Book size={24} />
                  </InterestSkillIcon>
                  <InterestSkillInfo>
                    <InterestSkillValue darkMode={darkMode} fontSize={fontSize}>
                      {t(`interests.options.${interest.toLowerCase()}`)}
                    </InterestSkillValue>
                  </InterestSkillInfo>
                </InterestSkillCard>
              ))
            )}
          </InterestsAndSkillsGrid>
        </ProfileCard>
        
        <ProfileCard darkMode={darkMode}>
          <SectionTitle darkMode={darkMode} fontSize={fontSize}>
            {t('profile.sections.skills.title')}
          </SectionTitle>
          <InterestsAndSkillsGrid>
            {(!profileData.skills || profileData.skills.length === 0) ? (
              <NoItemsMessage darkMode={darkMode} fontSize={fontSize}>
                {t('profile.sections.skills.empty')}
              </NoItemsMessage>
            ) : (
              profileData.skills.map((skill, index) => (
                <InterestSkillCard key={`skill-${index}`} darkMode={darkMode}>
                  <InterestSkillIcon>
                    <Award size={24} />
                  </InterestSkillIcon>
                  <InterestSkillInfo>
                    <InterestSkillValue darkMode={darkMode} fontSize={fontSize}>
                      {t(`skills.options.${skill.toLowerCase()}`)}
                    </InterestSkillValue>
                  </InterestSkillInfo>
                </InterestSkillCard>
              ))
            )}
          </InterestsAndSkillsGrid>
        </ProfileCard>
      </ContentWrapper>
    </ProfileContainer>
  );
};

export default ProfilePage;