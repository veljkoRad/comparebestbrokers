import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import App from './App';

const theme = createTheme({
  spacing:4,
    palette: {
    primary: {
      main: "#133d54",
      light: "#012423",
      dark: '#0D1B1B80'
    },
    secondary: {
      main: "#fff",
      dark: '#02706d'
    },
    info: {
      main: '#fff'
    },
    error: {
      main: '#c62828'
    },
    success: {
      main: '#1b5e20'
    },    
    background: { default: '#fff' },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: '64px',
      fontWeight: 700,
      '@media (min-width:0)': { fontSize: '38px' },
      '@media (min-width:600px)': { fontSize: '48px' },
      '@media (min-width:900px)': { fontSize: '64px' },

    },
    h2: {
      fontSize: '40px',
      fontWeight: 600,
      '@media (max-width:991px)': { fontSize: '32px' },
      '@media (max-width:767px)': { fontSize: '28px' }
    },
    h3: {
      fontSize: '32px',
      fontWeight: 700,
      '@media (max-width:991px)': { fontSize: '24px' },
    },
    h4: {
      fontSize: '28px',
      fontWeight: 700
    },
    button: {
      fontSize: '16px',
      fontWeight:600,
      textTransform:'capitalize'
    },
    body1: {
      fontSize: '17px'
    },
    body2: {
      fontSize: '17px',
      fontWeight: 600,
      '@media (max-width:991px)': { fontSize: '13px' }
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 600,
      '@media (max-width:991px)': { fontSize: '12px' }
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 400
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 991,
      lg: 1200,
      xl: 1440,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </ThemeProvider>
</React.StrictMode>
);
