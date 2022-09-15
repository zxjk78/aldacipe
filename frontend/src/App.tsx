import React from 'react';

import './App.css';
import './global.scss';

// custom component
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
function App() {
  return (
    <div className="App">
      <Navbar />
      <MainPage />
      <SignupPage />
      <LoginPage />
    </div>
  );
}

export default App;
