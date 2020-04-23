<template>
  <div>
    <h3>登录页</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="()=>{this.$router.push('signup')}">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import request from '../request/api'
  export default {
    data() {
      return {
        form: {},
      }
    },
    methods: {
      onSubmit() {
        request.signin(this.form).then((res)=> {
          if(res.code === 200) {
            this.$message.success(res.msg)
            window.localStorage.setItem('token', res.token)
            this.$router.push('home')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
    }
  }
</script>