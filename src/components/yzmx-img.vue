<template>
    <div class="yzmx-img-wrap" :style="style"></div>
</template>

<script>
export default {
    componentName: 'yzmxImg',
    props: {
        src: {
            type: String,
            default: ''
        },
        defaultImgSrc: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'cover'
        },
    },
    computed: {
        style() {
            const suffix = `no-repeat center/${this.type}`;
            return `background: url(${this.src}) ${suffix}` +
                (this.defaultImgSrc ? `, url(${this.defaultImgSrc}) ${suffix}` : '');
        },
    },
    methods: {},
}
</script>

<style lang="less">
.yzmx-img-wrap {}

@media (max-width: 768px) {
    .yzmx-img-wrap {}
}
</style>
