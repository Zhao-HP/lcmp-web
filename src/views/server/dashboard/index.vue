<template>
  <el-main>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>磁盘使用情况</span>
        </div>
        <div slot-scope="body">
          <el-table :data="daskInfo">
            <el-table-column prop="fileSystem" label="文件系统">
            </el-table-column>
            <el-table-column prop="size" label="大小">
            </el-table-column>
            <el-table-column prop="used" label="已用">
            </el-table-column>
            <el-table-column prop="avail" label="剩余">
            </el-table-column>
            <el-table-column prop="use" label="使用率">
            </el-table-column>
            <el-table-column prop="mountedOn" label="挂载点">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>内存使用情况</span>
        </div>
        <div slot-scope="body">
          <el-table :data="memoryUsageInfo">
            <el-table-column prop="total" label="总数">
            </el-table-column>
            <el-table-column prop="used" label="缓存">
            </el-table-column>
            <el-table-column prop="free" label="未分配">
            </el-table-column>
            <el-table-column prop="shared" label="共享">
            </el-table-column>
            <el-table-column prop="available" label="可用的">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </el-main>
</template>
<script>
  import { getServerUsageInfo } from '../../../api/server'

  export default {
    data() {
      return {
        daskInfo: [],
        serverId: 1,
        memoryUsageInfo: []
      }
    },
    created() {
      this.getServerUsageInfo();
    },
    methods: {
      getServerUsageInfo() {
        getServerUsageInfo({serverId: this.serverId}).then(response => {
          this.daskInfo = response.data.daskInfo;
          this.memoryUsageInfo=[response.data.memoryUsageInfo];
          console.log(this.memoryUsageInfo)
        })
      },
    }
  }
</script>

<style>
  .box-card {
    width: 50%;
    margin-top: 10px;
  }
</style>
