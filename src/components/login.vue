<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/touxiang.jpg"></img>
      </div>

      <!-- 登录表单区域 -->
      <el-form label-width="0px" :rules="loginFormRules" :model="loginForm" class="login_form" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" placeholder="密码"
                    type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="bts">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        //  登录表单数据对象
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        //  登录表单验证规则
        loginFormRules: {
          //  用户名验证规则
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          //  密码验证规则
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      //  重置表单数据和验证
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },
      //  用户登录
      login() {
        //  1.表单验证
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return

          //  2.发起请求,获取对象返回data数据
          const {data: result} = await this.$http.post("login", this.loginForm)
          console.log(result);

          //  3.判单登录是否成功
          if (result.meta.status != 200) return this.$message.error("用户名或密码错误!")
          this.$message.success("登录成功!")

          //  4.保存服务端发来的token
          window.sessionStorage.setItem("token", result.data.token)

          //  5.跳转页面
          await this.$router.replace("/home")

        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;

      }
    }

    .bts {
      display: flex;
      justify-content: flex-end;
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

  }
</style>