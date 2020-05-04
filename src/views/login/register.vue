<template>

  <div class="register-container">
    <el-form name="registerForm" ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form"
             auto-complete="on" label-position="left" hide-required-asterisk>
      <div class="title-container">
        <h3 class="title">注册用户</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="confirmPasswordType"
          ref="confirmPassword"
          v-model="registerForm.confirmPassword"
          :type="confirmPasswordType"
          placeholder="请输入密码"
          name="confirmPassword"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showConfirmPwd">
          <svg-icon :icon-class="confirmPasswordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="mail"/>
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="请输入邮箱"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleRegister">注册
      </el-button>

    </el-form>
  </div>

</template>

<script>
  import { validUsername } from '../../utils/validate'
  import storageUtil from '../../utils/storageUtil'
  import { userRegister } from '../../api/user'

  export default {
    name: 'register',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'))
        } else {
          if (value.length < 8 || value.length > 18) {
            callback(new Error('长度在8~18位字符之间'))
          } else {
            if (this.registerForm.password !== this.registerForm.confirmPassword) {
              callback(new Error('两次输入的密码不一致，请重新输入'))
            }
          }
        }
        callback()
      }
      return {
        registerForm: {
          username: '',
          password: '',
          confirmPassword: '',
          email: ''

        },
        registerRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在6~15位字符之间', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 18, message: '长度在8~18位字符之间', trigger: 'blur' }
          ],
          confirmPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        },
        loading: false,
        passwordType: 'password',
        confirmPasswordType: 'password',
        redirect: undefined
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      showConfirmPwd() {
        if (this.confirmPasswordType === 'password') {
          this.confirmPasswordType = ''
        } else {
          this.confirmPasswordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.confirmPassword.focus
        })
      },
      userRegister() {
        let params = {
          'username': this.registerForm.username,
          'password': this.registerForm.password,
          'email': this.registerForm.email
        }
        userRegister(params).then(response => {
          console.log(response)
          if (response.success) {
            this.$message({
              message: response.data,
              type: 'success'
            })
            this.$router.push('/login')
          } else {
            this.$message({
              message: response.errorMessage,
              type: 'error'
            })
          }
        })
      },
      handleRegister() {
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            this.userRegister()
          } else {
            alert('输入的用户信息不正确，请重新输入')
          }
        })
      }
    }
  }
</script>


<style lang="scss">

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .register-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
