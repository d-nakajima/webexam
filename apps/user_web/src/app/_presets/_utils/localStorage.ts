function _getItem(key: string) {
  return localStorage?.getItem(key) || null;
}

function _setItem(key: string, value: string) {
  if (localStorage) localStorage.setItem(key, value);
}
