<template>
    <div id="app">
        <div>header</div>
        <router-view />
        <div>footer</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'App',
    data() {
        return {};
    },
    watch: {},
    methods: {
        ...mapMutations([
            'SET_DEVICE_TYPE',
            'SET_REM'
        ]),
        updateBrowserConfig() {
            this.SET_DEVICE_TYPE();
            this.SET_REM();
        },
    },
    mounted() {
        this.updateBrowserConfig();
        window.onresize = () => {
            this.updateBrowserConfig();
        };
    }
}
</script>

