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
        <single-config-block config-desc="网卡配置文件，目前只支持ifcfg-eth0" config-code="ifcfg-eth0">
          <template v-slot:easyBtn>
            <el-button
              type="info"
              size="mini" plain
              class="configBtn"
              @click="eth0DialogFormVisible=true">简易配置
            </el-button>
          </template>
        </single-config-block>
        <single-config-block config-desc="DHCP配置文件" config-code="dhcpd">
          <template v-slot:easyBtn>
            <el-button
              type="info"
              size="mini" plain
              class="configBtn" >简易配置
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

    <el-dialog :visible.sync="dnsDialogFormVisible" title="添加DNS配置"
               align="center" top="2vh" style="margin-left:-500px" width="600px">
      <dnsTable></dnsTable>
    </el-dialog>
    <el-dialog :visible.sync="eth0DialogFormVisible" title="修改网卡配置" align="center" width="500px" top="2vh">
      <ifcfg-eth0></ifcfg-eth0>
    </el-dialog>
  </el-main>
</template>

<script>
  import singleConfigBlock from './components/single-config-block'
  import dnsTable from './components/dns-table'
  import ifcfgEth0 from './components/ifcfg-eth0'
  import { getConfigFileInfoListByUserIdAndServerId } from '../../../api/config'

  export default {
    name: 'server-config',
    components: {
      singleConfigBlock,
      dnsTable,
      ifcfgEth0

    },
    data() {
      return {
        configList: [],
        dnsList: [],
        dnsDialogFormVisible: false,
        eth0DialogFormVisible: false
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
