<template>
  <div>
    <el-row style="margin-top: 60px;">
      <el-col :span="24">
        <el-header style="font-size: 40px; line-height: 60px;">文献调研</el-header>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-col :span="20" :offset="2">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.text" placeholder="请输入搜索内容">
              <template #append>
                <el-button type="primary" @click="submitSearch">搜索</el-button>
              </template>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        text: ''
      },
      searchResults: []
    }
  },
  methods: {
    submitSearch () {
      console.log(this.searchForm)
      this.$router.push({ name: 'search-results', query: { searchForm: this.searchForm } })
    }
  }
}
</script>
