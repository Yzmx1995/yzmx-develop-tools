function createMessageNode(type, message) {
    const message_node = document.createElement('div');
    message_node.className = `yzmx-message yzmx-message--${type}`;
    message_node.style.top = `calc(5% + ${document.getElementsByClassName('yzmx-message').length * 50}px)`;
    const message_node_content = document.createElement('div');
    const message_node_icon = document.createElement('div');
    message_node_icon.className = `yzmx-iconfont yzmx-icon--message--${type}`;
    message_node_content.className = 'yzmx-message__content';
    message_node_content.innerHTML = message;
    message_node.appendChild(message_node_icon);
    message_node.appendChild(message_node_content);
    return message_node;
}

function hiddenMessage(message_node, duration) {
    if(duration) {
        setTimeout(() => {
            message_node.className += ' yzmx-message--hidden';
            setTimeout(() => {
                document.body.removeChild(message_node);
                Array.from(document.getElementsByClassName('yzmx-message')).forEach((item, idx) => {
                    item.style.top = `calc(5% + ${idx * 50}px)`;
                });
            }, 300);
        }, duration)
    }
}

function showMessage({ type = 'info', message, duration = 3000 }) {
    const message_node = createMessageNode(type, message);
    document.body.appendChild(message_node);
    setTimeout(() => {
        message_node.className += ' yzmx-message--show';
    }, 0);
    hiddenMessage(message_node, duration);
}

export default showMessage;