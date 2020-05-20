<template>
    <div class="typeset-tool-wrap">
        <typeset-config
            v-if="current_feature === 'config'"
            @updateText="updateText"
            @openTypeset="switchCurrentFeature"></typeset-config>
        <typeset v-else :text="text"></typeset>
    </div>
</template>

<script>
import TypesetConfig from './components/typeset-config';
import Typeset from './components/typeset';

export default {
    components: { TypesetConfig, Typeset },
    data() {
        return {
            current_feature: 'config',
            text: localStorage.getItem('text') || ''
        };
    },
    methods: {
        switchCurrentFeature(feature = 'config') {
            this.current_feature = feature;
        },
        updateText(value) {
            this.text = this.$yzmx.replaceLineFeed(value);
            localStorage.setItem('text', this.text);
        },
    },
    beforeMount() {
        if(this.text) {
            this.current_feature = 'typeset';
        }
    },
    mounted() {},
}
</script>

<style lang="less">
.typeset-tool-wrap {
}
</style>

