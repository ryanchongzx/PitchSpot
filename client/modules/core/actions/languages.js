export default {
  change({}, newLocale) {
    localStorage.setItem('LU-locale', newLocale);
  }
};
