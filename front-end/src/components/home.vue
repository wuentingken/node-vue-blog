<template>
  <div>
    <div class="head">
      <h3>主页</h3>
      <div><span>登录</span><span>注册</span></div>
      <div style="display: none;"><span>个人主页</span><span>发表文章</span><span>登出</span></div>
    </div>
    <el-row v-for="(item, index) in list" :key="index" :gutter="20"  style="margin: 20px 0;">
      <el-col :span="4">
        <div class="headimg"><img :src="item.headImg"/></div>
      </el-col>
      <el-col :span="20">
        <div class="content" @click="goInfo(item._id)">
          <div class="name">{{item.name}}</div>
          <div class="text">{{item.content}}</div>
          <div class="flex">
            <div class="time">{{timeExchange(item.createTime)}}</div>
            <div class="look">浏览（{{item.visit}}） 留言（2）</div>
          </div>
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
        list: {},
        timeExchange,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        request.essayList(1).then((res)=> {
          if(res.code === 200) {
            this.list = res.data.list
          }
        })
      },
      goInfo(id) {
        this.$router.push({ path: 'essayInfo', query: { id: id }})
      }
    }
  }
</script>
<style>
  img{
    width: 100%;
  }
  .headimg{
    width: 60px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .name{
    color: seagreen;
    font-weight: 600;
    font-size: 18px;
  }
  .content{
    border: 1px solid #efefef;
    padding: 15px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .text{
    margin: 15px 0;
  }
  .flex{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
  }
</style>