<template>
    <div class="typeset-wrap">
        <div v-html="text" class="typeset--content" @click="updateSelectedContent"></div>
        <div class="typeset-work-area">
            <div class="title">1.预览模块</div>
            <div class="preview" v-html="current_content && current_content.text || '请选择内容'"></div>
            <div class="title">2.设置class</div>
            <div class="setting-class-group">
                <yzmx-button
                    :class="['class-item', (current_content && current_content.class_name || []).indexOf(item) === -1 ? '' : 'class-item--selected']"
                    v-for="item in class_name_group"
                    :key="item"
                    @click="switchClass(item)">{{ item }}</yzmx-button>
            </div>
            <div class="title">3.排版列表</div>
            <div class="preview-items">
                <div class="preview-item"
                    v-for="(content, idx) in contents"
                    :key="content.id"
                    @click="editContent(idx)">
                        <div class="item-content">{{ idx + 1 }}.{{ content.text }}</div>
                        <div @click="deleteContent(idx)" class="yzmx-iconfont yzmx-icon--close delete-content__button"></div>
                    </div>
            </div>
            <yzmx-button class="save__button" @click="saveContent">确认</yzmx-button>
            <yzmx-button class="submit__button" @click="submit">提交</yzmx-button>
        </div>
    </div>
</template>

<script>
import { GENERATE_TYPESET_JSON } from '@/assets/api/common.js';

export default {
    props: {
        text: {},
    },
    data() {
        return {
            contents: JSON.parse(localStorage.getItem('contents')) || [],
            current_content: null,
            class_name_group: [
                'class_1',
                'class_2',
                'class_3',
                'class_4',
                'class_5',
                'class_6',
                'class_7',
                'class_8',
                'class_9',
                'class_10',
                'class_11',
            ],
        };
    },
    methods: {
        updateSelectedContent() {
            const text = this.$yzmx.replaceLineFeed(window.getSelection().toString());
            if(text) {
                this.current_content = {
                    id: new Date().getTime(),
                    text,
                    class_name: []
                };
            } else {
                this.current_content = null;
            }
        },
        switchClass(class_name) {
            if(!this.current_content) {
                return;
            }
            const class_name_idx = this.current_content.class_name.indexOf(class_name);
            if(class_name_idx === -1) {
                return this.current_content.class_name.push(class_name);
            }
            this.current_content.class_name.splice(class_name_idx, 1);

        },
        saveContent() {
            const content_idx = this.contents.findIndex(item => {
                return item.id === this.current_content.id;
            });
            if(content_idx !== -1) {
                this.contents[content_idx] = this.current_content;
            } else {
                this.contents.push(this.current_content);
            }
        },
        editContent(idx) {
            this.current_content = this.$yzmx.deepCopy(this.contents[idx]);
        },
        deleteContent(idx) {
            this.contents.splice(idx, 1);
        },
        submit() {
            const result = this.contents.map((item, idx) => {
                const { class_name, text } = item;
                return {
                    id: idx + 1,
                    class_name: class_name.join(' '),
                    text
                };
            });
            GENERATE_TYPESET_JSON({ result }).then(res => {
                const blob = new Blob([res], {type: 'application/octet-stream'});
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'result.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }).catch(err => {
                console.log(err, 'err');
            })
        },
    },
    beforeMount() {
        setInterval(() => {
            localStorage.setItem('contents', JSON.stringify(this.contents));
        }, 60000);
    }
}
</script>

<style lang="less">
.typeset-wrap {
    padding: 20px;

    & .typeset--content {
        width: calc(100% - 500px);
        padding: 20px;
        background: #f8f8f8;
        border-radius: 4px;
    }

    & .typeset-work-area {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 480px;
        background: #f2f2f2;
        border-radius: 4px;
        padding: 0 10px 10px;
        display: flex;
        flex-direction: column;
        height: calc(100% - 40px);

        & .title {
            font-size: 16px;
            font-weight: bold;
            padding: 10px 0;
        }

        & .setting-class-group {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            & .class-item {
                margin: 0 0 10px 10px;

                &:nth-child(5n+1) {
                    margin: 0 0 10px;
                }
            }

            & .class-item--selected {
                background: #ccc;
            }
        }

        & .preview,
        & .preview-items {
            border: 1px solid #d8d8d8;
            border-radius: 4px;
            padding: 10px;
            overflow: auto;
        }

        & .preview {
            min-height: 100px;
            max-height: 300px;
        }

        & .preview-items {
            max-height: 200px;

            & .preview-item {
                padding: 3px 0;
                color: #4a4a4a;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;

                & .item-content {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                    width: 100%;
                }

                & .delete-content__button {
                    flex-shrink: 0;
                }
            }
        }

        & .save__button,
        & .submit__button {
            width: 100%;
            margin: 20px 0;
        }
    }
}
</style>

