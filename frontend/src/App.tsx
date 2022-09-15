import React from 'react';

import './App.css';
import './global.scss';

// custom component
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <SignupPage />
      <LoginPage /> */}
      <RecipeDetailPage />
    </div>
  );
}

export default App;
