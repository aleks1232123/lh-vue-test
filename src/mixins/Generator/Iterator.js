export default class Iterator {
  constructor(items = []) {
    this.items = items;
    this.iterator = null;
    const self = this;
    // eslint-disable-next-line func-names
    this.generatorValues = async function* (values) {
      // eslint-disable-next-line no-restricted-syntax
      for (const value of values) {
        // eslint-disable-next-line no-await-in-loop
        yield await self.constructor.getItem(value);
      }
    };
    this.init();
  }

  init() {
    this.iterator = this.generatorValues(this.items);
  }

  next() {
    return this.iterator.next();
  }

  reset() {
    this.init();
  }

  static getItem(value) {
    return new Promise((resolve) => resolve(value));
  }
}
