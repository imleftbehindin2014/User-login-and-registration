import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => (theme.darkMode ? '#121212' : '#f9f9f9')};
  color: ${({ theme }) => (theme.darkMode ? '#ffffff' : '#2c3e50')};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 2.5rem;
  text-align: center;
  color: ${({ theme }) => (theme.darkMode ? '#e0e0e0' : '#2c3e50')};
`;

const Text = styled.p`
  font-size: 1.125rem;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
  color: ${({ theme }) => (theme.darkMode ? '#b0b0b0' : '#7f8c8d')};
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  ${({ theme }) => theme.darkMode
    ? css`
        background-color: #3498db;
        color: #fff;

        &:hover {
          background-color: #2980b9;
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      `
    : css`
        background-color: #2575fc;
        color: #fff;

        &:hover {
          background-color: #1e5bb8;
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      `}
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <Container>
      <Header>{t('home.welcome')}</Header>
      <Text>
        {t('home.description')}
      </Text>
      <Button onClick={navigateToProfile}>
        {t('navigation.profile')}
      </Button>
    </Container>
  );
};

export default HomePage;