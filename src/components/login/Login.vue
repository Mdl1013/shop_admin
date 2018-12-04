 <!--
    el-form 表格组件（父组件）
      :model 表单数据对象
      :rules 表单验证规则
      label-width 表单域标签的宽度，也就是每个表单项名字的宽度

    el-form-item 表格的每一项（也就是表格中的每一行）
      label 标签文本
      prop 表单域 model 字段，在使用 validate（表单校验）、 resetFields（重置表单） 方法的情况下，该属性是必填的

    el-input 文本框组件
   -->

  <!--
    组件或普通HTML标签，可以添加 ref 属性，添加后，Vue会把这些属性收集到 $refs 对象中
    如果 ref 是在组件中添加的，那么 $refs 中对应的值就表示：当前组件
    如果 ref 是在HTML标签中添加的，那么 $refs 中对应的值就表示：该DOM对象
-->
<template>
  <el-row type='flex' justify='center' align='middle' class="login">
    <el-col :span="8" class="login-form" >
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return false;
        }
        // 验证成功：登录的代码逻辑
        axios
          .post("http://localhost:8888/api/private/v1/login", this.loginForm)
          .then(res => {
            console.log(res);
            if (res.data.meta.status === 200) {
              // 登陆成功：
              // 3 将登录标识 token 存储到 localStorage 中
              // 注意：先保存 token ，再跳转路由，因为 跳转路由的时候，导航守卫中获取了 token。如果在获取token前，没有存储 token ，就出问题了
              localStorage.setItem("token", res.data.data.token);
              // 1 跳转到首页
              this.$router.push("/home");
              // 2 登录成功的消息提示：
              this.$message({
                message: res.data.meta.msg,
                type: "success",
                duration: 1000
              });
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: "error",
                duration: 1000
              });
            }
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-form {  
    padding: 20px;
    border-radius: 15px;
    margin: 200px auto;
    background-color: #fff;

}
</style>
