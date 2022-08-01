<template>
  <div>
    <div class="background">
      <img src="../../assets/dlbj.png" width="100%" height="100%" alt="" />
    </div>
    <div class="login-form front">
      <img src="../../assets/logo.png" alt="" class="login-logo" />
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="el-form el-form--label-left"
        auto-complete="on"
        label-position="left"
      >
        <!-- 用户名 -->
        <el-form-item prop="loginName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="loginName"
            v-model="loginForm.loginName"
            placeholder="loginName"
            name="loginName"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <!-- 密码 -->
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
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code" class="form_code">
          <div class="code_left">
            <span class="svg-container avgaaa">
              <i class="el-icon-chat-line-square"></i>
            </span>
            <el-input
              ref="code"
              @focus="changeCode"
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              tabindex="3"
              auto-complete="on"
            />
          </div>
          <div class="code_right" @click="changeCode">
            <img :src="AimG.request.responseURL" alt="" />
          </div>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登陆</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { gitYzm } from "@/api/index";
import { mapGetters } from "vuex";
import Identify from "@/components/yanZM";

export default {
  name: "Login",
  components: {
    Identify,
  },
  data() {
    return {
      loginForm: {
        loginName: "admin",
        password: "admin",
        code: "",
        clientToken: "",
        loginType: 0,
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{4}$/,
            message: "用户验证码必须为数字或字母,只能为4位!",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      identifyCode: "1234",
      identifyCodes: "1234567890asfawefcasd",
      AimG: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["logg"]),
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  // created() {
  //   console.log(1111);
  //   this.handleLogin();
  // },
  methods: {
    // 密码显示隐藏
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登陆按钮
    async handleLogin() {
      try {
        console.log(this.loginForm);
        await this.$refs.loginForm.validate();
        console.log(11);
        this.$store.dispatch("user/getToken", this.loginForm);
      } catch (e) {}
    },
    // 点击验证码刷新
    changeCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      this.gitYzm();
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
      this.loginForm.clientToken = this.identifyCode;
      console.log(this.identifyCode);
    },
    // 请求验证码
    async gitYzm() {
      const res = await gitYzm(this.identifyCode);
      console.log(res);
      this.AimG = res;
    },
  },
  created() {
    this.gitYzm();
  },
};
</script>

<style>
.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
.front {
  z-index: 1;
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
  height: 50px;
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
.el-button--primary {
  width: 100%;
  height: 52px;
  background: linear-gradient(262deg, #2e50e1, #6878f0);
  opacity: 0.91;
  border-radius: 8px;
  color: #fff;
  text-shadow: 0 7px 22px #cfcfcf;
}
.form_code {
  width: 100%;
  height: 52px;
  margin-bottom: 24px;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
.el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.code_left {
  width: 70.8333333333%;
  height: 50px;
}
.code_right {
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
:deep(input) {
  height: 47px;
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 12px 5px 12px 15px;
  color: #999;
  caret-color: #999;
  -webkit-appearance: none;
}
.avgaaa {
  margin-left: 10px;
}
.el-icon-chat-line-square {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  font-size: 16px;
  fill: currentColor;
  overflow: hidden;
}
</style>
