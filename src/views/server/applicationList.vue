<template>
  <el-main>
    <el-tabs v-model="activeName" @tab-click="getApplicationList">
      <el-tab-pane label="全部应用" name="all">
        <application-table :table-data="tableData" :type="activeName" v-loading="loading"></application-table>
      </el-tab-pane>
      <el-tab-pane label="可更新" name="update">
        <application-table :table-data="tableData" :type="activeName" v-loading="loading"></application-table>
      </el-tab-pane>
      <el-tab-pane label="已安装" name="installed">
        <application-table :table-data="tableData" :type="activeName" v-loading="loading"></application-table>
      </el-tab-pane>
    </el-tabs>
    <pagination
      v-show="total > pageSize"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getApplicationList()"
    />
  </el-main>
</template>

<script>
  import applicationTable from './components/application-table'
  import Pagination from '@/components/Pagination/index'
  import { getApplicationList } from '../../api/server'

  export default {
    name: 'applicationList',
    components: {
      applicationTable,
      Pagination
    },
    data() {
      return {
        activeName: 'all',
        tableData: [],
        loading: false,
        total: 0,
        pageNum: 1,
        pageSize: 100,
      }
    },
    created() {
      this.getApplicationList()
    },
    methods: {
      getApplicationList() {
        this.loading = true;
        let params = {
          'status': this.activeName,
          'pageNum': this.pageNum,
          'pageSize': this.pageSize
        }
        getApplicationList( params).then(response => {
          // console.log(response)
          this.tableData = response.data.records;
          this.total = response.data.total;
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
