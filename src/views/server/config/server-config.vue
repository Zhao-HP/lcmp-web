<template>

  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用配置</span>
      </div>
      <div class="configList">
        <single-config-block config-desc="配置服务器的DNS，重启后失效" config-code="DNS">
          <template v-slot:easyBtn>
            <el-button
              type="info"
              size="mini" plain
              class="configBtn"
              @click="dnsDialogFormVisible=true">简易配置
            </el-button>
          </template>
        </single-config-block>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户自定义配置</span>
      </div>
      <div class="configList" v-for="item in configList" :key="item.id">
        <single-config-block :config-desc="item.configDesc" :config-code="item.configCode">
        </single-config-block>
      </div>
    </el-card>

    <el-dialog :visible.sync="dnsDialogFormVisible" title="添加DNS配置" align="center">
      <dnsTable></dnsTable>
    </el-dialog>

  </el-main>
</template>

<script>
  import singleConfigBlock from './components/single-config-block'
  import dnsTable from './components/dns-table'
  import { getConfigFileInfoListByUserIdAndServerId } from '../../../api/config'

  export default {
    name: 'server-config',
    components: {
      singleConfigBlock,
      dnsTable
    },
    data() {
      return {
        configList: [],
        dnsList:[],
        dnsDialogFormVisible: false
      }
    },
    created() {
      this.getConfigFileInfoListByUserIdAndServerId()
    },
    methods: {
      getConfigFileInfoListByUserIdAndServerId() {
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

  .el-card {
    margin-top: 20px;
  }
</style>
