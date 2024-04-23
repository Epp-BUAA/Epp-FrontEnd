<template>
    <!-- <el-menu
      class="navbar"
      mode="horizontal"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/search">搜索</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/user/profile">个人中心</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/about">关于我们</router-link>
      </el-menu-item>
    </el-menu> -->
    <el-menu class="navbar has-shadow" role="navigation" aria-label="">
        <div class=" container">
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

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/search" class="navbar-item">文献调研</router-link>
                    <router-link to="" class="navbar-item">论文上传</router-link>
                    <router-link to="" class="navbar-item">关于我们</router-link>
                    <router-link to="" class="navbar-item">个人中心</router-link>
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
