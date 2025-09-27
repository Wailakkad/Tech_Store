"use client";
import { useState, useEffect } from 'react';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[320px] max-w-md`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-white/80 hover:text-white transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    hideToast(); // Clear any existing toast

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.', 'success');
        setFormData({ nom: '', prenom: '', telephone: '', message: '' }); // Reset form
      } else {
        showToast(result.message || 'Une erreur est survenue lors de l\'envoi de votre message.', 'error');
        console.error('Form submission error:', result);
      }
    } catch (error) {
      showToast('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.', 'error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-5xl font-light text-black mb-6 tracking-tight">
                  Get in Touch
                </h1>
                <div className="w-12 h-0.5 bg-black mb-8"></div>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  We believe in the power of connection. Whether you&apos;re looking to collaborate, 
                  need support, or simply want to share your thoughts, we&apos;re here to listen 
                  and help you achieve your goals.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-800 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black">Email</p>
                    <p className="text-gray-600 font-light">contact@company.com</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-800 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black">Phone</p>
                    <p className="text-gray-600 font-light">+212 </p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-800 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black">Location</p>
                    <p className="text-gray-600 font-light">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom Field */}
                    <div className="group">
                      <label htmlFor="nom" className="block text-sm font-medium text-black mb-3 uppercase tracking-wide">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom de famille"
                        className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-black focus:ring-0 placeholder-gray-400 transition-colors duration-300 text-black font-light"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Prénom Field */}
                    <div className="group">
                      <label htmlFor="prenom" className="block text-sm font-medium text-black mb-3 uppercase tracking-wide">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-black focus:ring-0 placeholder-gray-400 transition-colors duration-300 text-black font-light"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Téléphone Field */}
                  <div className="group">
                    <label htmlFor="telephone" className="block text-sm font-medium text-black mb-3 uppercase tracking-wide">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="Votre numéro de téléphone"
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-black focus:ring-0 placeholder-gray-400 transition-colors duration-300 text-black font-light"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-black mb-3 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Partagez vos idées, questions ou projets..."
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-black focus:ring-0 placeholder-gray-400 transition-colors duration-300 resize-none text-black font-light"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-black text-white py-4 px-8 font-medium uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-gray-400 disabled:transform-none disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Envoi en cours...
                          </div>
                        ) : (
                          'Envoyer le message'
                        )}
                      </span>
                      {!isSubmitting && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for toast animation */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}