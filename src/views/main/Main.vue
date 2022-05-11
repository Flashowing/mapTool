<template>
    <el-container>
      <el-header class='header'>
        <Header></Header>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
</template>

<script>
import Header from '@/views/main/Header'
export default {
  name: 'Main',
  components: {
    Header
  }
}
</script>

<style scoped>
.el-main {
  width: 1140px;
  margin: 0 auto;
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
}

@media (max-width: 1140px) {
  .el-main {
    width: 100%;
  }
}

.header {
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 60px;
  z-index: 100;
  position: relative;
}

.el-container {
  height: 100%;
}
</style>
