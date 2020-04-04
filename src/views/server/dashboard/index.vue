<template>
  <div class="bar" id="bar">
   {{ daskInfo }}

  </div>

</template>
<script>
import {getDiskInfo} from "../../../api/server";


export default {
  data(){
    return{
      daskInfo:''
    }
  },
  created() {
    this.getDiskInfo()
  },
  methods:{
    getDiskInfo() {
      let param = {
        'serverId':1
      };
      getDiskInfo(param).then(response=>{
        console.log(response)
        this.daskInfo = response.data;
      });
    }
  }
}
</script>

<style>
</style>
