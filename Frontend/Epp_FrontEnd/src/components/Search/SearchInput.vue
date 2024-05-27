<template>
  <div ref="searchContainer" class="search-container">
    <el-input
      v-model="searchContent"
      placeholder="请输入搜索内容"
      @focus="showHistory = true"
      @keyup.enter="submitSearch(searchContent)"
      @input="updateInput"
      class="custom-search-input"
    >
      <template #append>
        <el-button type="primary" @click="submitSearch(searchContent)">搜索</el-button>
      </template>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <div v-if="showHistory" class="history-box">
      <div class="history">
        <el-tag
          v-for="(record, index) in search_records"
          :key="index"
          closable
          @close="removeRecord(record.search_record_id, index)"
          @click="searchFromHistory(record.search_record_id)"
          id="record"
        >
          <div style="display: flex;">
            {{ record.keyword }}
            <div
              style="
                color: grey;
                font-size: smaller;
                margin-left: 10px;
                justify-content: flex-start;
              "
            >
              {{ record.date }}
            </div>
          </div>
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchInput',
  data () {
    return {
      searchContent: '',
      searchResults: [],
      search_records: [],
      showHistory: false
    }
  },
  created () {
    this.fetchSearchRecords()
  },
  mounted () {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    submitSearch (searchContent) {
      if (!searchContent) {
        this.$message({
          message: '请输入你的问题',
          type: 'warning'
        })
        return
      }
      this.$router.push({
        name: 'search-results',
        query: { search_content: searchContent, searchRecordID: '' }
      })
    },
    searchFromHistory (searchRecordID) {
      this.$router.push({
        name: 'search-results',
        query: { search_content: '', searchRecordID: searchRecordID }
      })
    },
    removeRecord (searchRecordId, index) {
      axios
        .delete(this.$BASE_API_URL + '/userInfo/delSearchHistory', {
          data: {
            search_record_id: searchRecordId
          }
        })
        .then(response => {
          console.log(response.data.message)
        })
        .catch(error => {
          console.error('删除历史记录失败', error)
        })
      this.search_records.splice(index, 1)
    },
    fetchSearchRecords () {
      axios
        .get(this.$BASE_API_URL + '/userInfo/searchHistory')
        .then(response => {
          this.search_records = response.data.keywords
        })
        .catch(error => {
          console.error('Error', error)
        })
    },
    handleOutsideClick (event) {
      if (!this.$refs.searchContainer.contains(event.target)) {
        this.showHistory = false
      }
    },
    updateInput () {
      this.showHistory = this.searchContent === ''
    }
  }
}
</script>

<style scoped>
.search-container {
  border-radius: 25px;
  border-color: #409EFE;
  width: 90%;
  position: relative;
}
.custom-search-input.el-input_inner {
  border-radius: 25px;
  width: 100%;
  border-color: #409EFE ;
  /* transition: border-color 0.3s; */
   border-width: 20px; /* 调整边框粗细 */
}

.custom-search-input.el-input_inner :focus {
  border-color: #409EFE;
}

.history .el-tag {
  display: flex;
  justify-content: space-between;
  background: white;
  box-sizing: border-box;
  border: none;
  text-align: left;
  font-size: 14px;
  color: black;
  align-items: center;
}

.history .el-tag .el-tag__close {
  margin-left: auto;
  color: black;
  background-color: white;
  font-size: 18px;
}

.history-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 10;
  width: 100%;
  background: white;
  padding: 10px;
  border-radius: 4px;
  margin-top: 5px;
}

.el-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
