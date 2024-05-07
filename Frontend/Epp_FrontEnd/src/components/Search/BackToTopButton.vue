<template>
    <div>
      <!-- 你的页面内容 -->

      <!-- “回到顶部”按钮 -->
      <el-button
        v-show="showTop"
        @click="scrollToTop"
      >
        回到顶部
      </el-button>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      // 控制按钮显示的变量
      showTop: false
    }
  },
  methods: {
    scrollToTop () {
      // 使用window.scrollTo平滑滚动到页面顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  created () {
    // 监听scroll事件，以确定是否显示“回到顶部”按钮
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    // 组件销毁时移除事件监听
    window.removeEventListener('scroll', this.handleScroll)
  },
  handleScroll () {
    // 当页面滚动到一定高度时显示按钮
    this.showTop = window.pageYOffset > 100
  }
}
</script>

  <style>
  /* 你的CSS样式 */
  </style>
