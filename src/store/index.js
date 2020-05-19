import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/module_global';
 
Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        global,
    },
});