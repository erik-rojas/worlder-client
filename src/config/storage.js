export default {
  set: (key, item) => {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      window.console.error(e);
    }
  },
  get: key => {
    let result = null;
    try {
      result = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      window.console.error(e);
    }
    return result;
  },
  remove: key => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      window.console.error(e);
    }
  },
};
