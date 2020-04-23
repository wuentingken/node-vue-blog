<template>
  <div>
    <h3>发表文章</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 5, maxRows: 7}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>取消</el-button>
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
        request.essayCreate(this.form).then((res)=> {
          if(res.code === 200) {
            this.$message.success(res.msg)
            this.$router.push('home')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
    }
  }
</script>