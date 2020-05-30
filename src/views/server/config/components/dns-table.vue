<template>

  <el-form size="mini" ref="dnsForm" name="dnsForm" :model="dnsForm" v-loading="loading">
    <el-form-item>
      <el-row style="padding-top: 10px" v-for="dns in dnsForm.dnsList" :key="dns.id">
        <el-col :xs="11" :sm="11" :lg="10">
          <div class="component-section" style="margin-right: 20px;">
            <span class="component-label">域名{{dns.id}}:</span>
            <el-input
              class="component-item"
              placeholder="请输入参数值"
              v-model="dns.domain"
              clearable
              style="width:20%;">
            </el-input>
          </div>
        </el-col>
        <el-col :xs="11" :sm="11" :lg="10">
          <div class="component-section">
            <span class="component-label">IP地址:</span>
            <el-input
              class="component-item"
              placeholder="请输入参数别名"
              v-model="dns.ipAddress"
              style="width:20%;"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="component-section1">
            <el-button @click.prevent="removeDnsInfo(dns)" icon="el-icon-minus"
                       type="danger" size="mini" circle plain style="margin-top: 4%">
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-row style="padding-top: 10px">
      <el-button icon="el-icon-plus" type="success" size="mini" circle plain
                 @click="addDnsInfo">
      </el-button>
      <el-button type="primary" plain @click="submitBtnClick">提交</el-button>
    </el-row>
  </el-form>
</template>

<script>
  import { getDnsInfoListByServerId, updateDnsInfoListByServerId } from '../../../../api/config'
  import qs from 'qs'

  export default {
    name: 'dns-table',
    data() {
      return {
        dnsForm: {
          dnsList: []
        },
        serverDnsList: [],
        loading: false
      }
    },
    created() {
      this.loading = true
      getDnsInfoListByServerId({ 'configCode': 'DNS' }).then(response => {
        if (response.success) {
          this.serverDnsList = response.data
          this.dnsForm.dnsList = this.serverDnsList
        }
        this.loading = false
      })
    },
    methods: {
      addDnsInfo() {
        let dnsInfo = {
          'id': 1,
          'domain': '',
          'ipAddress': ''
        }
        dnsInfo.id = this.dnsForm.dnsList.length + 1
        this.dnsForm.dnsList.push(dnsInfo)
      },
      removeDnsInfo(item) {
        const index = this.dnsForm.dnsList.indexOf(item)
        if (index !== -1) {
          this.dnsForm.dnsList.splice(index, 1)
        }
      },
      submitBtnClick() {
        this.dnsForm.configCode='DNS';
        let params = JSON.stringify(this.dnsForm);
        updateDnsInfoListByServerId(params).then((response => {
          console.log(response)
        }))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .component-section {
    margin-top: 12px;
    width: 100%;
  }

  .component-section1 {
    margin-top: 10px;
    width: 100%
  }

  .component-item {
    float: left;
    font-size: 15px;
    width: 70% !important;
    vertical-align: middle
  }

  .component-label {
    float: left;
    width: 25%;
    font-size: 14px;
    vertical-align: middle
  }
</style>
