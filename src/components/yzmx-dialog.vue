<template>
    <div class="yzmx-dialog-wrap" @click.stop="handleClickBlankArea">
        <div class="yzmx-dialog" @click.stop="() => {}">
            <div @click="close"
                class="yzmx-iconfont yzmx-icon--close yzmx-dialog--close__button"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    componentName: 'yzmxDialog',
    props: {
        /**
         * @desc 按下esc键是否关闭dialog
         */
        downEscCloseAble: {
            type: Boolean,
            default: true,
        },
        /**
         * @desc 点击空白是否关闭dialog
         */
        clickBlankAreaCloseAble: {
            type: Boolean,
            default: true,
        },
        /**
         * @desc 是否禁用背景滚动
         */
        bgScrollDisabled: {
            type: Boolean,
            default: true,
        }
    },
    computed: {},
    methods: {
        /**
         * @desc 关闭dialog
         */
        close() {
            if(this.downEscCloseAble) {
                document.removeEventListener('keyup', this.handleKeyDownEsc);
            }
            this.$emit('close');
        },
        /**
         * @desc 处理esc按键
         * @param {*} 按键信息
         */
        handleKeyDownEsc(e = {}) {
            if(e.keyCode === 27 && this.downEscCloseAble) {
                this.close();
            }
        },
        /**
         * @desc 处理esc按键
         */
        handleClickBlankArea() {
            if(this.clickBlankAreaCloseAble) {
                this.close();
            }
        },
    },
    mounted() {
        if(this.bgScrollDisabled) {
            document.body.style.overflow = 'hidden';
        }
        if(this.downEscCloseAble) {
            document.addEventListener('keyup', this.handleKeyDownEsc);
        }
    },
    beforeDestroy() {
        if(this.bgScrollDisabled) {
            document.body.style.overflow = '';
        }
    },
}
</script>

<style lang="less">
.yzmx-dialog-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    display: flex;
    align-items: center;
    justify-content: center;

    & .yzmx-dialog {
        width: 50%;
        background: #fff;
        border-radius: 4px;
        position: relative;
        padding: 20px;

        & .yzmx-dialog--close__button {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            font-size: 20px;
        }
    }
}

@media (max-width: 768px) {
    .yzmx-dialog-wrap {

        & .yzmx-dialog {
            width: 90%;

            & .yzmx-dialog--close__button {
                cursor: auto;
            }
        }
    }
}
</style>
