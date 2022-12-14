export default {
  getMeta(metaName) {
    const meta = document.querySelector(`meta[property="${metaName}"]`);

    return meta ? meta.getAttribute('content') : '';
  },
};
