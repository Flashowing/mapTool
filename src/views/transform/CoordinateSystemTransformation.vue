<template>
  <div class='container'>
    <el-form :inline='true' ref='form' :label-position='labelPosition' label-width='110px'>
      <el-form-item label='来源坐标'>
        <el-input v-model='form.sourceCoordinate'></el-input>
      </el-form-item>
      <el-form-item label='来源坐标系'>
        <el-radio-group v-model='form.sourceCoordinateSystem'>
          <el-radio label='wgs84'>WGS84坐标系</el-radio>
          <el-radio label='gcj02'>火星坐标系</el-radio>
          <el-radio label='bd09'>百度坐标系</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onTransForm'>转换</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline='true' ref='result' :label-position='labelPosition' label-width='110px'>
      <el-form-item label='WGS84坐标系'>
        <el-input v-model='result.targetWGS84' readonly></el-input>
      </el-form-item>
      <el-form-item label='火星坐标系'>
        <el-input v-model='result.targetGCJ02' readonly></el-input>
      </el-form-item>
      <el-form-item label='百度坐标系'>
        <el-input v-model='result.targetBD02' readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bd09togcj02, gcj02tobd09, gcj02towgs84, wgs84togcj02 } from '@/utils/transformCoordinate'

export default {
  name: 'CoordinateSystemTransformation',
  data: function() {
    let validateSourceCoordinate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.sourceCoordinate !== '') {
          this.$refs.form.validateField('sourceCoordinate')
        }
        callback()
      }
    }
    return {
      labelPosition: 'right',
      form: {
        sourceCoordinate: '',
        sourceCoordinateSystem: 'wgs84'
      },
      result: {
        targetWGS84: '-',
        targetGCJ02: '-',
        targetBD02: '-'
      },
      rules: {
        sourceCoordinate: [
          { validator: validateSourceCoordinate, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    transform: function() {
      var self = this
      var sourceCoordinate = self.form.sourceCoordinate.split(',').map(Number)
      console.log(sourceCoordinate)
      var sourceCoordinateSystem = self.form.sourceCoordinateSystem
      if (sourceCoordinateSystem === 'wgs84') {
        self.result.targetWGS84 = self.form.sourceCoordinate
        let gcj02 = wgs84togcj02(sourceCoordinate[0], sourceCoordinate[1])
        self.result.targetBD02 = gcj02tobd09(gcj02[0], gcj02[1]).join(',')
        self.result.targetGCJ02 = gcj02.join(',')
      } else if (sourceCoordinateSystem === 'gcj02') {
        self.result.targetGCJ02 = self.form.sourceCoordinate
        self.result.targetWGS84 = gcj02towgs84(sourceCoordinate[0], sourceCoordinate[1]).join(',')
        self.result.targetBD02 = gcj02tobd09(sourceCoordinate[0], sourceCoordinate[1]).join(',')
      } else if (sourceCoordinateSystem === 'bd09') {
        self.result.targetBD02 = self.form.sourceCoordinate
        let gcj02 = bd09togcj02(sourceCoordinate[0], sourceCoordinate[1])
        self.result.targetWGS84 = gcj02towgs84(gcj02[0], gcj02[1]).join(',')
        self.result.targetGCJ02 = gcj02.join(',')
      }
    },
    onTransForm: function() {
      this.transform()
    }
  }
}
</script>

<style scoped>
.container {
  /*width: 450px;*/
  height: 100%;
}
</style>
