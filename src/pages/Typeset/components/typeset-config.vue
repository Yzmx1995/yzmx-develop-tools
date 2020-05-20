<template>
    <div class="typeset-config-wrap">
        <div class="title">1.排版内容：</div>
        <textarea
            :value="text"
            @input="updateText"
            class="typeset__textarea"></textarea>
        <yzmx-button
            class="open-typeset__button"
            @click="openTypeset">确定</yzmx-button>
    </div>
</template>

<script>

export default {
    model: {
        prop: 'text',
        event: 'updateText'
    },
    props: {
        text: {},
    },
    data() {
        return {
        };
    },
    methods: {
        updateText(e) {
            this.$emit('updateText', e.target.value);
        },
        openTypeset() {
            this.$emit('openTypeset', 'typeset');
        },
    },
    beforeMount() {
    },
    mounted() {},
}
</script>

<style lang="less">
.typeset-config-wrap {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    align-items: center;
    padding: 20px;

    & .title {
        font-size: 18px;
        font-weight: bold;
        padding: 0 0 20px;
        width: 100%;
    }

    .typeset__textarea {
        width: 100%;
        flex-grow: 1;
        border-radius: 4px;
        border: 1px solid #ececec;
        padding: 10px;
    }

    .open-typeset__button {
        width: 300px;
        flex-shrink: 0;
        margin: 20px 0 0;
    }
}
</style>

