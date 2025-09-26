import en from './en.js';
import tr from './tr.js';

const translations = { en, tr };

export function t(key) {
  const lang = document.documentElement.lang || 'en';
  return translations[lang]?.[key] || key;
}

export function setLanguage(lang) {
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
}