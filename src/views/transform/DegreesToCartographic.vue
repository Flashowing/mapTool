<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <p>Cesium.Cartesian3.fromDegrees (longitude, latitude, height , ellipsoid ,
            result )</p>
          <p>Cesium.Cartographic.fromCartesian(cartesian3);</p>
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
                <el-input class="input" v-model="lon_input" placeholder="请输入经度"></el-input>
              </div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>纬度(latitude):</td>
          <td>
            <el-col :span="6" :xs="24">
              <div class="grid-content bg-purple">
                <el-input class="input" v-model="lat_input" placeholder="请输入纬度"></el-input>
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
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button @click="LatAndLonToCartographic">转换</el-button>
          </td>
        </tr>
      </table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DegreesToCartographic',
  data() {
    return {
      lon_input: '',
      lat_input: '',
      result: '',
      showCopy: false
    }
  },
  methods: {
    LatAndLonToCartographic: function () {
      if (!this.height_input) {
        this.height_input = 0
      }
      if (!this.lon_input || !this.lat_input) {
        this.$message.error('请输入正确的坐标')
        return
      }
      try {
        // eslint-disable-next-line no-undef,new-cap
        const cartesian3 = new Cesium.Cartesian3.fromDegrees(Number(this.lon_input), Number(this.lat_input), Number(this.height_input))
        // eslint-disable-next-line no-undef
        const cartographic3 = Cesium.Cartographic.fromCartesian(cartesian3)
        const lon = cartographic3.longitude
        const lat = cartographic3.latitude
        // eslint-disable-next-line no-unused-vars
        const height = cartographic3.height
        this.result = lon + ',' + lat
        this.showCopy = true
      } catch (e) {
        this.$message.error('请输入正确的坐标')
      }
    },
    onCopy: function () {
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
