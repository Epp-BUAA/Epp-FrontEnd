<template>
  <div ref="searchContainer" class="search-container">
    <!-- <el-input
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
    </el-input> -->
    <el-input
  v-model="searchContent"
  placeholder="请输入搜索内容"
  @focus="showHistory = true"
  @keyup.enter="submitSearch(searchContent)"
  @input="updateInput"
  class="custom-search-input"
>
  <template #append>
    <span @click="submitSearch(searchContent)" class="custom-search-button">搜索</span>
  </template>
  <i slot="prefix" class="el-input_icon-el-icon-search"></i>
</el-input>

    <transition name="fade">
      <div v-if="showHistory" class="history-box">
        <div class="history">
          <el-tag
            v-for="(record, index) in search_records"
            :key="index"
            closable
            @close="removeRecord(record.search_record_id, index)"
            @click="searchFromHistory(record.search_record_id)"
          >
            <div style="display: flex; align-items: center;">
              {{ record.keyword }}
              <div class="record-date">
                {{ record.date }}
              </div>
            </div>
          </el-tag>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchInput',
  data () {
    return {
      searchContent: '',
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
        this.$notify({
          title: '警告',
          message: '请先输入查询内容',
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
        .delete(`${this.$BASE_API_URL}/userInfo/delSearchHistory`, {
          data: {
            search_record_id: searchRecordId
          }
        })
        .then(response => {
          this.search_records.splice(index, 1)
        })
        .catch(error => {
          console.error('删除历史记录失败', error)
        })
    },
    fetchSearchRecords () {
      axios
        .get(`${this.$BASE_API_URL}/userInfo/searchHistory`)
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
  border: 1px solid #409EFE;
  width: 90%;
  position: relative;
  margin: 0 auto;
  padding: 10px; /* 为了更好的视觉效果 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
}
/* .custom-search-input{
  background-color: #409EFE;
} */
/* .el-input__inner {
  background-color: #409EFE;
} */
.custom-search-button {
  width: 100%;
  color: #409EFE;
}
.custom-search-button:hover {
  color: rgb(13, 113, 228);
}
.el-input-group__append {
  color: #409EFE;
}
.history .el-tag {
  display: flex;
  align-items: center;
  background: white;
  border: none;
  font-size: 14px;
  color: black;
  margin-bottom: 5px;
  cursor: pointer;
}

.record-date {
  color: grey;
  font-size: smaller;
  margin-left: 10px;
}

.history-box {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 10;
  width: 90%;
  background: white;
  padding: 10px;
  border-radius: 4px;
  margin-top: 5px;
  overflow-y: auto;
  max-height: 200px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
