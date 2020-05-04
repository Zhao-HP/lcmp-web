<template>
  <div class="configBlock">
    <div class="header">
      <div class="configImg">
        <img src='../../../../assets/configImg/config.png' />
      </div>
      <div class="configInfo">
        <div class="configCode">
          <span>{{configCode}}</span>
        </div>
        <div class="configDesc">
          <span>{{configDesc}}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <span></span>
      <div class="footerText">
        <slot name="easyBtn"></slot>
        <el-button
          type="info"
          size="mini" plain
          :disabled="fileBtnIsDisable"
          @click="getConfigFileContext(configCode)"
          class="configBtn">配置文件
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'single-config-block',
    props: {
      configCode:{},
      configDesc:{},
      easyBtnIsDisable:{
        type:Boolean,
        default:true
      },
      fileBtnIsDisable:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      getConfigFileContext(configName){
        this.$router.push({
          path:`/codeMirror/index/${configName}`,
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .configBlock {
    width: 240px;
    height: 135px;
    margin: 0 13px 13px 0;
    border: 1px solid #ccc;
    background: -webkit-linear-gradient(top, #fff, #f9f9f9);
    position: static;
    border-radius: 5px
  }

  .header {
    width: 100%;
    height: 50%;
  }

  .configImg{
    width: 30%;
    height: 100%;
    float: left;
  }
  .configImg > img{
    width: 100%;
    height: 100%;
  }

  .configInfo{
    width: 64%;
    height: 100%;
    float: left;
    margin-left: 3%;
  }

  .configCode{
    height: 50%;
    color: #F56C6C;
    line-height: 30px;
    border-bottom: solid 1px #cccccc;
  }

  .configDesc{
    height: 50%;
    font-size: 12px;
    color: #777;
    padding-top: 5px;
  }

  .footer {
    width: 100%;
    height: 50%;
    padding-left: 37%;
  }

  .configBtn {
    margin-top: 15%;
    width: 60px;
    padding-left: 0;
    padding-right: 0;
    margin-right: 5px;
  }

  .footerText{
    float: right;
  }
</style>
