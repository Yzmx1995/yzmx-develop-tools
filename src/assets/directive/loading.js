import Vue from 'vue';
import { createLoadingNode } from '../js/yzmx-utils'

/**
 * 
 * @param {*} el 
 * @param {*} loading_visible
 */
function switchLoading(el, loading_visible) {
    el.style.overflow = loading_visible ? 'hidden' : '';
    const loading = el.querySelector('.yzmx-loading-wrap--directive');
    if(loading) {
        loading.style.display = loading_visible ? 'flex' : 'none';
    }
}

Vue.directive('yzmx-loading', {
    bind: function(el, binding) {
        const loading_node = createLoadingNode('yzmx-loading-wrap yzmx-loading-wrap--directive', el.getAttribute('yzmx-loading-text'))
        el.appendChild(loading_node);
        switchLoading(el, binding.value);
        el.className += ' yzmx-loading--parent';
    },
    update(el, binding) {
        switchLoading(el, binding.value);
    }
})