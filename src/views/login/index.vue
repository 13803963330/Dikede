<template>
  <div>
    <div class="background">
      <img src="../../assets/dlbj.png" width="100%" height="100%" alt="">
    </div>
    <div class="login-form front">
      <img src="../../assets/logo.png" alt="" class="login-logo">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="el-form el-form--label-left" auto-complete="on" label-position="left">

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="code" class="form_code">
          <div class="code_left">
            <el-input
              ref="username"
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              tabindex="3"
              auto-complete="on"
            />
          </div>
          <div class="code_right" @click="changeCode">
            <Identify :identify-code="identifyCode" />
          </div>

        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      </el-form>
    </div>
  </div>

</template>

<script>
import Identify from '@/components/yanZM'
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: {
    Identify
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        Flag: this.loginFlag,
        code: '',
        flag: 2
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      identifyCode: '1234',
      identifyCodes: '1234567890asfawefcasd'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击验证码刷新
    changeCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
      console.log(this.identifyCode)
    }
  }
}
</script>

<style>
.background{
    width:100%;
    height:100%;
    z-index:-1;
    position: absolute;
}
.front{
    z-index:1;
    position: absolute;
}
.login-container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
}
.login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
}
.login-logo {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
}
.el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
}
.svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
.el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
}
input {
    height: 47px;
    background: transparent;
    border: 0 !important;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #999;
    caret-color: #999;
    -webkit-appearance: none;
}
.el-button--primary{
      width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
}
.form_code{
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
}
.el-form-item__content{
      display: flex;
      justify-content: space-between;
}
.code_left{
    width: 70.8333333333%;
}
.code_right{
      width: 29.1666666667%;
}
.show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
 :deep( input) {
    height: 47px;
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #999;
    caret-color: #999;
    -webkit-appearance: none;
}

</style>

