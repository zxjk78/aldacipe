import React from 'react';

import './App.css';
import './global.scss';

// custom component
import Navbar from './components/common/Navbar';
import SignUp from './components/signup/SignUp';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <div className="App">
      <Navbar />
      <SignUp />
      <LoginPage />
    </div>
  );
}

export default App;
