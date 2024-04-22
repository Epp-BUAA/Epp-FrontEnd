<template>
  <div>
    <el-row style="margin-top: 30px;">
        <!-- 侧边栏 -->
        <el-col :span="4" type="flex">
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
                <el-container class="box" v-for="paper in filteredPapers" :key="paper.paper_id" style="margin-left: 20px;">
                    <div class="columns is-mobile">
                        <div class="column is-narrow">
                            <div>
                                <router-link :to="{name: 'paper-info', params: {paper_id: paper.paper_id}}" class="is-size-5 has-text-weight-bold" style="text-align: left; display: block;">
                                    {{ paper.title }}
                                </router-link>
                            </div>
                            <div>
                                <el-tag size="mini">
                                    {{ getPublicationYear(paper.publication_date) }}
                                </el-tag>
                                <span>- {{ paper.authors }}</span>
                            </div>
                            <div style="text-align: left;">
                                <span class="is-size-7">
                                    <span class="mr-3">{{ paper.abstract }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-container>
            </el-main>
        </el-col>
        <el-col :span="8">
            <el-container style="display: flex; justify-content: center;">
                <el-aside>
                    <!-- AI对话界面组件 -->
                    <el-card class="chat-display" justify="space-around">
                        <div v-for="message in chatMessages" :key="message.id"
                            :class="{ 'user-message': message.sender === 'user', 'ai-message': message.sender === 'ai' }">
                            {{ message.text }}
                        </div>
                    </el-card>
                    <el-input class="chat-input" v-model="chatInput" placeholder="输入你的问题" @keyup.enter="chatToAI"
                        clearable>
                    </el-input>
                    <el-button type="primary" @click="chatToAI" margin-top="10px">搜索</el-button>
                </el-aside>
            </el-container>
        </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: ['searchForm'],
  data () {
    return {
      papers: [], // 假设这是从API获取的论文数据
      filterYear: '',
      sortOrder: 'asc',
      filteredPapers: [],
      chatInput: '',
      chatMessages: []
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
      console.log(this.filteredPapers)
    },
    getPublicationYear (dateString) {
      return new Date(dateString).getFullYear()
    },
    fetchPapers () {
      console.log('Fetching papers...')
      console.log(this.$route.query.searchForm)
      //   axios.post(this.$backend_url + '/search_paper', this.$route.query.searchForm)
      //     .then((response) => {
      //       console.log('response is ...')
      //       this.papers = response.data.paper_infos
      //       console.log(this.papers)
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error)
      //     })
      this.papers = [{'paper_id': 1, 'title': 'A', 'abstract': 'aaaaa', 'publication_date': 'Mon, 19 Oct 2020 00:00:00 GMT', 'authors': 'jkm'},
        {'paper_id': 2, 'title': 'B', abstract: 'bbbb', 'publication_date': 'Mon, 19 Oct 2023 00:00:00 GMT', 'authors': 'ybw'}]
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

      //   this.$axios.post('https://your-backend-url/api/chat', { message: chatMessage })
      //     .then(response => {
      //       this.addMessage(response.data.reply, 'ai')
      //     })
      //     .catch(error => {
      //       console.error('Error:', error)
      //       this.addMessage('Error: Unable to send message.', 'error')
      //     })
      //     .finally(() => {
      //       this.userInput = ''
      //     })

      this.addMessageToChat('阿巴阿巴阿巴阿巴阿巴', 'ai')
      this.chatInput = ''
    },
    addMessageToChat (message, sender) {
      this.messageIdCounter += 1
      this.chatMessages.push({ id: this.messageIdCounter, text: message, sender: sender })
    }
  },
  mounted () {
    this.fetchPapers()
    this.applyFilter()
  }
}
</script>

<style>
.chat-input {
    display: flex;
}

.sidebar {
    flex: 1;
    padding: 20px;
}

.container {
    margin-top: 20px;
}

.paper-card {
    margin-bottom: 20px;
}

.chat-display {
    height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    padding: 10px;
}

.user-message {
    text-align: right;
    color: blue;
    margin: 5px;
}

.ai-message {
    text-align: left;
    color: green;
    margin: 5px;
}

.error-message {
    text-align: center;
    color: red;
    margin: 5px;
}
</style>
