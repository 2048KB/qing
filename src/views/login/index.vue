<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title"></h3>
      <el-form-item prop="name">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="name" type="text" v-model="loginForm.name" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="请输入密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <p class="loginError" v-if="loginError">{{loginError}}</p>
      <el-form-item>
        <el-button type="primary" style="width:100%; font-size: 18px;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validateRequired} from '../validate.js'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [{ name: '用户名', required: true, trigger: 'blur', validator: validateRequired }],
        password: [{ name: '密码', minlength: 6, required: true, trigger: 'blur', validator: validateRequired }]
      },
      loading: false,
      pwdType: 'password',
      loginError: null
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$API.login({
            data: this.loginForm
          })
            .then((res) => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch((err) => {
              this.loading = false
              this.loginError = err && err.msg || null
            })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../styles/vars.scss';
$bg:#f8f8f8;
$light_gray:#2d3a4b;
$dark_gray:#889aa4;

/* reset element-ui css */
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
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
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #e5e5e5 inset !important;
        -webkit-text-fill-color: $light_gray!important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background-color: white;
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
    &_login {
      font-size: 20px;
    }
  }
  .title {
    height: 56px;
    background-image: url('./images/qq-1.png');
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
  .loginError {
    margin: 0;
    padding-left: 4px;
    font-size: 12px;
    color: $c1;
  }
}
</style>

