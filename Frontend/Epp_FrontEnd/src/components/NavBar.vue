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
          <router-link to="/search" class="navbar-item" :class="{ 'selected-tab': selectedTab === 'search'}" @click.native="selectTab('search', $event)">文献调研</router-link>
          <router-link to="/upload" class="navbar-item" :class="{ 'selected-tab': selectedTab === 'upload'}" @click.native="selectTab('upload', $event)">全文解读</router-link>
          <router-link to="/personal" class="navbar-item" :class="{ 'selected-tab': selectedTab === 'personal'}" @click.native="selectTab('personal', $event)">个人中心</router-link>
          <router-link to="/aboutus" class="navbar-item" :class="{ 'selected-tab': selectedTab === 'aboutus'}" @click.native="selectTab('aboutus', $event)">关于我们</router-link>
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
      isTop: true,
      selectedTab: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.path.includes('/search')) {
        this.selectedTab = 'search'
      } else if (to.path.includes('/upload')) {
        this.selectedTab = 'upload'
      } else if (to.path.includes('/personal')) {
        this.selectedTab = 'personal'
      } else if (to.path.includes('/aboutus')) {
        this.selectedTab = 'aboutus'
      } else {
        this.selectedTab = ''
      }
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
    },
    selectTab (tabName, event) {
      this.selectedTab = tabName
      event.target.blur()
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
  margin-top: 2px;
  background-color: transparent; /* 设置背景颜色 */
  transition: box-shadow 0.3s, transform 0.3s, color 0.3s, font-size 0.3s; /* 添加过渡效果 */
  border-radius: 12px;
  text-decoration: none;
}
.navbar-item:hover {
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  position: relative;
  z-index: 1;
}
.selected-tab {
  color: #485fc7;
  font-size: 20px;
}
</style>
