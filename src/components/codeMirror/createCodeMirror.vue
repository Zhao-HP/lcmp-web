<template>
  <div class="app-container">
    <codemirror  ref="myCm"  v-model="item.content" :value="curCode" :options="cmOptions" @changes="changes" class="code" ></codemirror>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/javascript/javascript.js'
  export default {
    components: {
      codemirror
    },
    data() {
      return {
        dialogVisible: false,
        radio: 'java',
        curCode: '',
        item: {
          content: '// 请输入代码'
        },
        cmOptions: {
          mode: {
            name: 'javascript',
            json: true
          }, // 代码格式
          theme: 'base16-dark', // 编辑主题
          lineNumbers: true, // 显示行号
          smartIndent: true, // 自动缩进
          firstLineNumber: 1, // 第一行的行号
          showCursorWhenSelecting: true, // 选择是显示光标
          tabSize: 2
        }
      }
    },
    mounted() {
    },
    methods: {
      changes() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .code {
      height: 100%;
      border: 5px solid #ccc
    }
  }
</style>
