<template>
    <div class="yzmx-tools-wrap">
        <div class="header">Yzmx偷懒工具集</div>
        <yzmx-button
            class="tool__button"
            v-for="tool in tools"
            :key="tool.id"
            @click="openTool(tool.path)">{{ tool.label }}</yzmx-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tools: [
                {
                    id: 1,
                    label: '网页排版工具',
                    path: '/typeset'
                }
            ],
        };
    },
    methods: {
        openTool(path) {
            this.$router.push({ path });
        },
    },
}
</script>

<style lang="less">
.yzmx-tools-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 200px 0;

    & .header {
        font-size: 20px;
        font-weight: bold;
    }

    & .tool__button {
        width: 240px;
        margin: 20px 0 0;
    }
}
</style>
