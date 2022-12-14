export default function (fn, wait) {
  let timeout = null;

  const debounced = (...args) => {
    const later = () => {
      timeout = null;

      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (!timeout) {
      fn(...args);
    }
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
