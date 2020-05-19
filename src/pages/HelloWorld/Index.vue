<template>
    <div class="hello-world-wrap">
        <van-picker
            @change="handleChange"
            show-toolbar title="标题" :columns="columns" />
        value: {{ value }}
    </div>
</template>

<script>
import { Picker } from 'vant';

export default {
    data() {
        return {
            value: 0,
            radio: 9,
            columns: [
                { text: '杭州', disabled: true },
                { text: '宁波' },
                { text: '温州' },
            ],
        };
    },
    watch: {
    },
    methods: {
        handleChange(param1, param2, param3, param4) {
            console.log(param1, 'param1')
            console.log(param2, 'param2')
            console.log(param3, 'param3')
            console.log(param4, 'param4')
        }
    },
    beforeMount() {
        this.$handleError({ code: 401 });
    },
    mounted() {},
}
</script>

<style lang="less">
.hello-world-wrap {


    & .test {
        & .el-radio {
            color: red;
        }
    }
}

@media (max-width: 768px) {
    .hello-world-wrap {}
}
</style>

