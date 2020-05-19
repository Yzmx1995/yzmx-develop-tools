<template>
    <div
        :class="button_class"
        @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    componentName: 'yzmxButton',
    props: {
        // button 类型
        type: {
            type: String,
            default: 'normal',
        },
        // button 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        button_class() {
            return `yzmx-button-wrap yzmx-button-wrap--${this.type}` +
                (this.disabled ? ` yzmx-button-wrap--disabled yzmx-button-wrap--${this.type}--disabled` : '');
        },
    },
    methods: {
        handleClick() {
            if(!this.disabled) {
                this.$emit('click');
            }
        },
    },
}
</script>

<style lang="less">
.yzmx-button-wrap {
    cursor: pointer;
    padding: 8px 10px;
    display: inline-block;
    border-radius: 4px;
    min-width: 80px;
    text-align: center;
    -moz-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    -khtml-user-select:none;
    user-select:none;
}

.yzmx-button-wrap--disabled {
    cursor: not-allowed;
}

.yzmx-button-wrap--normal {
    border: 1px solid rgba(220, 223, 230, .8);
    color: rgba(96, 98, 102, .8);
    background: #fff;

    &:hover {
        color: rgba(96, 98, 102, 1);
        border: 1px solid rgba(220, 223, 230, 1);
    }

    &:active {
        color: #4a4a4a;
        border: 1px solid rgb(200, 210, 215);
    }
}

.yzmx-button-wrap--normal--disabled {
    opacity: .6;

    &:hover,
    &:active {
        color: rgba(96, 98, 102, .8);
        border: 1px solid rgba(220, 223, 230, .8);
    }
}

@media (max-width: 768px) {
    .yzmx-button-wrap,
    .yzmx-button-wrap--disabled {
        cursor: auto;
    }
}
</style>
