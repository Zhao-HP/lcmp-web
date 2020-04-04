<template>
  <div class="container">
    <el-table :data="tableList" border highlight-current-row>
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
          <el-button type="info" size="mini">应用管理</el-button>
          <el-button type="info" size="mini">应用配置</el-button>
          <el-button type="info" size="mini" @click="checkServiceInfo(scope.row.id)">服务器信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > pageSize"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getServerInfoByUid()"
    />
  </div>
</template>

<script>
import { getServerInfoByUid } from "../../api/server";
import { getUserInfoById } from "../../api/user";
import Pagination from "@/components/Pagination/index";
import storageUtil from "../../utils/storageUtil";
export default {
  components: { Pagination },
  data() {
    return {
      tableList: [],
      uid: "",
      userInfo: "",
      total: 12,
      pageNum: 1,
      pageSize: 10,
      userId:''
    };
  },
  created() {
    this.getParams();
    this.getServerInfoByUid();
  },
  methods: {
    // 获得
    getParams() {
      this.userInfo = storageUtil.readData("userInfo");
    },

    // 根据用户ID，获得服务列表
    getServerInfoByUid() {
      let params = {
        "userId": this.userInfo.id,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      };
      getServerInfoByUid(params).then(response => {
        this.tableList = response.data.records;
      });
    },
    // 根据服务器ID获得服务器信息【部分信息从服务器上获取】
    checkServiceInfo(serverId){
      console.log(serverId)
      this.$router.push({
        path:'/server/dashboard',
      })
    }
  }
};
</script>

<style>
.container {
  background: #fff;
  box-shadow: 0 1px 4px 1px rgba(1, 0, 0, 0.2);
  height: 100%;
  padding: 10px;
  margin: 10px;
}
</style>
