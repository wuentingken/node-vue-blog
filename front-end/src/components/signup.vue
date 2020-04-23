<template>
  <div>
    <h3>注册页</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
            action="http://127.0.0.1:3000/upload/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="form.bio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
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
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
        request.signup(this.form).then(res=> {
          if(res.status === 200) {
            this.$message.success('恭喜宁，注册成功～')
            this.$router.push('/signin')
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleAvatarSuccess(res) {
        console.log(res.data.path)
        this.form.headImg = res.data.path
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>