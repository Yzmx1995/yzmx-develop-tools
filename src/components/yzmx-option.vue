<template>
    <div
        :class="class_name"
        :value="value"
        :label="label"
        is_option="1">
        <slot>
            <div class="option--default">{{ label }}</div>
        </slot>
    </div>
</template>

<script>
export default {
    componentName: 'yzmxOption',
    inject: ['getSelected', 'multiple'],
    props: {
        value: {},
        label: {},
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
        };
    },
    computed: {
        /**
         * @desc option class name
         */
        class_name() {
            const { disabled, is_selected } = this;
            return 'yzmx-option-wrap' + (disabled ? ' yzmx-option-wrap--disabled' : '') + 
                (is_selected ? ' yzmx-option-wrap--selected' : '');
        },
        /**
         * @desc option是否被选中
         */
        is_selected() {
            return this.multiple ? (this.getSelected() || []).indexOf(this.value) !== -1 :
                this.getSelected() === this.value;
        },
    },
}
</script>

<style lang="less">
.yzmx-option-wrap {
    & .option--default {
        line-height: 34px;
        padding: 0 20px;
        color: #6c6c6c;

        &:hover {
            color: #000;
            background: #f5f7fa;
        }
    }
}

.yzmx-option-wrap--selected {

    & .option--default {
        color: #000;
        font-weight: 500;
    }
}

.yzmx-option-wrap--disabled {

    & .option--default {
        background: #f5f7fa !important;
        cursor: not-allowed !important;
        color: #c0c4cc !important;
    }
}

@media (max-width: 768px) {

    .yzmx-option-wrap {
        & .option--default {

            &:hover {
                color: unset;
                background: unset;
            }
        }
    }

    .yzmx-option-wrap--selected {

        & .option--default {
            font-weight: 500;

            &:hover {
                color: #000;
            }
        }
    }

    .yzmx-option-wrap--disabled {

        & .option--default {
            cursor: auto !important;
        }
    }
}
</style>
