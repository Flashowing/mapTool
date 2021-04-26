<template>
  <div>
    <el-row>
      <table id="table-f4">
        <tr>
          <td>度分秒:</td>
          <td>
            <el-col :xs="24">
              <div class="grid-content bg-purple">
                <el-input class="input" v-model="degrees" placeholder="106"></el-input>
                °
                <el-input class="input" v-model="minute" placeholder="34"></el-input>
                ′
                <el-input class="input" v-model="second" placeholder="20.48"></el-input>
                ″
              </div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>经纬度:</td>
          <td>
            <el-col :xs="24">
              <div class="grid-content bg-purple">
                <el-input class="input2" v-model="lonAndLat" placeholder="请输入经纬度"></el-input>
<!--                <el-link id="copy-f3" class="copy-f3" v-clipboard:copy="lonAndLat" v-clipboard:success="onCopy"-->
<!--                         v-clipboard:error="onError" v-show="showCopy" :underline="false" type="primary"-->
<!--                         icon="el-icon-document-copy">复制-->
<!--                </el-link>-->
              </div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-button @click="transformCoord">转换</el-button>

            <el-button @click="switchLocation">交换位置</el-button>

            <el-button @click="clearInput">清空</el-button>
          </td>
        </tr>
      </table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TransDuFenMiao',
  data() {
    return {
      degrees: '',
      minute: '',
      second: '',
      lonAndLat: '',
      status: 'D2L',
      showCopy: false
    }
  },
  methods: {
    transformCoord: function () {
      // eslint-disable-next-line eqeqeq
      if (this.status == 'D2L') {
        if (!this.degrees || !this.minute || !this.second) {
          this.$message.error('请输入正确的坐标')
          return
        }
        const degree = Number(this.degrees)
        const minute = Number(this.minute)
        const second = Number(this.second)
        const result = degree + (minute / 60) + (second / 3600)
        this.lonAndLat = result
        this.showCopy = true
      } else {
        this.lonAndLat += ''
        console.log(this.lonAndLat)
        if (!this.lonAndLat) {
          this.$message.error('请输入正确的坐标')
          return
        }
        try {
          if (this.lonAndLat.split('.').length > 2) {
            this.$message.error('请输入正确的坐标')
            return
          }
          const patt = /^(-|\+)?\d+(\.\d+)?$/g // 匹配正数、负数、和小数
          if (!patt.test(this.lonAndLat)) {
            this.$message.error('请输入正确的坐标')
            return
          }
          let degree2 = this.lonAndLat.split('.')[0]
          let minuteAndSecond = this.lonAndLat.split('.')[1]
          degree2 = Number(degree2)
          minuteAndSecond = Number('0.' + minuteAndSecond)
          const minute2 = ((minuteAndSecond * 60) + '').split('.')[0]
          let secondTemp = ((minuteAndSecond * 60) + '').split('.')[1]
          secondTemp = Number('0.' + secondTemp)
          let second2 = secondTemp * 60
          second2 = Number(second2.toFixed(2))
          this.degrees = degree2
          this.minute = minute2
          this.second = second2
        } catch (e) {
          this.$message.error('请输入正确的坐标')
        }
      }
    },
    switchLocation: function () {
      this.showCopy = false
      const table = document.getElementById('table-f4')
      const childNodes = table.childNodes
      var tr = childNodes[0]
      var btn = childNodes[2]
      table.appendChild(tr)
      table.appendChild(btn)
      console.log(this.lonAndLat)
      if (this.status === 'D2L') {
        this.status = 'L2D'
      } else {
        this.status = 'D2L'
      }
    },
    clearInput: function () {
      this.degrees = ''
      this.minute = ''
      this.second = ''
      this.lonAndLat = ''
      this.showCopy = false
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
  width: 120px;
}

.input2 {
  width: 200px;
}
</style>
