<template>
  <div class="container">
    <div style="height: 150px">
      <div class="search-wrap">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="search-section">
              <span class="search-label">IP地址：</span>
              <el-input class="search-item" placeholder="请输入用例ID" v-model="params.ipAddress" clearable
                        @keyup.enter.native="getTableListData">
              </el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="search-section">
              <span class="search-label">描述：</span>
              <el-input class="search-item" placeholder="请输入描述(支持模糊搜索)" v-model="params.info"
                        clearable @keyup.enter.native="getTableListData"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="search-btn">
        <el-button type="primary" @click="getTableListData">查询</el-button>
        <el-button class="bot-btn" @click="saveNServerInfo">添加</el-button>
      </div>
    </div>
    <el-table :data="tableList" border highlight-current-row @row-dblclick="changeDialogFormVisible">
      <el-table-column label="用户名" prop="loginName" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP地址" prop="ipAddress" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.ipAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内存大小" prop="ramNum" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.ramNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CPU数" prop="cpuNum" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.cpuNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="info" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleApplicationInfo">应用管理</el-button>
          <el-button type="info" size="mini" @click="handleServerConfig">应用配置</el-button>
          <el-button type="info" size="mini" @click="checkServiceInfo(scope.row.id)">服务器信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > params.pageSize"
      :total="total"
      :page.sync="params.pageNum"
      :limit.sync="params.pageSize"
      @pagination="getTableListData()"
    />

    <el-dialog title="服务器信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="dialogFormContent" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="dialogFormContent.loginName"></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input v-model="dialogFormContent.ipAddress"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="dialogFormContent.loginPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="CPU数">
          <el-select v-model="dialogFormContent.cpuNum" placeholder="请选择CPU数">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="8" value="8"></el-option>
            <el-option label="12" value="12"></el-option>
            <el-option label="16" value="16"></el-option>
            <el-option label="32" value="32"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存大小">
          <el-select v-model="dialogFormContent.ramNum" placeholder="请选择内存大小">
            <el-option label="2G" value="2"></el-option>
            <el-option label="4G" value="4"></el-option>
            <el-option label="8G" value="8"></el-option>
            <el-option label="12G" value="12"></el-option>
            <el-option label="16G" value="16"></el-option>
            <el-option label="32G" value="32"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="dialogFormContent.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveOrUpdateServerInfoById">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getServerInfoByUid, saveOrUpdateServerInfoById } from '../../api/server'
  import Pagination from '@/components/Pagination/index'
  import storageUtil from '../../utils/storageUtil'

  export default {
    components: { Pagination },
    data() {
      return {
        tableList: [],
        uid: '',
        userInfo: '',
        total: 0,
        params: {
          pageNum: 1,
          pageSize: 10,
          ipAddress: null,
          info: null
        },
        dialogFormVisible: false,
        dialogFormContent: ''
      }
    },
    created() {
      this.getParams()
      this.getTableListData()
    },
    methods: {
      // 获得
      getParams() {
        this.userInfo = storageUtil.readData('userInfo')
      },

      // 根据用户ID，获得服务列表
      getTableListData() {
        let params = this.params
        params.userId = this.userInfo.id
        getServerInfoByUid(params).then(response => {
          console.log(response)
          this.tableList = response.data.records
          this.total = response.data.total
        })
      },
      // 根据服务器ID获得服务器信息【部分信息从服务器上获取】
      checkServiceInfo(serverId) {
        console.log(serverId)
        this.$router.push({
          path: '/server/dashboard'
        })
      },
      changeDialogFormVisible(row, column, event) {
        this.dialogFormVisible = true
        this.dialogFormContent = row
      },
      saveNServerInfo() {
        this.dialogFormContent = {
          'loginName': this.userInfo.username,
          'ipAddress': '',
          'loginPwd': '',
          'cpuNum': '',
          'ramNum': '',
          'info': '',
          'userId': this.userInfo.id
        }
        this.dialogFormVisible = true
      },
      saveOrUpdateServerInfoById() {
        saveOrUpdateServerInfoById(this.dialogFormContent).then(response => {
          if (response.success) {
            this.$message.success(response.data)
          } else {
            this.$message.error(response.errorMessage)
          }
          this.dialogFormVisible = false
          this.getTableListData()
        })
      },
      handleApplicationInfo(){
        this.$router.push({
          path: '/server/applicationList'
        })
      },
      handleServerConfig(){
        this.$router.push({
          path: '/server/serverConfig'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    background: #fff;
    box-shadow: 0 1px 4px 1px rgba(1, 0, 0, 0.2);
    height: 100%;
    padding: 10px;
    margin: 10px;
  }
  .search-btn{
    margin-top: 10px;
  }
</style>
