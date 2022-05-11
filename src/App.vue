<template>
  <div id='app'>
    <!--    <router-view />-->
      <Main></Main>
  </div>
</template>

<script>
import Main from '@/views/main/Main'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang='scss'>
html,
body,
#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

</style>
