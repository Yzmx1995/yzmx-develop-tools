function createLoadingNode(class_name, loading_text, id) {
    const loading_node = document.createElement('div');
    loading_node.id = id;
    loading_node.className = class_name;
    const loading__icon = document.createElement('div');
    loading__icon.className = 'yzmx-iconfont yzmx-icon--loading yzmx-loading__icon';
    const loading__content = document.createElement('div');
    loading__content.className = 'yzmx-loading__content';
    loading__content.innerHTML = loading_text;
    loading_node.appendChild(loading__icon);
    loading_node.appendChild(loading__content);
    loading_node.onclick = e => {
        if(e) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    };
    return loading_node;
}

export { createLoadingNode };