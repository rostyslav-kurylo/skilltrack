import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard Skills',
      skills: 'Skills',
      loading: 'Loading...',
      lastUpdate: 'Last update: {{date}}',
      importExport: 'Import / Export',
      downloadCsv: 'Download CSV',
      exportCsv: 'Export CSV',
      level: 'Level',
      skill: 'Skill',
      notes: 'Notes',
      add: 'Add',
      levelValue: 'Level: {{level}}%',
      updated: 'Updated: {{date}}',
      filter: 'Filter',
      filterPlaceholder: 'e.g. React|JS',
    },
  },
  ua: {
    translation: {
      dashboard: 'Панель Навиків',
      skills: 'Навички',
      loading: 'Завантаження...',
      lastUpdate: 'Останнє оновлення: {{date}}',
      importExport: 'Імпорт / Експорт',
      downloadCsv: 'Завантажити CSV',
      exportCsv: 'Експортувати CSV',
      level: 'Рівень',
      skill: 'Навик',
      notes: 'Нотатки',
      add: 'Додати',
      levelValue: 'Рівень: {{level}}%',
      updated: 'Оновлено: {{date}}',
      filter: 'Фільтр',
      filterPlaceholder: 'Наприклад React|JS',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
