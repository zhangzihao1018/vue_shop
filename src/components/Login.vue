<template>
  <div class="login-container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="logo_avater">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form :model="loginForm" class="login_form" :rules="loginFormRules" ref="loginFormRef">
        <!-- 登录账号 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 登录 重置按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { log } from "util";
import { allResolved } from "q";
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //重置
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    //验证登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data:res } = await this.$http.post("login", this.loginForm);
        console.log(res);
        
        if (res.meta.status != 200) return this.$message.error('用户名或者密码错误');
        this.$message.success('登陆成功');

        window.sessionStorage.setItem('token',res.data.token)
        this.$router.push('/home')
      });
    }
  }
};
</script>
<style lang="less" scope>
.login-container {
  background: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .logo_avater {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      padding: 10px;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .login_form {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btn {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>