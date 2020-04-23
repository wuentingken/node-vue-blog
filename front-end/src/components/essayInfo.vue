<template>
  <div>
    <div class="head">
      <h3>主页</h3>
      <div><span>登录</span><span>注册</span></div>
      <div style="display: none;"><span>个人主页</span><span>发表文章</span><span>登出</span></div>
    </div>
    <el-row :gutter="20" style="margin: 20px 0;">
      <el-col :span="4">
        <div class="headimg"><img :src="essay.headImg"/></div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="name">{{essay.name}}</div>
          <div class="text">{{essay.content}}</div>
          <div class="flex">
            <div class="time">{{timeExchange(essay.createTime)}}</div>
            <div class="look">浏览（{{essay.visit}}） 留言（{{commentList.length}}）</div>
          </div>
        </div>
        <div class="content" style="margin-top: 15px;">
          <div class="head">
            <h4>留言</h4>
          </div>
          <el-row :gutter="20" style="margin: 20px 0;" v-for="item in commentList" :key="item._id">
            <el-col :span="4">
              <div class="headimg"><img :src="item.headImg"/>
              </div>
            </el-col>
            <el-col :span="20">
              <div style="display: flex;align-items: center">
                <div class="name" style="margin-right: 15px;">{{item.name}}</div>
                <div class="time" style="font-size: 13px;">{{timeExchange(item.createTime)}}</div>
              </div>
              <div class="wordtext">{{item.comment}}</div>
              <div v-if="item.isDelete" style="text-decoration: underline;color: #999;font-size: 13px;cursor: pointer;" @click="onDelete(item._id)">删除</div>
            </el-col>
          </el-row>
          <el-input type="textarea" v-model="form.comment" :autosize="{ minRows: 5, maxRows: 7}" style="margin: 10px 0;"></el-input>
          <el-button type="primary" @click="onSubmit">发布</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '../request/api'
  import {timeExchange} from "../utils";
  export default {
    data() {
      return {
        form: {},
        commentList: [],
        timeExchange,
        essay: {}
      }
    },
    mounted() {
      this.initessay()
      this.initComment()
    },
    methods: {
      initessay() {
        request.essay({essayId: this.$route.query.id}).then((res)=> {
          if(res.code === 200) {
            this.essay = res.data
          }
        })
      },
      initComment() {
        request.commentList({essayId: this.$route.query.id}).then((res)=> {
          if(res.code === 200) {
            this.commentList = res.data.list
          }
        })
      },
      onSubmit() {
        this.form.essayId = this.$route.query.id
        request.comment(this.form).then((res)=> {
          if(res.code === 200) {
            this.$message.success(res.msg)
            this.form.comment = ''
            this.initComment()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      onDelete(id) {
        request.commentRemove({commentId: id}).then((res)=> {
          if(res.code === 200) {
            this.$message.success(res.msg)
            this.initComment()
          }
        })
      }
    }
  }
</script>
<style>
  img {
    width: 100%;
  }

  .headimg {
    width: 60px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .name {
    color: seagreen;
    font-weight: 600;
    font-size: 18px;
  }

  .content {
    border: 1px solid #efefef;
    padding: 15px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .text {
    margin: 15px 0;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
  }
</style>