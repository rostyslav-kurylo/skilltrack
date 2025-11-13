import '@testing-library/jest-dom';
import i18n from 'i18next';
import fetchMock from 'jest-fetch-mock';
import { initReactI18next } from 'react-i18next';

fetchMock.enableMocks();

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: { en: { translation: {} } },
  interpolation: { escapeValue: false },
});
