import { createLoadingNode } from '../../js/yzmx-utils'

/**
 * @param {number} config loading config, layers、bgScrollAbled
 */
function loading(config = {}) {
    const layers = typeof config === 'number' ? config : config.layers || -1;
    loading.loading_visible = (loading.loading_visible || 0) + layers;
    const fullscreen_loading = document.getElementById('fullscreen-loading');
    if(fullscreen_loading && loading.loading_visible <= 0) {
        document.body.style.overflow = '';
        return document.body.removeChild(fullscreen_loading);
    }
    if(!fullscreen_loading && loading.loading_visible > 0) {
        const loading_node =
            createLoadingNode('yzmx-loading-wrap', config.loading_text || '拼命加载中', 'fullscreen-loading');
        document.body.appendChild(loading_node);
        if(!config.bgScrollAbled) {
            document.body.style.overflow = 'hidden';
        }
    }
}

export default loading;