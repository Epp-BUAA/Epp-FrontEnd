<template>
  <el-menu class="navbar has-shadow" :class="{ 'trans-menu': isTop }" role="navigation" aria-label="" style="position: fixed; width: 100%; top: 0;">
    <div class="container">
      <div class="navbar-brand">
        <a href="" class="navbar-item">
          <img src="../../static/favicon.png" alt="Epp" width="30" height="30">
          <span style="margin-left: 10px">EPP</span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/search" class="navbar-item">文献调研</router-link>
          <router-link to="/upload" class="navbar-item">论文上传</router-link>
          <router-link to="/aboutus" class="navbar-item">关于我们</router-link>
          <router-link to="/personal" class="navbar-item">个人中心</router-link>
        </div>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      isTop: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.isTop = window.scrollY === 0
    }
  }
}
</script>

<style scoped>
@import "../../static/css/bulma.css";
.trans-menu {
  background-color: transparent !important;
  box-shadow: none !important;
}
.navbar-item {
  /* 正常状态下的样式 */
  background-color: transparent; /* 设置背景颜色 */
  transition: background-color 0.3s; /* 添加过渡效果 */
}
</style>
