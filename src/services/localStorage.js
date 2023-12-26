import indexOf from 'lodash/indexOf';

const keyFormat = 'eggForce/storage';

const globalLocalStorageKeys = [];

const localStorageKeySet = {
  activeKey: `${keyFormat}/activeKey`,
  locale: `${keyFormat}/locale`,
  isManuallyDisconnected: `${keyFormat}/isManuallyDisconnected`,
  validators: `${keyFormat}/validators`,
  notifyGameIcon: `${keyFormat}/notifyGameIcon`,
  deployHashesStore: `${keyFormat}/deployHashesStore`,
  // browserTab: `${keyFormat}/browserTab`,
};

export const getLocalStorageKey = (name) => {
  return localStorageKeySet[name];
};

export const getLocalStorageItem = (key, isJSON = false) => {
  const cacheValue = window.localStorage.getItem(getLocalStorageKey(key));

  if (cacheValue && isJSON) {
    return JSON.parse(cacheValue);
  }

  return cacheValue;
};

export const setLocalStorageItem = (key, value) => {
  const localKeyname = getLocalStorageKey(key);
  const parsedValue = typeof value !== 'string' ? JSON.stringify(value) : value;
  return window.localStorage.setItem(localKeyname, parsedValue);
};

export const setDynamicLocalStorageItem = (key, value) => {
  const localKeyname = `${keyFormat}/${key}`;
  const parsedValue = typeof value !== 'string' ? JSON.stringify(value) : value;
  return window.localStorage.setItem(localKeyname, parsedValue);
};

export const getDynamicLocalStorageItem = (key, isJSON = false) => {
  const cacheValue = window.localStorage.getItem(`${keyFormat}/${key}`);

  if (cacheValue && isJSON) {
    return JSON.parse(cacheValue);
  }

  return cacheValue;
};

export const clearLocalStorage = (key) => {
  if (typeof key === 'string') {
    window.localStorage.removeItem(getLocalStorageKey(key));
  } else {
    Object.keys(localStorageKeySet).forEach((key) => {
      if (indexOf(globalLocalStorageKeys, key) < 0) {
        window.localStorage.removeItem(getLocalStorageKey(key));
      }
    });
  }
};

export const getCookie = () => document.cookie;

const exports = {
  keyFormat,
  getLocalStorageItem,
  setLocalStorageItem,
  clearLocalStorage,
};

export default exports;
