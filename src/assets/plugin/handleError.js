import Vue from 'vue';
import { error_enum } from '@/assets/js/enum/error';

function handleError(err, err_message) {
    if(process.env.NODE_ENV !== 'production') {
        console.log(err, 'err');
    }
    if(err === 'break') {
        return;
    }
    Vue.yzmx.message({
        message: err_message || error_enum[err && err.code] || '网络错误，请稍后再试！',
        type: 'error'
    });
}

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.handleError = handleError;
    Object.defineProperty(Vue.prototype, '$handleError', { value: handleError });
}

export default plugin;