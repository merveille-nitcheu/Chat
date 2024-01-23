import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './Components/Chat'
import Login from './Components/Login'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#FF5252',
    },
    secondary: {
      main: '#FF5252',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={Theme}>

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>

    </ThemeProvider>

  );
}

export default App;
