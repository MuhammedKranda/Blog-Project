import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary-600">
              BlogPlatform
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Düşüncelerinizi paylaşabileceğiniz, başkalarının fikirlerini keşfedebileceğiniz modern bir blog platformu.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Bağlantılar</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-600 hover:text-gray-900">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-600 hover:text-gray-900">
                  Bloglar
                </Link>
              </li>
              <li>
                <Link to="/create-blog" className="text-base text-gray-600 hover:text-gray-900">
                  Blog Oluştur
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Yasal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  KVKK
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">İletişim</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:info@blogplatform.com" className="text-base text-gray-600 hover:text-gray-900">
                  info@blogplatform.com
                </a>
              </li>
              <li>
                <a href="tel:+905555555555" className="text-base text-gray-600 hover:text-gray-900">
                  +90 555 555 55 55
                </a>
              </li>
              <li>
                <p className="text-base text-gray-600">
                  İstanbul, Türkiye
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between flex-col md:flex-row">
            <p className="text-base text-gray-500">
              &copy; {currentYear} BlogPlatform. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            <span className="flex items-center justify-center">
              Sevgiyle yapıldı <FaHeart className="h-4 w-4 mx-1 text-red-500" /> Türkiye
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 