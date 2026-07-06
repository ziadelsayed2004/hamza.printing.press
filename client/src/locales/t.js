import ar from './ar.json';
import en from './en.json';

/**
 * Translates a key using the active language dictionary.
 * Supports dot notation: t('nav.dashboard')
 * Supports replacements: t('dashboard.welcome', { name: 'أحمد' })
 */
export function t(key, replacements = {}) {
  const currentLanguage = localStorage.getItem('appLanguage') || 'ar';
  const keys = key.split('.');
  let value = currentLanguage === 'en' ? en : ar;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Fallback to key if not found
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Replace placeholders: {name}
  let result = value;
  Object.entries(replacements).forEach(([placeholder, val]) => {
    result = result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), val);
  });

  return result;
}

export default t;
