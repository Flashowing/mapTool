<template>
  <div class='outer-wrap'>
    <el-container>
      <el-header>业绩指标分值计算</el-header>
      <el-main>
        <el-form ref='form' :model='form' label-width='100px'>
          <el-form-item label='月度业绩指标' prop='yuedu' :rules="[{ type: 'number', message: '必须为数字值'}]">
            <el-input style='width:250px;' v-model.number='form.yuedu' type='tel'></el-input>
          </el-form-item>
          <el-form-item label='能力指标' prop='nengli' :rules="[{ type: 'number', message: '必须为数字值'}]">
            <el-input style='width:250px;' v-model.number='form.nengli' type='tel'></el-input>
          </el-form-item>
          <el-form-item label='态度指标' prop='taidu' :rules="[{ type: 'number', message: '必须为数字值'}]">
            <el-input style='width:250px;' v-model.number='form.taidu' type='tel'></el-input>
          </el-form-item>
          <el-form-item label='当月周数'>
            <el-input-number style='width:250px;' v-model='form.week' @change='handleChange' :min='1' :max='10'
                             label='周'></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' plain @click="countScore('form')">计算</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'countScore',
  data: function() {
    return {
      form: {
        yuedu: '',
        nengli: '',
        taidu: '',
        week: 4,
        result: ''
      }
    }
  },
  methods: {
    countFour: function() {
      const yueduRes = 6 * 0.4 * (this.form.yuedu / (10 * 4))
      const nengliRes = 6 * 0.4 * (this.form.nengli / (10 * 5))
      const taiduRes = 6 * 0.2 * (this.form.taidu / (10 * 4))
      this.form.result = yueduRes + nengliRes + taiduRes
    },
    countFive: function() {
      const yueduRes = 6 * 0.4 * (this.form.yuedu / (10 * 5))
      const nengliRes = 6 * 0.4 * (this.form.nengli / (10 * 5))
      const taiduRes = 6 * 0.2 * (this.form.taidu / (10 * 4))
      this.form.result = yueduRes + nengliRes + taiduRes
    },
    handleChange(value) {
      //  console.log(value);
    },
    countScore(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const yueduRes = 6 * 0.4 * (this.form.yuedu / (10 * this.form.week))
          const nengliRes = 6 * 0.4 * (this.form.nengli / (10 * 5))
          const taiduRes = 6 * 0.2 * (this.form.taidu / (10 * 4))
          this.form.result = Number(yueduRes + nengliRes + taiduRes).toFixed(2)
          this.$alert(this.form.result, '结果', {
            confirmButtonText: '确定'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset() {
      this.form.week = 4
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0
}

.el-main {
  box-shadow: 0px 0px 8px 0px #9e9e9e;
  border-radius: 5px;
  background-color: #fffefc;
  text-align: left;
}

.outer-wrap {
  width: 400px;
  margin: 0 auto;
  height: 100%;
  position: relative;
}

.el-container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -210px;
  margin-left: -200px;
}
</style>
