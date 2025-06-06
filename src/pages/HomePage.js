import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSearch, FaLightbulb, FaUsers } from 'react-icons/fa';

// Sample featured blog data
const featuredBlogs = [
  {
    id: 1,
    title: 'React Hooks Kullanım Rehberi',
    excerpt: 'React Hooks ile fonksiyonel bileşenlerinizi nasıl daha güçlü hale getirebilirsiniz? Bu yazıda tüm detayları inceliyoruz.',
    author: 'Ahmet Yılmaz',
    date: '10 Nisan 2023',
    readTime: '6 dk okuma',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Frontend'
  },
  {
    id: 2,
    title: 'CSS Grid ile Modern Web Tasarımı',
    excerpt: 'CSS Grid sistemini kullanarak modern ve responsive web tasarımları nasıl oluşturulur? Adım adım örneklerle anlatıyoruz.',
    author: 'Ayşe Demir',
    date: '23 Mart 2023',
    readTime: '5 dk okuma',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'CSS'
  },
  {
    id: 3,
    title: 'JavaScript Promise Yapısı',
    excerpt: 'JavaScript\'te asenkron işlemleri yönetmek için Promise yapısını nasıl etkili kullanabilirsiniz? Tüm ipuçları bu yazıda.',
    author: 'Mehmet Kaya',
    date: '5 Şubat 2023',
    readTime: '7 dk okuma',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'JavaScript'
  }
];

// Feature section items
const features = [
  {
    id: 1,
    title: 'Kolay İçerik Oluşturma',
    description: 'Kullanıcı dostu editör ile zengin içerikli blog yazılarınızı kolayca oluşturun.',
    icon: <FaLightbulb className="h-6 w-6 text-primary-500" />
  },
  {
    id: 2,
    title: 'SEO Dostu',
    description: 'SEO için optimize edilmiş yapı ile yazılarınızın arama motorlarında daha iyi sıralamalara sahip olmasını sağlayın.',
    icon: <FaSearch className="h-6 w-6 text-primary-500" />
  },
  {
    id: 3,
    title: 'Topluluk Desteği',
    description: 'Geniş bir blog yazarı topluluğuna katılın ve deneyimlerinizi paylaşın.',
    icon: <FaUsers className="h-6 w-6 text-primary-500" />
  }
];

const HomePage = ({ isLoggedIn }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block xl:inline">Düşüncelerinizi </span>
                  <span className="block text-primary-600 xl:inline">paylaşmanın zamanı</span>
                </motion.h1>
                <motion.p 
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Modern ve SEO dostu blog platformumuz ile fikirlerinizi dünya ile paylaşın. 
                  Kullanıcı dostu arayüz, zengin metin editörü ve güçlü analitik araçları ile 
                  blog yazarlığı deneyiminizi bir üst seviyeye taşıyın.
                </motion.p>
                <motion.div 
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="rounded-md shadow">
                    <Link
                      to={isLoggedIn ? "/my-blogs" : "/register"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 md:py-4 md:text-lg md:px-10"
                    >
                      {isLoggedIn ? "Bloglarıma Git" : "Hemen Başla"}
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/blog"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      Blogları Keşfet
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Bir kişi bilgisayarda yazı yazıyor"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Özellikler</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Blog yazmanın daha iyi bir yolu
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              BlogPlatform ile içerik oluşturma sürecinizi kolaylaştırın ve daha geniş kitlelere ulaşın.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <motion.div 
                  key={feature.id} 
                  className="relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-50 text-primary-500">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Öne Çıkan Bloglar
            </h2>
            <Link to="/blog" className="flex items-center text-primary-600 hover:text-primary-700">
              Tümünü Gör <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="mt-6 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {featuredBlogs.map((blog) => (
              <motion.div 
                key={blog.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 w-full relative">
                  <img
                    className="h-full w-full object-cover"
                    src={blog.image}
                    alt={blog.title}
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                    <p className="mt-3 text-base text-gray-500">{blog.excerpt}</p>
                  </a>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Show only if user is not logged in */}
      {!isLoggedIn && (
        <section className="bg-primary-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Yazmaya hazır mısınız?</span>
              <span className="block text-primary-300">Hemen ücretsiz hesap oluşturun.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                >
                  Kayıt Ol
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage; 