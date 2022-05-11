<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <p>let lon = Cesium.Math.toDegrees(cartographic.longitude)</p>
          <p>let lat = Cesium.Math.toDegrees(cartographic.latitude)</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <table>
        <tr>
          <td>经度(longitude):</td>
          <td>
            <el-col :span="6" :xs="24">
              <div class="grid-content bg-purple">
                <el-input class="input" v-model="carto_lon" placeholder="Cartographic.longitude"></el-input>
              </div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>纬度(latitude):</td>
          <td>
            <el-col :span="6" :xs="24">
              <div class="grid-content bg-purple">
                <el-input class="input" v-model="carto_lat" placeholder="Cartographic.latitude"></el-input>
              </div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td colspan="2">{{ result }}</td>
          <td>
<!--            <el-link id="copy-f3" class="copy-f3" v-clipboard:copy="result" v-clipboard:success="onCopy"-->
<!--                     v-clipboard:error="onError" v-show="showCopy" :underline="false" type="primary"-->
<!--                     icon="el-icon-document-copy">复制-->
<!--            </el-link>-->
            <el-link @click='onCopy' v-show='showCopy' type='primary'
                     icon='el-icon-document-copy'>复制
            </el-link>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button @click="Cartesian3ToDegrees">转换</el-button>
          </td>
        </tr>
      </table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CartographicToDegrees',
  data() {
    return {
      carto_lon: '',
      carto_lat: '',
      result: '',
      showCopy: false
    }
  },
  methods: {
    Cartesian3ToDegrees: function () {
      if (!this.carto_lon || !this.carto_lat) {
        this.$message.error('请输入正确的坐标')
        return
      }
      try {
        const cLon = Number(this.carto_lon)
        const cLat = Number(this.carto_lat)
        const cartographic = new Cesium.Cartographic(cLon, cLat, 0)
        const lon = Cesium.Math.toDegrees(cartographic.longitude)
        const lat = Cesium.Math.toDegrees(cartographic.latitude)
        this.result = lon + ',' + lat
        this.showCopy = true
      } catch (e) {
        // console.log(e);
        this.$message.error('请输入正确的坐标')
      }
    },
    onCopy: function () {
      this.$clipboard(this.result)
      this.$message.success('复制成功')
    },
    onError: function () {
      this.$message.error('复制失败')
    }
  }
}
</script>

<style scoped>
.input {
  width: 200px;
}
</style>
