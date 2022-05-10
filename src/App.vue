<template>
  <div id="app">
<!--    <router-view />-->
<!--  <Main></Main>-->
<!--    <el-container>-->
<!--    </el-container>-->
  </div>
</template>

<script>
// import Main from '@/views/transform/Main'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'App',
  components: {
    // Main
  },
  data: function () {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.sideBar {
  width: 200px;
  height: 100%;
}
</style>
