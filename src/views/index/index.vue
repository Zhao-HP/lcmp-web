<template>
  <div class="container">
    <el-header height="80px">
      <el-card></el-card>
    </el-header>
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
      <el-table-column label="更新时间" prop="updateTime" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="info" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="info" size="mini">应用管理</el-button>
        <el-button type="info" size="mini">应用配置</el-button>
        <el-button type="info" size="mini">服务器信息</el-button>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > pageSize"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getServerInfoByUid"
    />
  </div>
</template>

<script>
import { getServerInfoByUid } from "../../api/server";
import { getUserInfoById } from "../../api/user";
export default {
  data() {
    return {
      tableList: [],
      uid: "",
      userInfo: "",
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  created() {
    this.getServerInfoByUid();
  },
  methods: {
    getServerInfoByUid() {
      let params = {
        'userId': this.$route.query.id,
        'pageNum': this.pageNum,
        'pageSize': this.pageSize
    };
      getServerInfoByUid(params).then(response => {
        this.tableList = response.data;
      });
    },
    getUserInfo() {
      (this.uid = this.$route.query.id),
        getUserInfoById({ userId: this.uid }).then(response => {
          this.userInfo = response.data;
          console.log(this.userInfo);
        });
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