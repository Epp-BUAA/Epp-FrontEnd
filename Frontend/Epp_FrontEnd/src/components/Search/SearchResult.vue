<template>
  <el-row style="">
    <!-- 侧边栏 -->
    <el-col :span="4" type="flex" style="margin-top: 60px; position: sticky; top: 60px">
      <el-aside style="">
        <el-form label-position="top">
          <el-form-item label="年份过滤">
            <el-select v-model="filterYear" placeholder="请选择年份" @change="applyFilter">
              <el-option label="所有年份" value=""></el-option>
              <el-option label="2024年以来" value="2024"></el-option>
              <el-option label="2022年以来" value="2022"></el-option>
              <el-option label="2020年以来" value="2020"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序方式">
            <el-select v-model="sortOrder" placeholder="请选择排序方式" @change="applyFilter">
              <el-option label="时间升序" value="asc"></el-option>
              <el-option label="时间降序" value="desc"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-aside>
    </el-col>
    <el-col :span="12" style="margin-top: 55px;">
      <el-main>
        <div style="display: flex; justify-content: right">
          <el-button type="success" icon="el-icon-download" @click="downloadPapers" size="small">
            下载文献
          </el-button>
          <el-button type="primary" icon="el-icon-document-copy" @click="generateSummaryReport" size="small">
            生成综述
          </el-button>
        </div>
        <div v-for="paper in filteredPapers" :key="paper.paper_id" style="margin-top: 30px;">
            <div class="columns is-mobile">
              <div class="column is-narrow checkbox">
                <el-checkbox @change="handleCheckboxChange(paper.paper_id)"></el-checkbox>
              </div>
              <paper-card :paper="paper"/>
            </div>
          </div>
        <el-backtop :visibility-height="100"></el-backtop>
      </el-main>
    </el-col>
    <el-col :span="8" style="height: 100vh; position: sticky; top: 55px">
      <ai-assistant v-if="aiReply.length > 0" :aiReply="aiReply" :paperIds="paperIds"
        :searchRecordID="searchRecordID" :restoreHistory="restoreHistory" @find-paper="searchPaperByAssistant"/>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import SearchAssistant from './SearchAssistant.vue'
import PaperCard from './PaperCard.vue'
export default {
  components: {
    'ai-assistant': SearchAssistant,
    'paper-card': PaperCard
  },
  props: ['searchForm'],
  data () {
    return {
      papers: [],
      filterYear: '',
      sortOrder: 'asc',
      filteredPapers: [],
      aiReply: [],
      paperIds: [],
      searchRecordID: '',
      restoreHistory: false,
      selectedPapers: []
    }
  },
  methods: {
    applyFilter () {
      let results = this.papers
      if (this.filterYear) {
        results = results.filter(paper => {
          const year = new Date(paper.publication_date).getFullYear()
          console.log(year)
          return year >= this.filterYear
        })
      }
      if (this.sortOrder === 'asc') {
        results.sort((a, b) => {
          const dateA = new Date(a.publication_date)
          const dateB = new Date(b.publication_date)
          return dateA - dateB // 升序排序
        })
      } else {
        results.sort((a, b) => {
          const dateA = new Date(a.publication_date)
          const dateB = new Date(b.publication_date)
          return dateB - dateA // 降序排序
        })
      }
      this.filteredPapers = results
      console.log('filter papers: ', this.filteredPapers)
    },
    async fetchPapers () {
      console.log('Fetching papers...')
      const loadingInstance = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      await axios.post(this.$BASE_API_URL + '/search/vectorQuery', {'search_content': this.$route.query.search_content})
        .then((response) => {
          console.log('response is ...')
          this.papers = response.data.paper_infos
          // 添加ai回答的逻辑
          this.aiReply.push({sender: 'ai', text: response.data.ai_reply, loading: false, type: 'dialog'})
          console.log('ai的回复: ', this.aiReply)
          this.paperIds = this.papers.map(paper => paper.paper_id)
          this.searchRecordID = response.data.search_record_id
          loadingInstance.close()
        })
        .catch((error) => {
          console.error('语义检索失败:', error)
        })
      // 写死数据
      // this.createFakeData()
      // loadingInstance.close()
    },
    async fetchPapersFromHistory () {
      console.log('search record ID: ', this.$route.query.searchRecordID)
      await axios.get(this.$BASE_API_URL + '/search/restoreSearchRecord?search_record_id=' + this.$route.query.searchRecordID, {timeout: 1000 * 60 * 5})
        .then((response) => {
          this.papers = response.data.paper_infos
          console.log('历史记录的论文', this.papers)
          for (const message of response.data.conversation) {
            const sender = message.role === 'user' ? 'user' : 'ai'
            this.aiReply.push({sender: sender, text: message.content, loading: false, type: 'dialog'})
          }
          console.log('历史记录对话信息 ', this.aiReply)
          this.paperIds = this.papers.map(paper => paper.paper_id)
          this.restoreHistory = true
        })
        .catch((error) => {
          console.error('恢复历史记录失败: ', error)
        })
    },
    handleCheckboxChange (paperId) {
      const index = this.selectedPapers.indexOf(paperId)
      if (index > -1) {
        // 如果已存在，则移除
        this.selectedPapers.splice(index, 1)
      } else {
        // 如果不存在，则添加
        this.selectedPapers.push(paperId)
      }
    },
    generateSummaryReport () {
      if (this.selectedPapers.length === 0) {
        this.$message({
          message: '请选择论文',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '正在生成综述报告',
        type: 'success'
      })
      console.log('选中的论文:', this.selectedPapers)
      axios.post(this.$BASE_API_URL + '/summary/generateSummaryReport', {'paper_id_list': this.selectedPapers}, {timeout: 300000})
        .then((response) => {
          console.log(response.data.message)
          this.$message({
            message: '综述报告已生成，请在个人中心查看',
            type: 'success'
          })
        })
        .catch((error) => {
          console.error('综述报告生成失败:', error)
          this.$message({
            message: '综述报告生成失败',
            type: 'error'
          })
        })
      this.selectedPapers = []
    },
    downloadPapers () {
      if (this.selectedPapers.length === 0) {
        this.$message({
          message: '请选择论文',
          type: 'warning'
        })
      }
      axios.post(this.$BASE_API_URL + '/batchDownload', {'paper_id_list': this.selectedPapers})
        .then((response) => {
          if (response.data.is_success === true) {
            this.$message({
              message: '开始下载！',
              type: 'success'
            })
            const zipUrl = this.$BASE_URL + response.data.zip_url
            const link = document.createElement('a')
            link.href = zipUrl
            link.download = 'papers.zip'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            this.selectedPapers = []
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
      this.selectedPapers = []
    },
    searchPaperByAssistant (papers) {
      console.log('循征之后的论文', papers)
      this.papers = papers
      this.applyFilter()
      const paperIDs = papers.map(paper => paper.paper_id)
      axios.post(this.$BASE_API_URL + '/search/changeRecordPapers', {search_record_id: this.searchRecordID, paper_id_list: paperIDs})
        .then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            console.log('论文循征成功, ', response.data.msg)
          }
        })
        .catch((error) => {
          console.error('论文循征失败, ', error)
        })
    }
  },
  async mounted () {
    if (this.$route.query.searchRecordID) {
      this.searchRecordID = this.$route.query.searchRecordID
      await this.fetchPapersFromHistory()
    } else {
      await this.fetchPapers()
    }
    this.applyFilter()
  }
}
</script>

<style scoped>
.checkbox {
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 对话式检索部分 */
.el-header {
  text-align: center;
  padding: 20px;
}

.chat-content {
  background: rgb(233, 242, 251);
}

.el-footer {
  background: rgb(233, 242, 251);
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}

.my-message {
  background-color: #acd1f7;
  color: white;
  text-align: right;
}

.other-message {
  background-color: white;
  color: black;
  text-align: left;
}
</style>
