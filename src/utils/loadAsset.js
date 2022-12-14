class LoadAsset {
  constructor() {
    this.assets = {};
  }

  load(asset, isSvg) {
    if (!this.assets[asset]) {
      try {
        this.assets[asset] = isSvg
          ? require(`@/assets/svg-sprites/${asset}.svg`)
          : require(`@/assets/images/${asset}`);
      } catch (e) {
        throw new Error(`Cannot find ${asset}${isSvg ? '.svg' : ''} in src/assets/${isSvg ? 'svg-sprites' : 'images'}`);
      }
    }
    return isSvg ? `${this.assets[asset].symbol}` : this.assets[asset];
  }
}

const assets = new LoadAsset();
export default (asset, svg = false) => assets.load(asset, svg);
