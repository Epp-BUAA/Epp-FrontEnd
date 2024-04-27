<template>
  <el-row>
    <!-- 侧边栏 -->
    <el-col :span="4" type="flex" style="margin-top: 30px;">
      <el-aside>
        <el-form label-position="top">
          <el-form-item label="年份过滤">
            <el-select v-model="filterYear" placeholder="请选择年份" @change="applyFilter">
              <el-option label="所有年份" value=""></el-option>
              <el-option label="2024年以来" value="2024"></el-option>
              <el-option label="2022年以来" value="2022"></el-option>
              <el-option label="2022年以来" value="2020"></el-option>
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
    <el-col :span="12">
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
              <div class="column paper-card">
                <div>
                  <router-link :to="{ name: 'paper-info', params: { paper_id: paper.paper_id } }"
                    class="is-size-5 has-text-weight-bold" style="text-align: left; display: block;">
                    {{ paper.title }}
                  </router-link>
                </div>
                <div style="text-align: left;">
                  <el-tag size="mini">
                    {{ getPublicationYear(paper.publication_date) }}
                  </el-tag>
                  <span class="is-size-6">- {{ paper.authors }}</span>
                </div>
                <div style="text-align: left;">
                  <span class="is-size-7">
                    <span class="mr-3 truncate-multiline">{{ paper.abstract }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
      </el-main>
    </el-col>
    <el-col :span="8">
      <el-container style="height: calc(100vh - 55px);">
        <el-header>
          <h1>调研助手</h1>
        </el-header>

        <el-main class="chat-content">
          <div>
            <div v-for="(message, index) in chatMessages" :key="index" :class="message.sender">
              <el-card :class="{ 'my-message': message.sender === 'user', 'other-message': message.sender === 'ai' }">
                <p>{{ message.text }}</p>
              </el-card>
            </div>
          </div>
        </el-main>

        <el-footer>
          <el-input v-model="chatInput" placeholder="输入你的消息..." @keyup.enter="chatToAI"></el-input>
          <el-button type="primary" @click="chatToAI">发送</el-button>
        </el-footer>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  props: ['searchForm'],
  data () {
    return {
      papers: [], // 假设这是从API获取的论文数据
      filterYear: '',
      sortOrder: 'asc',
      filteredPapers: [],
      chatInput: '',
      chatMessages: [],
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
    getPublicationYear (dateString) {
      return new Date(dateString).getFullYear()
    },
    async fetchPapers () {
      console.log('Fetching papers...')
      const params = {
        'search_content': this.$route.query.search_content
      }
      console.log(params)
      await axios.get(this.$BASE_API_URL + '/search/vectorQuery?search_content=' + this.$route.query.search_content)
        .then((response) => {
          console.log('response is ...')
          this.papers = response.data.paper_infos
        })
        .catch((error) => {
          console.error('Error:', error)
        })
      this.papers = [{
        'paper_id': '0000f570-04bc-49fa-b2d4-56447ca1bd9b',
        'title': 'Quantization of Deep Neural Networks for Accurate Edge Computing',
        'authors': 'Wentao Chen,Hailong Qiu,Jian Zhuang,Chutong Zhang,Yu Hu,Qing Lu,Tianchen Wang,Yiyu Shi,Meiping Huang,Xiaowe Xu,',
        'abstract': '  Deep neural networks (DNNs) have demonstrated their great potential in recent\nyears, exceeding the per-formance of human experts in a wide range of\napplications. Due to their large sizes, however, compressiontechniques such as\nweight quantization and pruning are usually applied before they can be\naccommodated onthe edge. It is generally believed that quantization leads to\nperformance degradation, and plenty of existingworks have explored quantization\nstrategies aiming at minimum accuracy loss. In this paper, we argue\nthatquantization, which essentially imposes regularization on weight\nrepresentations, can sometimes help toimprove accuracy. We conduct\ncomprehensive experiments on three widely used applications: fully con-nected\nnetwork (FCN) for biomedical image segmentation, convolutional neural network\n(CNN) for imageclassification on ImageNet, and recurrent neural network (RNN)\nfor automatic speech recognition, and experi-mental results show that\nquantization can improve the accuracy by 1%, 1.95%, 4.23% on the three\napplicationsrespectively with 3.5x-6.4x memory reduction.\n',
        'publication_date': '2021-04-25',
        'journal': null,
        'citation_count': 38,
        'read_count': 479,
        'like_count': 2,
        'collect_count': 3,
        'download_count': 901,
        'score': 3.33,
        'original_url': 'http://arxiv.org/abs/2104.12046v2',
        'is_success': true
      }]
    },
    chatToAI () {
      const chatMessage = this.chatInput.trim()
      if (!chatMessage) {
        this.$message({
          message: '请输入你的问题',
          type: 'warning'
        })
        return
      }

      // Add user message to chat
      this.addMessageToChat(chatMessage, 'user')

      this.$axios.post(this.$BASE_API_URL + '/search/dialogQuery', { message: chatMessage })
        .then(response => {
          this.addMessage(response.data.reply, 'ai')
        })
        .catch(error => {
          console.error('Error:', error)
          this.addMessage('Error: Unable to send message.', 'error')
        })
        .finally(() => {
          this.userInput = ''
        })

      this.addMessageToChat('阿巴阿巴阿巴阿巴阿巴', 'ai')
      this.chatInput = ''
    },
    addMessageToChat (message, sender) {
      this.messageIdCounter += 1
      this.chatMessages.push({ id: this.messageIdCounter, text: message, sender: sender })
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
      console.log(this.selectedPapers)
    },
    generateSummaryReport () {
      if (this.selectedPapers.length === 0) {
        this.$message({
          message: '请选择论文',
          type: 'warning'
        })
      }
      axios.post(this.$BASE_API_URL + '/generateSummaryReport', {'paper_id_list': this.selectedPapers})
        .then((response) => {
          console.log(response.data.message)
          this.$message({
            message: '综述报告已生成，请在个人中心查看',
            type: 'success'
          })
        })
        .catch((error) => {
          console.error('Error:', error)
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
    }
  },
  async mounted () {
    await this.fetchPapers()
    this.applyFilter()
  }
}
</script>

<style>
.checkbox {
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.paper-card {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
  margin-bottom: 20px;
  /* word-break: break-word; */
}

.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* 设置为2行文本 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* 重写可能的 nowrap */
  max-height: 3em;
  /* 可选，基于行高和所需行数调整 */
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
