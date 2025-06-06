import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogPage from './pages/BlogPage';
import CreateBlogPage from './pages/CreateBlogPage';
import MyBlogsPage from './pages/MyBlogsPage';
import ProfileEditPage from './pages/ProfileEditPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
            <Route path="/blog" element={<BlogPage isLoggedIn={isLoggedIn} />} />
            <Route 
              path="/create-blog" 
              element={
                isLoggedIn ? (
                  <CreateBlogPage user={user} />
                ) : (
                  <LoginPage onLogin={handleLogin} message="Lütfen blog oluşturmak için giriş yapın" />
                )
              } 
            />
            <Route 
              path="/my-blogs" 
              element={
                isLoggedIn ? (
                  <MyBlogsPage user={user} />
                ) : (
                  <LoginPage onLogin={handleLogin} message="Lütfen bloglarınızı görüntülemek için giriş yapın" />
                )
              } 
            />
            <Route 
              path="/profile-edit" 
              element={
                isLoggedIn ? (
                  <ProfileEditPage user={user} updateUser={updateUser} />
                ) : (
                  <LoginPage onLogin={handleLogin} message="Lütfen profil düzenlemek için giriş yapın" />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
