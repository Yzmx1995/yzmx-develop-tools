<template>
    <div class="yzmx-input-wrap">
        <input
            :value="value"
            :type="type"
            :disabled="disabled"
            :class="class_name"
            :placeholder="placeholder"
            @input="updateValue">
    </div>
</template>

<script>
export default {
    componentName: 'yzmxInput',
    model: {
        prop: 'value',
        event: 'updateValue'
    },
    props: {
        maxLength: {
            type: Number,
            default: 0,
        },
        // 预留， 为键盘tab做接口
        tabindex: {
            type: Number,
            default: -1,
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        value: {},
    },
    computed: {
        class_name() {
            return 'yzmx-input' + (this.disabled ? ' yzmx-input--disabled' : '') +
                (this.value ? ' yzmx-input--not-empty' : '');
        },
    },
    methods: {
        /**
         * @desc 监听输入框输入
         */
        updateValue(e) {
            let { value } = e.target || {};
            if(this.maxLength && value.length > this.maxLength) {
                value = value.slice(0, this.maxLength);
                e.target.value = value;
            }
            this.$emit('updateValue', value);
        },
    },
}
</script>

<style lang="less">
.yzmx-input-wrap {
    width: 180px;
    display: inline-block;

    input::-webkit-input-placeholder {
        color: #c0c3cb;
    }
    input:-moz-placeholder {
        color: #c0c3cb;
    }
    input::moz-placeholder {
        color: #c0c3cb;
    }

    input:-ms-input-placeholder {
        color: #c0c3cb;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    & .yzmx-input {
        outline: none;
        -webkit-appearance: none;
        padding: 0 15px;
        line-height: 40px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        font-size: 14px;
        box-sizing: border-box;

        &:focus,
        &--not-empty {
            border-color: #000;
        }
    }
}

@media (max-width: 768px) {

    .yzmx-input-wrap {
        width: 80%;

        & .yzmx-input {
            width: 100%;

            &:focus,
            &--not-empty {
                border-color: #000;
            }
        }
    }
}
</style>
