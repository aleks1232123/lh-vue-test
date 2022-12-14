import Iterator from './Iterator';

export default {
  data: () => ({
    generator: null,
    generatorValue: null,
    generatorIsDone: false,
  }),
  methods: {
    generatorStart(values) {
      if (!this.generator) {
        this.generator = new Iterator(values);
      } else {
        this.generator.reset();
      }
      this.generatorNext();
    },
    async generatorNext() {
      await this.generator.next().then((result) => {
        if (result.done) {
          this.generatorIsDone = true;
        } else {
          this.generatorValue = result.value;
        }
      });
    },
  },
};
