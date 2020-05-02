<template>
 <div  class="code">
   <textarea ref="mycode" ></textarea>
 </div>

</template>

<script>
  import 'codemirror/theme/solarized.css'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/addon/hint/show-hint.css'
  import 'codemirror/addon/fold/foldgutter.css'



  let CodeMirror = require('codemirror/lib/codemirror')
  require('codemirror/addon/edit/matchbrackets')
  require('codemirror/addon/selection/active-line')
  require('codemirror/mode/clike/clike')
  require('codemirror/addon/hint/show-hint')
  require('codemirror/keymap/sublime')

  require('codemirror/addon/fold/foldcode')
  require('codemirror/addon/fold/foldgutter')
  require('codemirror/addon/fold/brace-fold')
  require('codemirror/addon/fold/comment-fold')

  export default {
    name: "codeMirrorText",
    props: {
      value: {
        type: String,
        default:'2546464645646445464'
      }
    },
    data() {
      return {
        code:false
      }
    },
    
    mounted() {
      let mime = 'text/x-java'
      let theme = 'solarized light'//设置主题，不设置的会使用默认主题
      this.code = CodeMirror.fromTextArea(this.$refs.mycode, {
        mode: mime, // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        keyMap: "sublime", // 快键键风格
        lineNumbers: true, // 显示行号
        // smartIndent: true, // 智能缩进
        // indentUnit: 4, // 智能缩进单位为4个空格长度
        // indentWithTabs: true, // 使用制表符进行智能缩进
        lineWrapping: true, //
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        foldGutter: true, // 启用行槽中的代码折叠
        autofocus: true, // 自动聚焦
        matchBrackets: true, // 匹配结束符号，比如"]、}"
        autoCloseBrackets: true, // 自动闭合符号
        styleActiveLine: true, // 显示选中行的样式
        theme:theme
      })
    
      this.code.setValue(this.value)
      this.code.on('change', cm => {
        this.$emit('changed', cm.getValue())
        this.$emit('input', cm.getValue())
      })
    },
    
    created() {
       console.log(this.$route.params.configName);       
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .code {
    .CodeMirror-scroll {
      overflow: scroll !important;
      margin-bottom: 0px;
      margin-right: -20px;
      padding-bottom: 0px;
      height: 900px;
      outline: none;
      position: relative;
    }

    .CodeMirror {
      font-family: monospace;
      color: #000;
      height: 900px;
      direction: ltr;
    }
  }
</style>
