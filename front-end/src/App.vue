<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 50px;
  width: 700px;
}
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #efefef;
}
.head span{
  margin-left: 15px;
}
</style>
