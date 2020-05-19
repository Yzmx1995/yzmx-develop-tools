export default {
    state: {
        is_mobile: false,
    },
    getters: {},
    mutations: {
        SET_DEVICE_TYPE(state) {
            state.is_mobile = !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        },
        SET_REM(state) {
            const DESIGN_WIDTH = 375;
            const DESIGN_RATIO = 100;
            document.documentElement.style.fontSize = document.body.style.fontSize =
                document.documentElement.clientWidth * DESIGN_RATIO / DESIGN_WIDTH + "px";
        },
    },
    actions: {}
}
