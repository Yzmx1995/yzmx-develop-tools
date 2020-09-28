<template>
    <div class="index-wrap">
        <el-button @click="handleImport" class="import__btn">导出</el-button>
        <div class="edit__box">
            <textarea
                v-model="text"
                class="typeset__textarea"></textarea>
            <div class="class-options">
                <div
                    :style="{background: className.indexOf(item.id) === -1 ? '' : '#f2f2f2'}"
                    v-for="item in Object.values(classOptions)"
                    @click="updateClassName(item.id)"
                    class="class-option">{{item.name}}</div>
                <el-button style="margin: 0 10px 10px 0;"
                    @click="switchClassPopup">
                    <i class="el-icon-edit-outline"></i></el-button>
            </div>
            <div class="save__btn" @click="handleSaveResult">保存</div>
            <div class="clear__btn" @click="handleClear">clear</div>
            <div>className:{{className}}</div>
            <div>text:{{text}}</div>
            <div>results:{{results}}</div>
        </div>
        <div class="preview__box-wrap">
            <div class="preview__box">
                <div
                    v-for="result in results"
                    :style="result.style"
                    v-html="result.content"></div>
            </div>
            <div class="results">
                <div
                    v-for="(result, idx) in results"
                    class="result">
                    <div @click="changeSelectResult(idx)">{{ idx + 1 }}.{{result.content}}</div>
                    <i class="el-icon-delete result-delete" @click="handleDeleteResult(idx)"></i>
                </div>
            </div>
        </div>
        <div class="edit-class-popup" v-if="editClassPopupVisible">
            <div class="edit-class-popup--body">
                <div class="edit-class-popup--body-class-options">
                    <div>
                        <div v-for="(item, idx) in Object.values(editClassOptions)" class="edit-class-popup--body-class-option">
                            <div class="class-option-item">
                                <div>className:</div>
                                <el-input v-model="item.name"></el-input>
                            </div>
                            <div v-for="itemStyle in item.styles" class="class-option-item">
                                <div>{{ itemStyle.prefix }}:</div>
                                <el-select v-model="itemStyle.value" v-if="itemStyle.options">
                                    <el-option
                                        v-for="option in itemStyle.options"
                                        :key="option"
                                        :label="option"
                                        :value="option">
                                    </el-option>
                                </el-select>
                                <el-input v-else v-model="itemStyle.value"></el-input>
                            </div>
                            <el-button @click="handleDeleteClass(item.id)" type="danger" style="width: 100%;">delete</el-button>
                        </div>
                        <div class="add-class__btn" @click="handleAddClass">add</div>
                    </div>
                </div>
                <div class="edit-class-popup--body--close__btn" @click="switchClassPopup">x</div>
                <div class="save__btn edit-class-popup--body--save__btn" @click="handleSaveClassOptions">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            currentResult: null,
            className: [],
            classOptions: {},
            editClassPopupVisible: false,
            editClassOptions: {},
            results: [],
            styles: [
                {
                    prefix: 'font-family',
                    value: '',
                },
                {
                    prefix: 'color',
                    value: '',
                },
                {
                    prefix: 'font-size',
                    value: '',
                    suffix: 'px',
                },
                {
                    prefix: 'line-height',
                    value: '',
                    suffix: 'px',
                },
                {
                    prefix: 'text-decoration',
                    value: '',
                    options: ['none', 'underline'],
                },
                {
                    prefix: 'text-align',
                    value: '',
                    options: ['left', 'right', 'center'],
                },
                {
                    prefix: 'display',
                    value: 'block',
                    options: ['block', 'inline', 'inline-block'],
                },
            ],
        };
    },
    watch: {
        results() {
            localStorage.setItem('results', JSON.stringify(this.results));
        }
    },
    methods: {
        handleImport() {
            const elementA = document.createElement('a');
            const results = this.results.map(({ content, className }) => {
                const result = { content };
                result.className = '';
                className.forEach(item => {
                    result.className += `${result.className ? ' ' : ''}${this.classOptions[item].name}`;
                });
                return result
            })
            elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(results));
            elementA.setAttribute('download', "contents.json");
            elementA.style.display = 'none';
            document.body.appendChild(elementA);
            elementA.click();
            document.body.removeChild(elementA);
            const elementB = document.createElement('a');
            const classOptions = Object.values(this.classOptions).map(({ name, styles }) => {
                const obj = { name };
                obj.value = '';
                styles.forEach(({ value, suffix, prefix }) => {
                    obj.value += value ? `${prefix}: ${value}${suffix || ''};` : '';
                });
                return obj
            })
            elementB.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(classOptions));
            elementB.setAttribute('download', "classOptions.json");
            elementB.style.display = 'none';
            document.body.appendChild(elementB);
            elementB.click();
            document.body.removeChild(elementB);
        },
        handleClear() {
            this.text = '';
            this.className = [];
            this.currentResult = null;
        },
        switchClassPopup() {
            this.editClassPopupVisible = !this.editClassPopupVisible;
            if(this.editClassPopupVisible) {
                this.editClassOptions = this.$yzmx.deepCopy(this.classOptions);
            }
        },
        updateClassName(id) {
            const idx = this.className.indexOf(id);
            if(idx === -1) {
                this.className.push(id)
            } else {
                this.className.splice(idx, 1);
            }
        },
        handleSaveResult() {
            const result = {};
            result.content = this.$yzmx.replaceLineFeed(this.text);
            result.className = this.className;
            result.style = '';
            this.className.forEach(item => {
                this.classOptions[item].styles.forEach(({ prefix, value, suffix }) => {
                    result.style += value ? `${prefix}: ${value}${suffix || ''};` : '';
                });
            });
            if(this.currentResult) {
                const idx = this.results.findIndex(item => {
                    return item.id === this.currentResult;
                });
                this.$set(this.results, idx, { ...this.results[idx], ...result })
            } else {
                result.id = `${new Date().getTime()}`;
                this.results.push(result);
            }
            this.handleClear();
        },
        changeSelectResult(idx) {
            const { content, className, id } = this.results[idx];
            this.currentResult = id;
            this.text = content.replace(/<br>/g,'\n');
            this.className = className || [];
        },
        handleAddClass() {
            const id = `${new Date().getTime()}`;
            this.$set(this.editClassOptions, id, { id, name: '', styles: this.$yzmx.deepCopy(this.styles)})
        },
        handleSaveClassOptions() {
            this.classOptions = this.$yzmx.deepCopy(this.editClassOptions);
            localStorage.setItem('classOptions', JSON.stringify(this.classOptions));
            this.switchClassPopup();
        },
        handleDeleteClass(key) {
            this.$delete(this.editClassOptions, key);
        },
        handleDeleteResult(idx) {
            this.results.splice(idx, 1);
        },
    },
    beforeMount () {
        this.classOptions = JSON.parse(localStorage.getItem('classOptions')) || {};
        this.results = JSON.parse(localStorage.getItem('results')) || [];
    }
}
</script>

<style lang="less">
.index-wrap {
    display: flex;
    padding: 40px 0 0;

    .import__btn {
        position: absolute;
        top: 10px;
        right: 20px;
    }

    .save__btn {
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        background: #000;
        cursor: pointer;
    }

    .clear__btn {
        border: 1px solid #f2f2f2;
        border-radius: 4px;
        text-align: center;
        margin-top: 10px;
        line-height: 28px;
    }

    .preview__box-wrap,
    .edit__box {
        width: 50%;
    }

    .edit__box {
        padding: 30px 20px;

        textarea {
            width: 100%;
            height: 300px;
        }

        .class-options {
            display: flex;
            align-items: center;
            padding: 20px 0;
            flex-wrap: wrap;

            .class-option {
                width: 80px;
                line-height: 40px;
                font-size: 14px;
                text-align: center;
                border: 1px solid #f2f2f2;
                margin: 0 10px 10px 0;
                border-radius: 4px;
            }
        }
    }

    .preview__box-wrap {
        padding: 30px 20px 30px 0;

        .preview__box {
            background: #f2f2f2;
            padding: 20px;
            height: 500px;
            overflow: auto;
            margin: 0 0 20px;
            border-radius: 4px;
        }

        .results {
            height: 200px;
            padding: 20px;
            overflow: auto;

            .result {
               margin: 0 0 10px;
               line-height: 28px;
               border-radius: 4px;
               background: #f2f2f2;
               display: flex;
               align-items: center;
               padding: 0 10px;

               & > div:first-child {
                   flex-grow: 1;
                   overflow: hidden;
                   white-space: nowrap;
                   text-overflow: ellipsis;
               }

               .result-delete {
                   margin-left: 10px;
                   flex-shrink: 0;
                   cursor: pointer;
               }
            }
        }
    }

    .edit-class-popup {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .4);
        display: flex;
        align-items: center;
        justify-content: center;

        .edit-class-popup--body {
            width: 50%;
            height: 70%;
            overflow: auto;
            padding: 40px 20px 60px;
            background: #fff;
            border-radius: 4px;
            position: relative;

            .edit-class-popup--body-class-options {
                height: 100%;
                overflow: auto;

                .edit-class-popup--body-class-option {
                    background: #f6f6f6;
                    border-radius: 4px;
                    padding: 20px;
                    margin-bottom: 10px;

                    .class-option-item {
                        padding: 0 0 10px;
                        display: flex;
                        align-items: center;

                        & > div:first-child {
                            flex-shrink: 0;
                            padding-right: 10px;
                            width: 120px;
                        }

                        & > div:last-child {
                            flex-grow: 1;
                        }
                    }
                }

                .add-class__btn {
                    line-height: 30px;
                    border: 1px solid #f2f2f2;
                    border-radius: 4px;
                    font-size: 16px;
                    text-align: center;
                    cursor: pointer;
                }
            }

            .edit-class-popup--body--close__btn {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 16px;
                cursor: pointer;
                text-align: center;
            }

            .edit-class-popup--body--save__btn {
                position: absolute;
                left: 20px;
                bottom: 20px;
                width: calc(100% - 40px);
            }
        }
    }
}
</style>
