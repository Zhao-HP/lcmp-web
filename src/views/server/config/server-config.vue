<template>

  <el-main>
    <div class="configList" v-for="item in configList" :key="item.id">
      <single-config-block
        :config-info="item">
      </single-config-block>
    </div>
  </el-main>
</template>

<script>
  import singleConfigBlock from './components/single-config-block'
  import {getConfigFileInfoListByUserIdAndServerId} from '../../../api/config'
  export default {
    name: 'server-config',
    components: {
      singleConfigBlock
    },
    data() {
      return {
        configList: []
      }
    },
    created() {
      this.getConfigFileInfoListByUserIdAndServerId()
    },
    methods:{
      getConfigFileInfoListByUserIdAndServerId(){
        getConfigFileInfoListByUserIdAndServerId().then(response => {
          this.configList = response.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .configList {
    float: left;
  }
</style>
