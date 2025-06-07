import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaThumbsUp, FaComment, FaEye } from 'react-icons/fa';

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    title: 'React Hooks Kullanım Rehberi',
    excerpt: 'React Hooks ile fonksiyonel bileşenlerinizi nasıl daha güçlü hale getirebilirsiniz? Bu yazıda tüm detayları inceliyoruz.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Ahmet Yılmaz',
    date: '10 Nisan 2023',
    readTime: '6 dk okuma',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Frontend',
    likes: 24,
    comments: 8,
    views: 342
  },
  {
    id: 2,
    title: 'CSS Grid ile Modern Web Tasarımı',
    excerpt: 'CSS Grid sistemini kullanarak modern ve responsive web tasarımları nasıl oluşturulur? Adım adım örneklerle anlatıyoruz.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Ayşe Demir',
    date: '23 Mart 2023',
    readTime: '5 dk okuma',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'CSS',
    likes: 18,
    comments: 5,
    views: 253
  },
  {
    id: 3,
    title: 'JavaScript Promise Yapısı',
    excerpt: 'JavaScript\'te asenkron işlemleri yönetmek için Promise yapısını nasıl etkili kullanabilirsiniz? Tüm ipuçları bu yazıda.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Mehmet Kaya',
    date: '5 Şubat 2023',
    readTime: '7 dk okuma',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'JavaScript',
    likes: 32,
    comments: 11,
    views: 427
  },
  {
    id: 4,
    title: 'Node.js ile RESTful API Geliştirme',
    excerpt: 'Node.js ve Express kullanarak sağlam bir RESTful API nasıl oluşturulur? Güvenlik, performans ve en iyi uygulamalar.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Zeynep Şahin',
    date: '17 Ocak 2023',
    readTime: '8 dk okuma',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Backend',
    likes: 45,
    comments: 23,
    views: 612
  },
  {
    id: 5,
    title: 'React Native ile Mobil Uygulama Geliştirme',
    excerpt: 'React Native kullanarak iOS ve Android için tek bir kod tabanıyla nasıl mobil uygulama geliştirilir?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Emre Yıldız',
    date: '29 Aralık 2022',
    readTime: '9 dk okuma',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Mobile',
    likes: 37,
    comments: 14,
    views: 489
  },
  {
    id: 6,
    title: 'GraphQL ile Modern API Tasarımı',
    excerpt: 'GraphQL nedir ve REST API\'lere kıyasla hangi avantajları sunar? Gerçek dünya uygulamaları ve performans ipuçları.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Can Özkan',
    date: '12 Kasım 2022',
    readTime: '7 dk okuma',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Backend',
    likes: 29,
    comments: 9,
    views: 376
  }
];

const categories = [
  { name: 'Tümü', value: 'all' },
  { name: 'Frontend', value: 'Frontend' },
  { name: 'Backend', value: 'Backend' },
  { name: 'Mobile', value: 'Mobile' },
  { name: 'CSS', value: 'CSS' },
  { name: 'JavaScript', value: 'JavaScript' }
];

const sortOptions = [
  { name: 'En Yeni', value: 'newest' },
  { name: 'En Eski', value: 'oldest' },
  { name: 'En Çok Beğenilen', value: 'most_liked' },
  { name: 'En Çok Görüntülenen', value: 'most_viewed' },
  { name: 'En Çok Yorum Alan', value: 'most_commented' }
];

const BlogCard = ({ blog }) => {
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
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
          <a href="#">{blog.title}</a>
        </h3>
        <p className="mt-3 text-base text-gray-500">{blog.excerpt}</p>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{blog.author}</span>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {blog.author.charAt(0)}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{blog.author}</p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime="2020-03-16">{blog.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
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
          <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Devamını Oku
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const BlogPage = ({ isLoggedIn }) => {
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(sampleBlogs);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    let result = [...blogs];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        blog =>
          blog.title.toLowerCase().includes(lowerSearchTerm) ||
          blog.excerpt.toLowerCase().includes(lowerSearchTerm) ||
          blog.author.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Sort blogs
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'most_liked':
          return b.likes - a.likes;
        case 'most_viewed':
          return b.views - a.views;
        case 'most_commented':
          return b.comments - a.comments;
        default:
          return 0;
      }
    });

    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [blogs, selectedCategory, sortBy, searchTerm]);

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Blog Yazıları
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            En güncel teknoloji, web geliştirme ve programlama içeriklerini keşfedin.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Blog yazısı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <button
                    type="submit"
                    className="inline-flex items-center px-2 border border-transparent text-sm font-medium rounded text-primary-700 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Ara
                  </button>
                </div>
              </div>
            </form>

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 md:hidden"
              onClick={toggleFilters}
            >
              <FaFilter className="h-4 w-4 mr-2" />
              Filtreler
              {showFilters ? (
                <FaChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <FaChevronDown className="h-4 w-4 ml-2" />
              )}
            </button>

            <div className={`md:flex space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto ${showFilters || 'hidden md:flex'}`}>
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        {currentBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    &laquo; Önceki
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    Sonraki &raquo;
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-xl font-medium text-gray-900">Hiç blog yazısı bulunamadı</h3>
            <p className="mt-1 text-gray-500">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
          </div>
        )}

        {/* CTA Section */}
        {isLoggedIn ? (
          <div className="mt-16 flex justify-center">
            <Link
              to="/create-blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Yeni Blog Yazısı Oluştur
            </Link>
          </div>
        ) : (
          <div className="mt-16 bg-primary-50 border border-primary-200 rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-lg font-medium text-primary-900">Blog yazısı oluşturmak ister misiniz?</h3>
            <p className="mt-2 text-primary-700">
              Kendi blog yazılarınızı paylaşmak için hemen giriş yapın veya kayıt olun.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-primary-300 text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage; 