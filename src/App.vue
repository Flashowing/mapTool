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
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/*包含以下五种的链接*/
a {
  text-decoration: none;
  color: #000;
}

/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
  color: #000;
}

/*已经访问过的链接*/
a:visited {
  text-decoration: none;
  color: #000;
}

/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
  color: #000;
}

/* 正在点击的链接，鼠标在元素上按下还没有松开*/
a:active {
  text-decoration: none;
  color: #000;
}

/* 获得焦点的时候 鼠标松开时显示的颜色*/
a:focus {
  text-decoration: none;
  color: #000;
}

</style>
