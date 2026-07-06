import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
  language: 'ar',
  toggleLanguage: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'ar';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      localStorage.setItem('appLanguage', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
