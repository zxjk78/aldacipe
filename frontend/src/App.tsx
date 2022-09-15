import React from 'react';

import './App.css';
import './global.scss';

// custom component
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <div className="App">
      <Navbar />
      <SignupPage />
      <LoginPage />
    </div>
  );
}

export default App;
