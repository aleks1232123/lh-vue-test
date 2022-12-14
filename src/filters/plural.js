/* eslint-disable consistent-return */
export default function (value, one = '', two = '', five = '') {
  if (!Number.isInteger(value)) return;

  let n = Math.abs(value);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}
