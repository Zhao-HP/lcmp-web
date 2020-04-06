<template>
    <el-main>
      <el-table :data="tableData">
        <el-table-column label="应用名称" prop="applicationName">
        </el-table-column>
        <el-table-column label="版本" prop="version">
        </el-table-column>
        <el-table-column label="其他" prop="other">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" round @click="installApplication(scope.row.applicationName)">安装</el-button>
            <el-button type="primary" round @click="updateApplication(scope.row.applicationName)">更新</el-button>
            <el-button type="primary" round @click="removeApplication(scope.row.applicationName)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
</template>

<script>
  import { installedApplication, removeApplication, updateApplication } from '../../../api/server'

  export default {
    name: 'application-list',
    props:{
      tableData:{
        type: Array,
        default: []
      },
      type:{
        type: '',
        default: 'all'
      }
    },
    methods:{
      installApplication(packageName){
        installedApplication({'packageName':packageName}).then(response=>{
          if (response.success){
            this.$message.success(response.data)
          }else{
            this.$message.error(response.errorMessage);
          }
        })
      },
      updateApplication(packageName){
        updateApplication({'packageName':packageName}).then(response=>{
          if (response.success){
            this.$message.success(response.data)
          }else{
            this.$message.error(response.errorMessage);
          }
        })
      },
      removeApplication(packageName){
        removeApplication({'packageName':packageName}).then(response=>{
          if (response.success){
            this.$message.success(response.data)
          }else{
            this.$message.error(response.errorMessage);
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
