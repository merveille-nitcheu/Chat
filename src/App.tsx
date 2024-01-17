import React from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Chat from './Components/Chat'
import Login from './Components/Login'

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/chat' element={<Chat/>} />
    </Routes>
  </Router>
  );
}

export default App;
