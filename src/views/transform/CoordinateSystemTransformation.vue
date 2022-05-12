<template>
  <div class="container">
    <el-form :inline="true" ref="form"  label-width="120px">
      <el-form-item label="来源坐标">
        <el-input v-model="form.sourceCoordinate"></el-input>
      </el-form-item>
      <el-form-item label="来源坐标系">
        <el-radio-group v-model="form.sourceCoordinateSystem">
          <el-radio label="wgs84">WGS84坐标系</el-radio>
          <el-radio label="gcj02">火星坐标系</el-radio>
          <el-radio label="bd09">百度坐标系</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form :inline="true" ref="result"  label-width="120px">
      <el-form-item label="WGS84坐标系">
        <el-input v-model="result.targetWGS84" readonly></el-input>
      </el-form-item>
      <el-form-item label="火星坐标系">
        <el-input v-model="result.targetGCJ02" readonly></el-input>
      </el-form-item>
      <el-form-item label="百度坐标系">
        <el-input v-model="result.targetBD02" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bd09togcj02, gcj02tobd09, gcj02towgs84, wgs84togcj02 } from '@/utils/transformCoordinate'

export default {
  name: 'CoordinateSystemTransformation',
  data: function() {
    return {
      form: {
        sourceCoordinate: '',
        sourceCoordinateSystem: 'wgs84',
      },
      result: {
        targetWGS84: '-',
        targetGCJ02: '-',
        targetBD02: '-',
      },
    }
  },
  methods: {
    transform: function() {
      var self = this;
      var sourceCoordinate = self.form.sourceCoordinate.join(',').map(Number);
      var sourceCoordinateSystem = self.form.sourceCoordinateSystem;
      if (sourceCoordinateSystem === 'wgs84'){
        self.targetGCJ02 = wgs84togcj02(sourceCoordinate[0], sourceCoordinate[1]);
        self.targetBD02 = gcj02tobd09(self.targetGCJ02[0], self.targetGCJ02[1]);
      }else if (sourceCoordinateSystem === 'gcj02') {
        self.targetWGS84 = gcj02towgs84(sourceCoordinate[0], sourceCoordinate[1]);
        self.targetBD02 = gcj02tobd09(sourceCoordinate[0], sourceCoordinate[1]);
      } else if (sourceCoordinateSystem === 'bd09') {
        self.targetGCJ02 = bd09togcj02(sourceCoordinate[0], sourceCoordinate[1]);
        self.targetWGS84 = gcj02towgs84(self.targetGCJ02[0], self.targetGCJ02[1]);
      }

    },
  },
}
</script>

<style scoped>
.container {
  /*width: 450px;*/
  height: 100%;
}
</style>
