import axios from 'axios';

export default {
  post(url, data = {}) {
    return axios.post(url, data);
  },
  get(url, data = {}) {
    return axios.get(url, {
      params: data,
    });
  },
  serialize(object) {
    return Object.entries(object)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
  },
};
