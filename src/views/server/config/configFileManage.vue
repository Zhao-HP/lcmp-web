<template>
  <el-main>
  </el-main>
</template>

<script>
  import getConfigFileListByPage from '../../../api/config'
  export default {
    name: 'config-file-manage',
    data(){
      return{
        tableList:[],
        pageNum:1,
        pageSize:10,
      }
    },
    created() {
      this.getMigratingConfig();
    },
    methods:{
      getConfigFileListByPage(){
        getConfigFileListByPage({pageNum:this.pageNum, pageSize:this.pageSize}).then(response=>{
          console.log(response)
        })
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
