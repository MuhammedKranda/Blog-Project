import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCamera, FaUser, FaEnvelope, FaIdCard, FaSave } from 'react-icons/fa';

const ProfileEditPage = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profileImage: null,
    imagePreview: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      // Eğer user.name varsa, boşluğa göre bölerek ad ve soyadı ayır
      let firstName = '';
      let lastName = '';
      
      if (user.name) {
        const nameParts = user.name.split(' ');
        if (nameParts.length > 1) {
          firstName = nameParts[0];
          lastName = nameParts.slice(1).join(' ');
        } else {
          firstName = user.name;
        }
      }
      
      // Eğer user.firstName ve user.lastName varsa, onları kullan
      setFormData({
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
        profileImage: null,
        imagePreview: user.profileImage || null
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Dosya boyutu 2MB\'dan küçük olmalıdır');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Yalnızca JPEG, PNG, GIF ve WEBP formatları desteklenmektedir');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          profileImage: file,
          imagePreview: reader.result,
        });
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Gerçek uygulamada burada bir API isteği yapılacak
    setTimeout(() => {
      try {
        // Burada profileImage'ı base64 olarak kaydedebilir veya bir URL'ye yükleyebilirsiniz
        // Gerçek uygulamada, formData.profileImage dosyasını bir bulut depolama hizmetine 
        // yüklemek ve dönen URL'yi updateUser fonksiyonuna göndermek gerekir
        
        // Ad ve soyadı birleştir
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        
        // Kullanıcı bilgilerini güncelle
        updateUser({
          ...user,
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: fullName,
          profileImage: formData.imagePreview // Gerçek uygulamada bu bir URL olacak
        });
        
        setSuccess(true);
        setIsLoading(false);
        
        // Başarı mesajını 2 saniye göster, sonra kullanıcıyı yönlendir
        setTimeout(() => {
          navigate('/my-blogs');
        }, 2000);
      } catch (err) {
        setError('Profil güncellenirken bir hata oluştu.');
        setIsLoading(false);
      }
    }, 1500);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Giriş yapmanız gerekiyor</h2>
        <p className="mt-2 text-gray-600">Bu sayfayı görüntülemek için giriş yapmalısınız.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profil Düzenle</h1>
            <p className="mt-2 text-gray-600">
              Profil bilgilerinizi güncelleyin
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 rounded-md text-green-700 border border-green-200">
              Profil başarıyla güncellendi! Yönlendiriliyorsunuz...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Profile Image */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center">
                  {formData.imagePreview ? (
                    <img 
                      src={formData.imagePreview} 
                      alt={`${formData.firstName} ${formData.lastName}`.trim() || 'Profil'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl text-primary-700">
                      {(formData.firstName || 'U').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <label 
                  htmlFor="profileImage" 
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors"
                  title="Profil resmi yükle"
                >
                  <FaCamera className="h-4 w-4" />
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                JPG, PNG veya GIF • Maksimum 2MB
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-500" /> 
                    Ad
                  </div>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Adınız"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-500" /> 
                    Soyad
                  </div>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Soyadınız"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <FaIdCard className="mr-2 text-gray-500" /> 
                    Kullanıcı Adı
                  </div>
                </label>
                <input
                  type="text"
                  id="username"
                  value={user.username || 'kullanici_adi'} // Gerçek uygulamada user.username olacak
                  className="block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">Kullanıcı adı değiştirilemez</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-500" /> 
                    E-posta Adresi
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email || 'ornek@email.com'}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">E-posta adresi değiştirilemez</p>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/my-blogs')}
                  className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Kaydediliyor...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaSave className="mr-2" /> Değişiklikleri Kaydet
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileEditPage; 