export default function (func, ms) {
  let wait = false;

  return (...args) => {
    const later = () => {
      func.apply(this, args);
    };
    if (!wait) {
      later();
      wait = true;

      setTimeout(() => {
        wait = false;
      }, ms);
    }
  };
}
