<template>
  <div class="searchPage">
    <el-row style="margin-top: 30px;">
      <el-col :span="20" :offset="2">
        <search-input />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
export default {
  components: {
    'search-input': SearchInput
  }
}
</script>

<style scoped>
.searchPage {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  padding-top: 50px;
  min-height: 100vh;
  background-image: url('../../assets/dashboardBack2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.el-row {
  width: 100%;
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
