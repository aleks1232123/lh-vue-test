export default {
  data: () => ({
    audioWeWantToUnlock: [],
  }),
  mounted() {
    if (!this.audio) return;

    this.audioWeWantToUnlock.push(
      ...Object.keys(this.audio).map((key) => this.audio[key]),
    );
    window.document.body.addEventListener(
      'touchstart',
      this.audioUnlock,
      false,
    );
    window.document.body.addEventListener('click', this.audioUnlock, false);
  },
  methods: {
    audioUnlock() {
      if (this.audioWeWantToUnlock) {
        this.audioWeWantToUnlock.forEach((audio) => {
          audio.play();
          audio.pause();
          audio.currentTime = 0;
        });
        this.audioWeWantToUnlock = null;
        window.document.body.removeEventListener('click', this.audioUnlock);
        window.document.body.removeEventListener(
          'touchstart',
          this.audioUnlock,
        );
      }
    },
  },
};
