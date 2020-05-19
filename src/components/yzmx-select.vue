<template>
    <div
        :class="class_name"
        :tabindex="tabindex"
        @blur="() => {options_visible = false}"
        hidefocus="true">
        <div :class="['yzmx-select--content', options_visible ? 'yzmx-select--content--focus' : '']"
            @click="switchOptionVisible">
            <div v-show="!show_placeholder && (multiple || clear)"
                @click.stop="clearSelected"
                class="yzmx-iconfont yzmx-icon--clear--linear yzmx-select--clear__button"></div>
            <div
                v-show="show_placeholder || (!multiple && !clear)"
                :class="['yzmx-iconfont', 'yzmx-icon--drop-down', 'yzmx-select--suffix', options_visible ? 'yzmx-select--suffix--reverse' : '']"></div>
            <!-- no selected -->
            <div v-if="show_placeholder">{{ placeholder }}</div>
            <!-- multiple -->
            <div v-else-if="multiple" class="yzmx-select--content--multiple">
                <div v-if="multiple === 'tags'" class="yzmx-select--content--multiple--tags">
                    <div
                        v-for="label_tag in select_label__multiple"
                        :key="label_tag.key"
                        class="yzmx-select--content--multiple--tags--tag">
                        <span>{{ label_tag.value }}</span>
                        <span
                            class="yzmx-iconfont yzmx-icon--clear--fill yzmx-select--content--multiple--tags--tag--clear__button"
                            @click.stop="clearOption(label_tag)"></span>
                    </div>
                    <div class="yzmx-select--content--multiple--tags--tag-number"
                        v-if="collapseTags && value && value.length">
                        {{ value.length }}+
                    </div>
                </div>
                <!-- normal -->
                <div v-else>{{ select_label__multiple.join() }}</div>
            </div>
            <!-- single -->
            <div v-else>{{ selected_label.value }}</div>
        </div>
        <div
            @click="switchOptionVisible()"
            ref="options"
            :class="['yzmx-options-wrap', options_visible ? 'yzmx-options-wrap--show' : '']">
            <!-- mobile 关闭options button -->
            <div v-if="multiple"
                class="yzmx-options--close__button-wrap--mobile" @click.stop="() => {}">
                <div @click="switchOptionVisible()"
                    class="yzmx-options--close__button--mobile">关闭</div>
            </div>
            <!-- mobile 选择提示 -->
            <div class="yzmx-options-prompt--mobile">{{ placeholder }}</div>
            <div class="yzmx-options" @click.stop="switchOption">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    componentName: 'yzmxSelect',
    model: {
        prop: 'value',
        event: 'changeSelected'
    },
    provide() {
        return {
            getSelected: () => this.value,
            multiple: this.multiple
        };
    },
    props: {
        placeholder: {
            default: '请选择'
        },
        // 预留， 为键盘tab做接口
        tabindex: {
            type: Number,
            default: -1,
        },
        value: {},
        // 多选
        multiple: {
            type: [Boolean, String],
            default: false
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 只展示一个tag以及选择条目的数量
        collapseTags: {
            type: Boolean,
            default: false
        },
        // 是否展示清除按钮，单选默认不展示，多选始终展示
        clear: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            options_visible: false,
            selected_label: {},
        };
    },
    computed: {
        /**
         * @desc select class name
         */
        class_name() {
            const { multiple, value, disabled } = this;
            return 'yzmx-select-wrap' + (multiple ? ' yzmx-select-wrap--multiple' : '') +
                (!multiple && value || multiple && value.length ? ' yzmx-select-wrap--selected' : '') +
                (disabled ? ' yzmx-select-wrap--disabled' : '');
        },
        /**
         * @desc show placeholder
         */
        show_placeholder() {
            return this.$yzmx.isEmptyObject(this.selected_label);
        },
        /**
         * @desc multiple 时的labels
         */
        select_label__multiple() {
            const { collapseTags, multiple, selected_label } = this;
            if(!multiple) {
                return;
            }
            if(multiple === 'tags') {
                const result = Object.entries(this.selected_label).map(item => {
                    const [key, value] = item;
                    return { key, value };
                });
                return collapseTags ? result.slice(0, 1) : result;
            }
            return Object.values(selected_label);
        },
    },
    watch: {
        value() {
            if(this.switchOption.is_click) {
                this.switchOption.is_click = 0;
            } else {
                this.updateLabel();
            }
        },
    },
    methods: {
        /**
         * @desc 切换option
         */
        switchOption(e) {
            const option_path = e.path || [];
            let option;
            for(let i = 0; i < option_path.length; i++) {
                if(option_path[i].getAttribute && option_path[i].getAttribute('is_option')) {
                    option = option_path[i];
                    break;
                }
            }
            if(option) {
                this.switchOption.is_click = 1;
                const { multiple } = this;
                const option_value = option.getAttribute('value');
                const option_label = option.getAttribute('label');
                if(this.multiple) {
                    let result = [...(this.value || [])];
                    const is_selected = result.indexOf(option_value);
                    if(is_selected === -1) {
                        result.push(option_value);
                        this.$set(this.selected_label, `value_${option_value}`, option_label);
                    } else {
                        result.splice(is_selected, 1);
                        this.$delete(this.selected_label, `value_${option_value}`);
                    }
                    this.$emit('changeSelected', result);
                } else {
                    this.options_visible = false;
                    this.$set(this.selected_label, 'value', option_label)
                    this.$emit('changeSelected', option_value);
                }
            }
        },
        /**
         * @desc clear value
         */
        clearSelected() {
            this.options_visible = false;
            this.$emit('changeSelected', this.multiple ? [] : undefined);
            this.selected_label = {};
        },
        /**
         * @desc 清除option
         * @param {String} key
         * @param {*} value
         */
        clearOption({ key, value }) {
            this.$delete(this.selected_label, key);
            this.value.splice(this.value.indexOf(value), 1);
        },
        /**
         * @desc open / close options
         */
        switchOptionVisible() {
            if(!this.disabled) {
                this.options_visible = !this.options_visible;
            }
        },
        /**
         * @desc 默认value && 其他组件改变绑定value时更新label
         */
        updateLabel() {
            const options = this.$refs.options && this.$refs.options.querySelectorAll('.yzmx-option-wrap');
            this.selected_label = {};
            const { value = [], multiple } = this;
            for(let i = 0; i < options.length; i++) {
                const option_value = options[i].getAttribute('value');
                const option_label = options[i].getAttribute('label');
                if(multiple && value.indexOf(option_value) !== -1) {
                    this.$set(this.selected_label, `value_${option_value}`, option_label);
                }
                if(!multiple && option_value === value) {
                    return this.$set(this.selected_label, 'value', option_label)
                }
            }
        },
    },
    mounted() {
        if(this.value &&(!this.multiple || this.value.length)) {
            this.updateLabel();
        }
    },
}
</script>

<style lang="less">
.yzmx-select-wrap {
    width: 240px;
    color: #6c6c6c;
    border: 1px solid rgba(0,0,0,.2);
    outline: 0;
    font-size: 14px;
    border-radius: 2px;
    position: relative;
    cursor: pointer;

    &--selected,
    & .yzmx-select--content--focus,
    &:hover {
        color: #000;
        border-color: #000;
    }

    & .yzmx-select--content {
        padding: 4.5px 30px 4.5px 10px;
        position: relative;

        & .yzmx-select--suffix,
        & .yzmx-select--clear__button {
            font-size: 12px;
            color: #909399;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translate(0, -50%);
        }

        & .yzmx-select--suffix {
            transition: transform .3s;
        }

        & .yzmx-select--suffix--reverse {
            transform: rotate(180deg) translate(0, 50%);
        }


        & .yzmx-select--content--multiple {

            & .yzmx-select--content--multiple--tags {
                display: flex;
                align-items: center;
                overflow-x: auto;

                & .yzmx-select--content--multiple--tags--tag-number,
                & .yzmx-select--content--multiple--tags--tag {
                    background-color: #f4f4f5;
                    border-color: #e9e9eb;
                    color: #909399;
                    text-align: center;
                    padding: 0 10px;
                    line-height: 22px;
                    margin-right: 10px;
                    border-radius: 20px;
                    cursor: auto;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                }

                & .yzmx-select--content--multiple--tags--tag {
                    & .yzmx-select--content--multiple--tags--tag--clear__button {
                        cursor: pointer;
                        margin-left: 10px;
                        font-size: 12px;
                        transform: scale(.9);
                    }
                }
            }
        }
    }

    & .yzmx-options-wrap {
        position: absolute;
        top: calc(100% + 10px);
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 1000;
        overflow: hidden;
        max-height: 0;
        transition: max-height .2s ease-out;
        transition: border .2s, max-height .2s ease-out;
        border: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border-radius: 2px;

        &--show {
            max-height: 200px;
            border: 1px solid #e4e7ed;
            overflow: auto;
            transition: border .2s, max-height .2s ease-in;
        }

        & .yzmx-options--close__button-wrap--mobile {
            display: none;
        }

        & .yzmx-options-prompt--mobile {
            display: none;
        }

        & .yzmx-options {
            max-height: 200px;
            overflow: auto;
        }
    }
}

.yzmx-select-wrap--multiple {}

.yzmx-select-wrap--selected {}

.yzmx-select-wrap--disabled {
    background: #f5f7fa !important;
    cursor: not-allowed !important;

    &,
    &--selected,
    & .yzmx-select--content--focus,
    &:hover {
        border-color: #e4e7ed !important;
        color: #c0c4cc !important;
    }
}

@media (max-width: 768px) {

    .yzmx-select-wrap {
        cursor: auto;

        &--selected,
        & .yzmx-select--content--focus,
        &:hover {
            color: #6c6c6c;
            border-color: rgba(0, 0, 0, .2);
        }

        & .yzmx-select--content {

            & .yzmx-select--content--multiple {

                & .yzmx-select--content--multiple--tags {

                    & .yzmx-select--content--multiple--tags--tag {
                        & .yzmx-select--content--multiple--tags--tag--clear__button {
                            cursor: auto;
                        }
                    }
                }
            }
        }

        & .yzmx-options-wrap {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .7);
            overflow: hidden;
            max-height: unset;
            transition: unset;
            transition: unset;
            box-shadow: none;
            border-radius: 0;
            display: none;
            flex-direction: column;
            justify-content: flex-end;

            &--show {
                max-height: unset;
                border: none;
                overflow: auto;
                transition: unset;
                display: flex;
            }

            & .yzmx-options--close__button-wrap--mobile {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 14px 5%;
                background: #fff;
                z-index: 9;
                display: block;

                & .yzmx-options--close__button--mobile {
                    background: #000;
                    color: #fff;
                    font-size: 16px;
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 4px;
                }
            }

            & .yzmx-options-prompt--mobile {
                display: block;
                padding: 10px 0;
                text-align: center;
                font-size: 16px;
                color: #000;
                border-bottom: 1px solid #e4e7ed;
                background: #fff;
                border-radius: 4px 4px 0 0;
            }

            & .yzmx-options {
                max-height: 75%;
                background: #fff;
                overflow: auto;
                width: 100%;
                padding: 0;
            }
        }
    }

    .yzmx-select-wrap--multiple {

        & .yzmx-options-wrap {
            & .yzmx-options {
                padding: 0 0 70px;
            }
        }
    }

    .yzmx-select-wrap--selected {}

    .yzmx-select-wrap--disabled {
        cursor: auto !important;

        &,
        &--selected,
        & .yzmx-select--content--focus,
        &:hover {
            border-color: #e4e7ed !important;
            color: #c0c4cc !important;
        }
    }
}
</style>
