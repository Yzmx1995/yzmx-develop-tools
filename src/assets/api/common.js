import Vue from 'vue';

function GET_BANNERS(params = {}) {
    return Vue.http.get();
}

export { GET_BANNERS };