import React from 'react';

import './App.css';
import './global.scss';

// custom component
import Navbar from './components/common/Navbar';
import SignUp from './components/signup/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignUp />
    </div>
  );
}

export default App;
