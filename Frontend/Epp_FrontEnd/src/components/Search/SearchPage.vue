<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-header style="font-size: 40px; line-height: 60px; margin-top: 100px">文献调研</el-header>
      </el-col>
    </el-row>
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

</style>
