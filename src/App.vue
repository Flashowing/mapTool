<template>
  <div id="app">
<!--    <router-view />-->
    <el-container>
      <el-header>
        <el-row>
          <el-col :md="6" class="hidden-xs-only">
            <div style="color: white">placeholder</div>
          </el-col>
          <el-col :md="12" :xs="24">
            <Header/>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :md="6">
            <div style="color: white">placeholder</div>
          </el-col>
          <el-col :md="12">
            <div class="map">
              <router-view />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="6" class="hidden-xs-only">
            <div style="color: white">placeholder</div>
          </el-col>
          <el-col :md="12" :xs="24">
            <TransformTable></TransformTable>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/views/Header'
import TransformTable from '@/views/transform/TransformTable'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'App',
  components: {
    Header,
    TransformTable
  },
  data: function () {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<style lang="scss">
//html,
//body {
//  width: 100%;
//  height: 100%;
//  margin: 0;
//  padding: 0;
//  overflow: hidden;
//}
//#app {
//  font-family: 'Avenir', Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  color: #2c3e50;
//  width: 100%;
//  height: 100%;
//}
</style>
