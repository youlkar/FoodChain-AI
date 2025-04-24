import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select 
      onChange={changeLanguage} 
      value={i18n.language}
      className="language-selector"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSwitcher;