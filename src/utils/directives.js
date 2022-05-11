// /utils/directives.js
// npm i clipboard -S

import Vue from 'vue'
import Clipboard from 'clipboard'

Vue.directive('clipboard', {
  bind(el, binding, vnode, oldVnode) {
    const vm = new Vue({
      el: document.createElement('span'),
      data() {
        return {
          content: '复制'
        }
      },
      computed: {
        popperClass: function () {
          const arr = ['popper-fuzhi']
          if (this.content === '复制成功') {
            arr.push('popper-fuzhi-translatex')
          }
          return arr.join(' ')
        }
      },
      methods: {
        handleAfterLeave() {
          this.content = '复制'
        }
      },
      template: `
      <el-popover
        :content="content"
        placement="top"
        trigger="hover"
        :visible-arrow="false"
        :popper-class="popperClass"
        @after-leave="handleAfterLeave"
        :open-delay="200"
        ><i slot="reference" @click.stop.prevent class="el-icon-document-copy icon-fuzhi"></i>
      </el-popover>`
    })
    el.appendChild(vm.$el)
    console.log(vm.$el)
    const clipboard = new Clipboard(vm.$el.querySelector('.icon-fuzhi'), {
      text: function () {
        return el.innerText || ''
      }
    })
    clipboard.on('success', e => {
      vm.content = '复制成功'
    })
    clipboard.on('error', e => {

    })
  }
})
