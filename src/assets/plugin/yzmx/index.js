
import SimpleTools from './simple-tools';
import message from './message';
import loading from './loading';

const yzmx = {
    ...SimpleTools,
    message,
    loading,
};

function plugin (Vue) {
    if (plugin.installed) {
      return;
    }
    Vue.yzmx = yzmx
    Object.defineProperty(Vue.prototype, '$yzmx', { value: yzmx })
  }
  
  export default plugin
  