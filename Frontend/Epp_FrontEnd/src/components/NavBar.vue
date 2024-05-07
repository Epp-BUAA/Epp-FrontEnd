<template>
  <el-menu class="navbar has-shadow" role="navigation" aria-label="" style="position: fixed; width: 100%;">
    <div class="container">
      <div class="navbar-brand">
        <a href="" class="navbar-item">
          <span style="margin-left: 10px">Epp</span>
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
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
  name: 'NavBar'
}
</script>

<style scoped>
@import "../../static/css/bulma.css";
</style>
