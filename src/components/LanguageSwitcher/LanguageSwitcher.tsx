import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANG_KEY } from '../../shared/constants';


const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem(LANG_KEY, next);
  };

  return (
    <Button color='inherit' onClick={toggle}>
      {i18n.language === 'en' ? 'ua' : 'en'}
    </Button>
  );
};

export default LanguageSwitcher;
