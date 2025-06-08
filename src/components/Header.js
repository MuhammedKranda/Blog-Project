import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX, HiUser } from 'react-icons/hi';

const Header = ({ isLoggedIn, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  console.log('Header rendered - isLoggedIn:', isLoggedIn, 'user:', user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile-edit');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-primary-600"
              >
                BlogPlatform
              </motion.div>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-50">
                Ana Sayfa
              </Link>
              <Link to="/blog" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-50">
                Bloglar
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/create-blog" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-50">
                    Blog Oluştur
                  </Link>
                  <Link to="/my-blogs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-50">
                    Bloglarım
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div 
                    onClick={handleProfileClick}
                    className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center cursor-pointer hover:bg-primary-200 transition-colors"
                    title="Profili Düzenle"
                  >
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user?.name || 'Kullanıcı'} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary-700 font-medium">
                        {(user?.name || 'K').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || 'Kullanıcı'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                 className="px-4 py-2 rounded-md text-sm font-medium text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü Aç</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Bloglar
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/create-blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Blog Oluştur
                </Link>
                <Link
                  to="/my-blogs"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Bloglarım
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="flex items-center px-5">
                <div 
                  onClick={() => {
                    handleProfileClick();
                    toggleMenu();
                  }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center cursor-pointer"
                >
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user?.name || 'Kullanıcı'} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary-700 font-medium text-lg">
                      {(user?.name || 'K').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.name || 'Kullanıcı'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="ml-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-5">
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-md text-center text-sm font-medium text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={toggleMenu}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 rounded-md text-center text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={toggleMenu}
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 