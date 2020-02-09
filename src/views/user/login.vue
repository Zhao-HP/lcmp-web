<template>
  <el-form :model="userInfo"
           :rules="rules"
           ref="userInfo"
           label-position="left"
           label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">
      系统登录
    </h3>
    <el-form-item prop="account">
      <el-input type="text"
                v-model="userInfo.account"
                auto-complete="off"
                placeholder="账号">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password"
                v-model="userInfo.password"
                auto-complete="off"
                placeholder="密码">
      </el-input>
    </el-form-item>
    <el-checkbox v-model="checked"
                 checked
                 class="remember">
        记住密码
    </el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary"
                 style="width:100%;"
                 @click="login"
                 :loading="logining">
          登录
        </el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {getUserInfo} from "../../api/user";
  import axios from 'axios';

export default {
  data() {
    return {
      logining: false,
      userInfo: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      checked: true
    };
  },
  methods:{
    login(){
      getUserInfo({'account':this.userInfo.account}).then(response=>{
        if(response.data===null){
          this.$message({
            message: '账号不存在，请重新输入！！！',
            type: 'error'
          });
        }else{
          if(response.data.password===this.userInfo.password){
            this.$message({
              message: '登录成功，即将跳转~',
              type:'success'
            })
          }else{
            this.userInfo.account = response.data.account;
            this.$message({
              message: '密码错误，请重新输入！！！',
              type:'error'
            })
          }
        }
      })
    }
  }
  
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>