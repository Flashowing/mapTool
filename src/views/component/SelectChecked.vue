<template>
  <div class='select-checked'>
    <!-- 下拉加多选框 -->
    <el-select
      :placeholder='placeholder'
      v-model='value'
      multiple
      :popper-append-to-body='false'
      @remove-tag='removeTag'
    >
      <el-option
        v-for='item in options'
        :key='item.value'
        :label='item.label'
        :value='item.value'
      >
        <el-checkbox v-model='item.check' @change='isChecked(item)'>
          {{ item.label }}
        </el-checkbox>
      </el-option>
    </el-select>
    <!--    {{ value }}-->
  </div>
</template>

<script>
export default {
  name: 'SelectChecked',
  components: {},
  props: {
    options: {
      type: Array
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      value: [],
    }
  },
  methods: {
    // 多选框触发
    isChecked(item) {
      if (item.check && this.value.indexOf(item.value) == -1) {
        this.value.push(item.value)
      } else if (!item.check) {
        this.value.forEach((elm, idx) => {
          if (elm == item.value) {
            this.value.splice(idx, 1)
          }
        })
      }
      // this.$emit('selectedVal', this.value)
      this.$emit('selectedVal', item)
    },
    // 多选模式下移除tag时触发
    removeTag(value) {
      let item;
      this.options.forEach((elm, idx) => {
        if (elm.value == value) {
        item = elm;
          elm.check = false
        }
      })
      // this.$emit('selectedVal', this.value)
      this.$emit('selectedVal', item)
    }
  }
}
</script>

<style lang='scss'>
.select-checked {
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    content: '';
  }

  .el-checkbox {
    width: 100%;
    padding: 0 30px;

    .el-checkbox__label {
      margin-left: 20px;
    }
  }

  .el-select-dropdown__item {
    padding: 0;
  }
}
</style>
