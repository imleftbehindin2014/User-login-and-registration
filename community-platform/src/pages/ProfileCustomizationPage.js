import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { Camera, User, Mail, MapPin, X, Check } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 0.95;
    transform: scale(0.89);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const InterestButton = styled.button`
  background: ${({ selected, darkMode }) =>
    selected ? (darkMode ? '#0073b1' : '#0073e6') : 'transparent'};
  color: ${({ selected, darkMode }) =>
    selected ? '#ffffff' : darkMode ? '#ffffff' : '#0073e6'};
  border: 2px solid ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
  border-radius: 24px;
  padding: 8px 16px;
  cursor: pointer;
  margin: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: ${({ selected }) => 
    selected ? '0 4px 12px rgba(0, 115, 177, 0.2)' : 'none'};

  &:hover {
    background: ${({ darkMode }) => (darkMode ? '#005582' : '#0056b3')};
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 115, 177, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: ${({ selected }) => selected ? 'rotate(90deg)' : 'scale(1.2)'};
  }
`;

const SkillButton = styled(InterestButton)`
  background: ${({ selected, darkMode }) =>
    selected ? (darkMode ? '#ff9505' : '#ffa700') : 'transparent'};
  color: ${({ selected, darkMode }) =>
    selected ? '#ffffff' : darkMode ? '#ffffff' : '#ffa700'};
  border-color: ${({ darkMode }) => (darkMode ? '#ff9505' : '#ffa700')};
  box-shadow: ${({ selected }) => 
    selected ? '0 4px 12px rgba(255, 149, 5, 0.2)' : 'none'};

  &:hover {
    background: ${({ darkMode }) => (darkMode ? '#cc7604' : '#e08d00')};
    box-shadow: 0 4px 12px rgba(255, 149, 5, 0.3);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
  background: ${({ darkMode }) => (darkMode ? '#242444' : '#ffffff')};
  padding: 2rem;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: ${bounceIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  font-size: 24px;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ModalOption = styled.div`
  padding: 12px 20px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;

  &:hover {
    background: ${({ darkMode }) => (darkMode ? '#353560' : '#e8f0fe')};
    transform: translateX(8px);
  }

  &::after {
    content: '+';
    font-size: 20px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const OptionText = styled.span`
  flex-grow: 1;
`;

const CheckIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: ${({ darkMode }) => (darkMode ? '#353560' : '#f0f0f0')};
  border: none;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4d4f;
    color: white;
    transform: rotate(90deg);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120vh;
  background: ${({ darkMode }) => (darkMode ? '#1f1f3d' : '#f0f2f5')};
`;

const ProfileCard = styled.div`
  background: ${({ darkMode }) => (darkMode ? '#242444' : '#ffffff')};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem 3rem;
  width: 100%;
  max-width: 750px;
  position: relative;
`;

const Title = styled.h1`
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 24px;
  font-weight: 600;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProfileImageSection = styled.div`
  margin-right: 2rem;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 4px solid ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:hover {
    background: ${({ darkMode }) => (darkMode ? '#005582' : '#0056b3')};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormSection = styled.div`
  flex-grow: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InputIcon = styled.div`
  background: ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  color: #ffffff;
`;

const Input = styled.input`
  border: 2px solid ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
  border-radius: 24px;
  padding: 10px 16px;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  width: 100%;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  background: ${({ darkMode }) => (darkMode ? '#2d2d4d' : '#f0f2f5')};
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ darkMode }) => (darkMode ? '#005582' : '#0056b3')};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  border: 2px solid ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
  border-radius: 24px;
  padding: 10px 16px;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  width: 100%;
  min-height: 120px;
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  background: ${({ darkMode }) => (darkMode ? '#2d2d4d' : '#f0f2f5')};
  transition: all 0.3s ease;
  resize: none;

  &:focus {
    border-color: ${({ darkMode }) => (darkMode ? '#005582' : '#0056b3')};
    outline: none;
  }
`;

const TagsSection = styled.div`
  margin-top: 2rem;
`;

const TagsTitle = styled.h3`
  color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#2d3436')};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InterestsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SaveButton = styled.button`
  width: 100%;
  background: ${({ darkMode }) => (darkMode ? '#0073b1' : '#0073e6')};
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-weight: 600;
  text-align: center;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ darkMode }) => (darkMode ? '#005582' : '#0056b3')};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProfileCustomizationPage = () => {
  const { darkMode, fontSize } = useTheme();
  const { user } = useContext(AuthContext);
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    username: '',
    bio: '',
    email: '',
    location: '',
    interests: [],
    skills: [],
    profilePicture: '/api/placeholder/150/150'
  });

  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const interestsOptions = [
    'technology', 'music', 'sports', 'travel', 'reading',
    'art', 'cooking', 'gaming', 'photography', 'writing'
  ];
  const skillsOptions = [
    'javascript', 'react', 'python', 'css', 'html',
    'nodejs', 'typescript', 'sql', 'java', 'csharp'
  ];

  useEffect(() => {
    if (user?.email) {
      const allProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
      const userProfile = allProfiles[user.email];
      
      if (userProfile) {
        setFormState(userProfile);
      } else {
        setFormState(prev => ({
          ...prev,
          email: user.email,
          username: user.username || ''
        }));
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagToggle = (type, value) => {
    setFormState(prev => {
      const items = prev[type];
      if (items.includes(value)) {
        return {
          ...prev,
          [type]: items.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...items, value]
        };
      }
    });
  };

  const handleTagRemove = (type, value) => {
    setFormState(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.email) {
      const allProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
      allProfiles[user.email] = {
        ...formState,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('userProfiles', JSON.stringify(allProfiles));
    }
  };

  return (
    <ProfileContainer darkMode={darkMode}>
      <ProfileCard darkMode={darkMode}>
        <Title darkMode={darkMode}>{t('profileCustomization.title')}</Title>
        
        <form onSubmit={handleSubmit}>
          <ProfileHeader>
            <ProfileImageSection>
              <ProfileImage src={formState.profilePicture} alt={t('profile.actions.uploadPhoto')} darkMode={darkMode} />
              <ImageUploadLabel htmlFor="profile-image" darkMode={darkMode}>
                <Camera size={18} />
                <HiddenInput
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </ImageUploadLabel>
            </ProfileImageSection>
  
            <FormSection>
              <InputWrapper>
                <InputIcon darkMode={darkMode}>
                  <User size={18} />
                </InputIcon>
                <Input
                  type="text"
                  name="username"
                  placeholder={t('profileCustomization.form.username')}
                  value={formState.username}
                  onChange={handleInputChange}
                  darkMode={darkMode}
                  fontSize={fontSize}
                />
              </InputWrapper>
  
              <Textarea
                name="bio"
                placeholder={t('profileCustomization.form.bio')}
                value={formState.bio}
                onChange={handleInputChange}
                darkMode={darkMode}
                fontSize={fontSize}
              />
            </FormSection>
          </ProfileHeader>
  
          <InputWrapper>
            <InputIcon darkMode={darkMode}>
              <Mail size={18} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder={t('profileCustomization.form.email')}
              value={formState.email}
              onChange={handleInputChange}
              darkMode={darkMode}
              fontSize={fontSize}
            />
          </InputWrapper>
  
          <InputWrapper style={{ marginTop: '1rem' }}>
            <InputIcon darkMode={darkMode}>
              <MapPin size={18} />
            </InputIcon>
            <Input
              type="text"
              name="location"
              placeholder={t('profileCustomization.form.location')}
              value={formState.location}
              onChange={handleInputChange}
              darkMode={darkMode}
              fontSize={fontSize}
            />
          </InputWrapper>
  
          <TagsSection>
            <TagsTitle darkMode={darkMode}>{t('profileCustomization.form.interests')}</TagsTitle>
            <InterestsContainer>
              {formState.interests.map(interest => (
                <InterestButton
                  key={interest}
                  selected
                  darkMode={darkMode}
                  onClick={() => handleTagRemove('interests', interest)}
                >
                  {t(`interests.options.${interest.toLowerCase()}`)}
                  <X size={14} style={{ marginLeft: '8px' }} />
                </InterestButton>
              ))}
              <InterestButton 
                darkMode={darkMode} 
                onClick={() => setShowInterestsModal(true)}
              >
                {t('profileCustomization.form.addInterests')}
              </InterestButton>
            </InterestsContainer>
          </TagsSection>
  
          <TagsSection>
            <TagsTitle darkMode={darkMode}>{t('profileCustomization.form.skills')}</TagsTitle>
            <SkillsContainer>
              {formState.skills.map(skill => (
                <SkillButton
                  key={skill}
                  selected
                  darkMode={darkMode}
                  onClick={() => handleTagRemove('skills', skill)}
                >
                  {t(`skills.options.${skill.toLowerCase()}`)}
                  <X size={14} style={{ marginLeft: '8px' }} />
                </SkillButton>
              ))}
              <SkillButton 
                darkMode={darkMode} 
                onClick={() => setShowSkillsModal(true)}
              >
                {t('profileCustomization.form.addSkills')}
              </SkillButton>
            </SkillsContainer>
          </TagsSection>
  
          <SaveButton type="submit" darkMode={darkMode} fontSize={fontSize}>
            {t('profileCustomization.form.saveProfile')}
          </SaveButton>
        </form>
  
        {showInterestsModal && (
          <Modal darkMode={darkMode}>
            <ModalContent darkMode={darkMode}>
              <ModalTitle darkMode={darkMode}>{t('profileCustomization.modals.selectInterests')}</ModalTitle>
              {interestsOptions.map(option => (
                <ModalOption
                  key={option}
                  darkMode={darkMode}
                  onClick={() => handleTagToggle('interests', option)}
                >
                  <OptionText>{t(`interests.options.${option}`)}</OptionText>
                  {formState.interests.includes(option) && (
                    <CheckIconWrapper>
                      <Check size={18} style={{ color: darkMode ? '#ffffff' : '#0073e6' }} />
                    </CheckIconWrapper>
                  )}
                </ModalOption>
              ))}
              <CloseButton darkMode={darkMode} onClick={() => setShowInterestsModal(false)}>
                &times;
              </CloseButton>
            </ModalContent>
          </Modal>
        )}
  
        {showSkillsModal && (
          <Modal darkMode={darkMode}>
            <ModalContent darkMode={darkMode}>
              <ModalTitle darkMode={darkMode}>{t('profileCustomization.modals.selectSkills')}</ModalTitle>
              {skillsOptions.map(option => (
                <ModalOption
                  key={option}
                  darkMode={darkMode}
                  onClick={() => handleTagToggle('skills', option)}
                >
                  <OptionText>{t(`skills.options.${option}`)}</OptionText>
                  {formState.skills.includes(option) && (
                    <CheckIconWrapper>
                      <Check size={18} style={{ color: darkMode ? '#ffffff' : '#ff9505' }} />
                    </CheckIconWrapper>
                  )}
                </ModalOption>
              ))}
              <CloseButton darkMode={darkMode} onClick={() => setShowSkillsModal(false)}>
                &times;
              </CloseButton>
            </ModalContent>
          </Modal>
        )}
      </ProfileCard>
    </ProfileContainer>
  );  
};

export default ProfileCustomizationPage;