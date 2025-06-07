import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaThumbsUp, FaComment } from 'react-icons/fa';

// Örnek veri - gerçek uygulamada bu veriler API'den gelecektir
const userBlogs = [
  {
    id: 1,
    title: 'React Hooks ile Fonksiyonel Bileşenler',
    excerpt: 'React Hooks kullanarak fonksiyonel bileşenlerin nasıl güçlendirilebileceğini detaylı bir şekilde inceliyoruz.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Demo Kullanıcı',
    date: '15 Nisan 2023',
    readTime: '6 dk okuma',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'React',
    likes: 24,
    comments: 8,
    views: 342,
    status: 'published' // published, draft
  },
  {
    id: 2,
    title: 'Tailwind CSS ile Hızlı UI Geliştirme',
    excerpt: 'Tailwind CSS kullanarak nasıl hızlı ve bakımı kolay kullanıcı arayüzleri geliştirebilirsiniz?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Demo Kullanıcı',
    date: '22 Mart 2023',
    readTime: '5 dk okuma',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'CSS',
    likes: 18,
    comments: 5,
    views: 253,
    status: 'published'
  },
  {
    id: 3,
    title: 'Modern JavaScript Özellikleri',
    excerpt: 'ES6 ve sonrasında gelen modern JavaScript özelliklerini ve bunların kodunuzu nasıl iyileştirebileceğini keşfedin.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Demo Kullanıcı',
    date: '20 Şubat 2023',
    readTime: '7 dk okuma',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'JavaScript',
    likes: 32,
    comments: 12,
    views: 421,
    status: 'published' // published, draft
  }
];

const BlogCard = ({ blog, onDelete, onEdit }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-lg shadow-lg bg-white h-full flex flex-col"
    >
      <div className="relative pb-60 sm:pb-48">
        <img
          className="absolute h-full w-full object-cover"
          src={blog.image}
          alt={blog.title}
          loading="lazy"
        />
        {blog.status === 'draft' && (
          <div className="absolute top-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white text-xs font-medium text-center p-1">
            Taslak
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
          <a href="#">{blog.title}</a>
        </h3>
        <p className="mt-3 text-base text-gray-500">{blog.excerpt}</p>
        <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-gray-500">
            <span className="flex items-center text-sm">
              <FaThumbsUp className="h-4 w-4 mr-1" />
              {blog.likes}
            </span>
            <span className="flex items-center text-sm">
              <FaComment className="h-4 w-4 mr-1" />
              {blog.comments}
            </span>
            <span className="flex items-center text-sm">
              <FaEye className="h-4 w-4 mr-1" />
              {blog.views}
            </span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(blog.id)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              <FaEdit className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onDelete(blog.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <FaTrash className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MyBlogsPage = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, drafts

  useEffect(() => {
    // API'den kullanıcının bloglarını al (şimdilik örnek veri kullanıyoruz)
    setIsLoading(true);
    setTimeout(() => {
      setBlogs(userBlogs);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true;
    if (filter === 'published') return blog.status === 'published';
    if (filter === 'drafts') return blog.status === 'draft';
    return true;
  });

  const handleEdit = (blogId) => {
    // Blog düzenleme sayfasına yönlendir
    console.log(`Blog düzenle: ${blogId}`);
    // Gerçek uygulamada: navigate(`/edit-blog/${blogId}`);
  };

  const handleDelete = (blogId) => {
    // Onay al ve blogu sil
    if (window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      console.log(`Blog sil: ${blogId}`);
      // Gerçek uygulamada: API'ye silme isteği gönder ve başarılı olursa state'i güncelle
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Bloglarım
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Oluşturduğunuz ve paylaştığınız blog yazılarını yönetin
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-md ${
                  filter === 'all' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setFilter('all')}
              >
                Tümü ({blogs.length})
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  filter === 'published' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setFilter('published')}
              >
                Yayında ({blogs.filter(blog => blog.status === 'published').length})
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  filter === 'drafts' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setFilter('drafts')}
              >
                Taslaklar ({blogs.filter(blog => blog.status === 'draft').length})
              </button>
            </div>
            <Link to="/create-blog" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center" >
              <span className="mr-2">Blog Oluştur</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Blog List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="mt-2 text-xl font-medium text-gray-900">Henüz blog yazınız yok</h3>
            {filter !== 'all' ? (
              <p className="mt-1 text-gray-500">Bu filtreye uygun blog yazısı bulunamadı. Farklı bir filtre seçin.</p>
            ) : (
              <p className="mt-1 text-gray-500">Henüz hiç blog yazınız bulunmuyor.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogsPage; 