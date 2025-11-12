import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard Skills',
      skills: 'Skills',
      overview: 'Overview',
      loading: 'Loading...',
      lastUpdate: 'Last update: {{date}}',
      importExport: 'Import / Export',
      downloadCsv: 'Download CSV',
      exportCsv: 'Export CSV',
      level: 'Level: {{level}}%',
      updated: 'Updated: {{date}}',
    },
  },
  ua: {
    translation: {
      dashboard: 'Панель навиків',
      skills: 'Навички',
      overview: 'Огляд',
      loading: 'Завантаження...',
      lastUpdate: 'Останнє оновлення: {{date}}',
      importExport: 'Імпорт / Експорт',
      downloadCsv: 'Завантажити CSV',
      exportCsv: 'Експортувати CSV',
      level: 'Рівень: {{level}}%',
      updated: 'Оновлено: {{date}}',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
