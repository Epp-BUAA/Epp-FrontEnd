<template>
    <div ref="searchContainer" style="width: 100%; position: relative;">
        <el-input v-model="searchContent" placeholder="请输入搜索内容" @focus="showHistory = true"
            @keyup.enter="submitSearch(searchContent)" @input="updateInput">
            <template #append>
                <el-button type="primary" @click="submitSearch(searchContent)">搜索</el-button>
            </template>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div v-if="showHistory" class="history-box">
            <div class="history">
                <el-tag v-for="(record, index) in search_records" :key="index" closable
                    @close="removeRecord(record.search_record_id, index)"
                    @click="searchFromHistory(record.search_record_id)" id="record">
                    <div style="display: flex;">
                        {{ record.keyword }}
                        <div style="color: grey; font-size: smaller; margin-left: 10px;
                  justify-content: flex-start;"> {{ record.date }}</div>
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
      this.$router.push({ name: 'search-results', query: { search_content: searchContent, searchRecordID: '' } })
    },
    searchFromHistory (searchRecordID) {
      this.$router.push({ name: 'search-results', query: { search_content: '', searchRecordID: searchRecordID } })
    },
    removeRecord (searchRecordId, index) {
      console.log(searchRecordId)
      axios.delete(this.$BASE_API_URL + '/userInfo/delSearchHistory',
        {
          data: {
            'search_record_id': searchRecordId
          }
        })
        .then((response) => {
          console.log(response.data.message)
        })
        .catch((error) => {
          console.error('删除历史记录失败', error)
        })
      this.search_records.splice(index, 1)
    },
    fetchSearchRecords () {
      axios.get(this.$BASE_API_URL + '/userInfo/searchHistory')
        .then((response) => {
          this.search_records = response.data.keywords
        })
        .catch((error) => {
          console.error('Error', error)
        })
    },
    handleOutsideClick (event) {
      // 如果点击事件不是发生在搜索容器内部，隐藏搜索历史
      if (!this.$refs.searchContainer.contains(event.target)) {
        this.showHistory = false
      }
    },
    updateInput () {
      if (this.searchContent) {
        this.showHistory = false
      } else {
        this.showHistory = true
      }
    }
  }
}
</script>

<style scoped>
.history .el-tag {
  display: flex;
  /* 启用flex布局 */
  justify-content: space-between;
  /* 两端对齐 */
  background: white;
  /* 充满容器 */
  box-sizing: border-box;
  /* 边距包含在宽度内 */
  border: none;
  /* 移除边框 */
  /* flex-grow: 1; 让文本占据多余空间 */
  text-align: left;
  /* 文本左对齐 */
  font-size: 14px;
  /* 增大字体大小 */
  color: black;
  /* 字体颜色为黑色 */
  align-items: center;
}

.history .el-tag .el-tag__close {
  margin-left: auto;
  /* 推到右边 */
  color: black;
  /* 设置颜色为黑色 */
  background-color: white;
  font-size: 18px;
  /* 设置更大的字体大小 */
  /* cursor: pointer; 更明确的指示这是一个可点击的元素 */
}

.history-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 10;
  width: 100%;
}
</style>
