import React, { useEffect, useState } from 'react';

import './App.css';
import './global.scss';
// route
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
// custom component
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const tmp = localStorage.getItem('user');
    tmp && JSON.parse(tmp) ? setIsLoggedIn(true) : setIsLoggedIn(false);
    // setIsLoggedIn(true);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/detail/:recipeId" element={<RecipeDetailPage />} />
              <Route path="/main" element={<RecipeDetailPage />} />
            </>
          )}
          {/* 현재 로직으로는 404 페이지 대신에 로그인 또는 메인으로 리다이렉트됨 */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? '/main' : 'login'} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
