import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: ${({ theme }) => theme?.fontSizePixels || '16'}px;
  }
  
  body {
    background: ${({ theme }) => (theme?.darkMode ? '#333' : '#f0f2f5')};
    color: ${({ theme }) => (theme?.darkMode ? '#fff' : '#333')};
    font-family: 'Arial', sans-serif;
    font-size: ${({ theme }) => theme?.fontSizes?.medium || '16px'};
    margin: 0;
    padding: 0;
    transition: background 0.3s, color 0.3s, font-size 0.3s;
  }

  h1 {
    font-size: ${({ theme }) => theme?.fontSizes?.large || '20px'};
  }

  small {
    font-size: ${({ theme }) => theme?.fontSizes?.small || '12px'};
  }
`;