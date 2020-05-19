import Axios from 'axios';
import { api_prefixs } from '../js/enum/global';

const instance = Axios.create({
  timeout: 60000,
  withCredentials: false
})

/**
 * @desc do something before request
 */
instance.interceptors.request.use(config => {
    const { api_prefix, ...result } = config;
    result.url = `${api_prefixs[api_prefix || 0]}${config.url}`;
    return result;
});

/**
 * @desc do something before response
 */
instance.interceptors.response.use(response => {
    return response.data || response || {};
}, err => {
    return Promise.reject(err && err.response);
});

function plugin (Vue) {
    if (plugin.installed) {
      return;
    }
    Vue.http = instance;
    Object.defineProperty(Vue.prototype, '$http', { value: instance })
}

export default plugin;