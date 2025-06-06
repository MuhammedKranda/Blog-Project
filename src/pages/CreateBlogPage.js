import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImage, FaTimes, FaUpload, FaSpinner } from 'react-icons/fa';

const categories = [
  { name: 'Frontend', value: 'Frontend' },
  { name: 'Backend', value: 'Backend' },
  { name: 'Mobile', value: 'Mobile' },
  { name: 'CSS', value: 'CSS' },
  { name: 'JavaScript', value: 'JavaScript' },
  { name: 'React', value: 'React' },
  { name: 'Vue', value: 'Vue' },
  { name: 'Angular', value: 'Angular' },
  { name: 'Node.js', value: 'Node.js' },
  { name: 'Python', value: 'Python' },
  { name: 'DevOps', value: 'DevOps' },
  { name: 'Diğer', value: 'Other' },
];

const CreateBlogPage = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    image: null,
    imagePreview: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate word count for content
    if (name === 'content') {
      setWordCount(value.trim() ? value.trim().split(/\s+/).length : 0);
    }

    // Clear the error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          image: 'Dosya boyutu 5MB\'dan küçük olmalıdır',
        });
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          image: 'Yalnızca JPEG, PNG, GIF ve WEBP formatları desteklenmektedir',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.image) {
        setErrors({
          ...errors,
          image: '',
        });
      }
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: null,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık gereklidir';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Başlık 100 karakterden uzun olamaz';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'İçerik gereklidir';
    } else if (formData.content.length < 100) {
      newErrors.content = 'İçerik en az 100 karakter olmalıdır';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Özet gereklidir';
    } else if (formData.excerpt.length > 200) {
      newErrors.excerpt = 'Özet 200 karakterden uzun olamaz';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori seçilmelidir';
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'En az bir etiket girilmelidir';
    }

    if (!formData.image) {
      newErrors.image = 'Blog için bir görsel yüklemelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Blog created:', {
          ...formData,
          author: user.name,
          authorId: user.id,
          createdAt: new Date().toISOString(),
        });
        setIsSubmitting(false);
        navigate('/blog');
        // You would typically submit this to your backend
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı Oluştur</h1>
            <p className="mt-2 text-gray-600">
              Düşüncelerinizi ve bilgilerinizi toplulukla paylaşın.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Başlık <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className={`block w-full px-4 py-3 border ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="Blog yazınız için çekici bir başlık girin"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength="100"
                />
                <div className="mt-1 flex justify-between items-center">
                  {errors.title ? (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      SEO için 50-60 karakter arası başlıklar idealdir
                    </p>
                  )}
                  <p className="text-xs text-gray-500">{formData.title.length}/100</p>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kapak Görseli <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md 
                 border-gray-300 hover:border-primary-500 transition-colors">
                {formData.imagePreview ? (
                  <div className="space-y-1 text-center relative">
                    <div className="relative">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="mx-auto h-64 w-full object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-800 bg-opacity-75 flex items-center justify-center text-white"
                        onClick={removeImage}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.image.name} ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                      >
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                          <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-base font-medium text-gray-900">Görsel Yükle</p>
                          <p className="mt-1 text-sm text-gray-500">
                            Görseli sürükle ve bırak veya tıklayarak yükle
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            PNG, JPG, GIF, WEBP (max: 5MB)
                          </p>
                          <div className="mt-4">
                            <span className="inline-flex rounded-md shadow-sm">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                onClick={() => document.getElementById('image').click()}
                              >
                                <FaUpload className="-ml-1 mr-2 h-5 w-5" />
                                Dosya Seç
                              </button>
                            </span>
                          </div>
                        </div>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                Özet <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows={3}
                  className={`block w-full px-4 py-3 border ${
                    errors.excerpt ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="Blog yazınızın kısa bir özetini yazın"
                  value={formData.excerpt}
                  onChange={handleChange}
                  maxLength="200"
                />
                <div className="mt-1 flex justify-between items-center">
                  {errors.excerpt ? (
                    <p className="text-sm text-red-600">{errors.excerpt}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Bu özet, blog listeleme sayfalarında ve arama sonuçlarında görünecektir
                    </p>
                  )}
                  <p className="text-xs text-gray-500">{formData.excerpt.length}/200</p>
                </div>
              </div>
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    className={`block w-full px-4 py-3 border ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Etiketler <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    className={`block w-full px-4 py-3 border ${
                      errors.tags ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                    placeholder="Etiketleri virgülle ayırın (React, JavaScript, Web)"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                  {errors.tags ? (
                    <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-500">
                      İlgili etiketler eklemek, yazınızın daha fazla kişiye ulaşmasını sağlar
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                İçerik <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={12}
                  className={`block w-full px-4 py-3 border ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="Blog yazınızın detaylı içeriğini buraya yazın..."
                  value={formData.content}
                  onChange={handleChange}
                />
                <div className="mt-1 flex justify-between items-center">
                  {errors.content ? (
                    <p className="text-sm text-red-600">{errors.content}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      SEO için en az 300 kelimelik içerik önerilir
                    </p>
                  )}
                  <p className="text-xs text-gray-500">{wordCount} kelime</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Yayınlanıyor...
                  </>
                ) : (
                  'Blog Yazısını Yayınla'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlogPage; 