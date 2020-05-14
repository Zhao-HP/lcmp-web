<template>
  <el-form ref="ethForm" :model="ethForm.ethInfo" label-width="130px" v-loading="loading">
    <el-form-item label="引导协议">
      <el-select v-model="ethForm.ethInfo.bootproto">
        <el-option label="none" value="none">
        </el-option>
        <el-option label="static" value="static">
        </el-option>
        <el-option label="DHCP" value="DHCP">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="网上设备别名">
      <el-input v-model="ethForm.ethInfo.device"></el-input>
    </el-form-item>
    <el-form-item label="自动加载网卡">
      <el-select v-model="ethForm.ethInfo.onboot">
        <el-option label="yes" value="yes">
        </el-option>
        <el-option label="no" value="no">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备的MAC地址">
      <el-input v-model="ethForm.ethInfo.hwaddr"></el-input>
    </el-form-item>
    <el-form-item label="网卡的IP地址">
      <el-input v-model="ethForm.ethInfo.ipaddr"></el-input>
    </el-form-item>
    <el-form-item label="子网掩码">
      <el-input v-model="ethForm.ethInfo.netmask"></el-input>
    </el-form-item>
    <el-form-item label="默认网关">
      <el-input v-model="ethForm.ethInfo.gateway"></el-input>
    </el-form-item>
    <el-form-item label="DNS1">
      <el-input v-model="ethForm.ethInfo.dns1"></el-input>
    </el-form-item>
    <el-form-item label="DNS2">
      <el-input v-model="ethForm.ethInfo.dns2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="submitBtnClick">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

  import { getDnsInfoListByServerId, updateDnsInfoListByServerId } from '../../../../api/config'

  export default {
    name: 'ifcfg-eth0.vue',
    data() {
      return {
        ethForm: {
          ethInfo: {
            device: '',
            onboot: '',
            bootproto: '',
            hwaddr: '',
            ipaddr: '',
            netmask: '',
            gateway: '',
            dns1: '',
            dns2: ''
          },
          configCode: 'ifcfg-eth0'
        },
        loading: false
      }
    },
    created() {
      this.loading = true
      getDnsInfoListByServerId({ 'configCode': 'ifcfg-eth0' }).then(response => {
        if (response.success) {
          this.ethForm.ethInfo = response.data
        }
        this.loading = false
      })
    },
    methods: {
      submitBtnClick() {
        let params = JSON.stringify(this.ethForm)
        updateDnsInfoListByServerId(params).then(response => {
          if (response.success) {
            this.$message({
              message: response.data,
              type: 'success'
            })
          } else {
            this.$message({
              message: response.errorMessage,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%
  }
</style>
