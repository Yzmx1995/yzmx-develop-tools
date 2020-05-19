import Vue from 'vue';
import App from './App.vue';
import "babel-polyfill";
import './assets/css/reset.less';
import './assets/css/yzmx/yzmx.less';
// import './assets/iconfont/common'
import './assets/iconfont/yzmx/iconfont.css';
import router from './router';
import Axios from './assets/plugin/axios'
import yzmx from './assets/plugin/yzmx'
import handleError from './assets/plugin/handleError';
import store from './store';
import components from '@/components';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import directive from './assets/directive';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


Vue.use(ElementUI)
Vue.config.productionTip = false;   // hidden some warn
Vue.use(Axios);
Vue.use(yzmx);
Vue.use(handleError);

Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
});


if(process.env.NODE_ENV !== 'production') {
    const Vconsole = require('vconsole');
    const vConsole = new Vconsole()
    Vue.use(vConsole)
}

new Vue({
    el: "#app",
    template: '<App/>',
    store,
    router,
    components: { App }
});