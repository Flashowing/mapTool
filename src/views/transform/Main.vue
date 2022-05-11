<template>
  <div>
    <el-container>
      <el-header>
            <Header/>
      </el-header>
      <el-main>
            <div class="map">
              <CesiumContainer></CesiumContainer>
            </div>
            <TransformTable></TransformTable>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/views/transform/Header'
import TransformTable from '@/views/transform/TransformTable'
import CesiumContainer from '@/views/transform/CesiumContainer.vue'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'Main',
  components: {
    Header,
    TransformTable,
    CesiumContainer
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
