<template>
    <el-container style="height: calc(100vh - 55px);">
        <el-header>
          <h3>调研助手</h3>
        </el-header>

        <el-main class="chat-content">
            <div v-for="(message, index) in chatMessages" :key="index">
                <div v-if="message.sender === 'ai'" class="message-bubble left">
                    <div v-if="message.loading" v-loading="message.loading"
                        element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100px; height: 40px;">
                    </div>
                    <div v-else>
                        <p style="white-space: pre-wrap;">{{ message.text }}</p>
                        <el-button type="text" @click="regenerateAnswer" v-show="index == chatMessages.length - 1 && answerFinished">
                            <i class="fas fa-refresh"></i>
                            重新生成
                        </el-button>
                    </div>
                </div>
                <div v-else class="message-bubble right">
                    <p style="white-space: pre-wrap;">{{ message.text }}</p>
                </div>
            </div>
            <div style="margin-top: 10px;">
              <div v-show="answerFinished" v-for="(question, index) in probQuestions" :key="index" class="prob-question" @click="sendProbQuestion(question)">
                {{ question }}
              </div>
            </div>
        </el-main>

        <el-footer>
          <el-input v-model="chatInput" placeholder="输入你的消息..." @keyup.enter="chatToAI"></el-input>
          <el-button type="primary" @click="chatToAI">发送</el-button>
        </el-footer>
    </el-container>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    paper_id: {
      type: String,
      default: ''
    },
    fileReadingID: {
      type: Number,
      defaults: ''
    }
  },
  data () {
    return {
      chatInput: '',
      chatMessages: [],
      answerFinished: false,
      probQuestions: []
    }
  },
  created () {
    if (this.fileReadingID > 0) {
      this.restorePaperStudy(this.fileReadingID)
    } else {
      this.initialize()
    }
  },
  methods: {
    initialize () {
      const existingPaperId = localStorage.getItem('paperID')
      if (existingPaperId === this.paperID) {
        this.file_reading_id = localStorage.getItem('fileReadingID')
        this.restorePaperStudy(existingPaperId)
      } else {
        this.createPaperStudy()
      }
    },
    createPaperStudy () {
      console.log('paper-id ', this.paper_id)
      axios.post(this.$BASE_API_URL + '/study/createPaperStudy', {'paper_id': this.paper_id, 'file_type': 2})
        .then((response) => {
          if (response.status === 200) {
            console.log('论文研读创建成功！')
            this.fileReadingID = response.data.file_reading_id
            localStorage.setItem('fileReadingID', this.fileReadingID)
            localStorage.setItem('paperID', this.paper_id)
            console.log('研读对话的id, ', response.data.file_reading_id)
          }
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    },
    restorePaperStudy () {
      console.log('研读对话的id, ', this.fileReadingID)
      axios.post(this.$BASE_API_URL + '/study/restorePaperStudy', {'file_reading_id': this.fileReadingID})
        .then((response) => {
          const history = response.data.conversation_history.conversation
          for (const message of history) {
            const sender = message.role === 'user' ? 'user' : 'ai'
            this.chatMessages.push({sender: sender, text: message.content, loading: false})
            localStorage.setItem('fileReadingID', this.fileReadingID)
          }
        })
        .catch((error) => {
          console.error('恢复论文研读失败: ', error)
        })
    },
    async chatToAI () {
      const chatMessage = this.chatInput.trim()
      if (!chatMessage) {
        this.$message({
          message: '请输入你的问题',
          type: 'warning'
        })
        return
      }
      this.chatInput = ''
      this.answerFinished = false
      this.chatMessages.push({sender: 'user', text: chatMessage, loading: false})

      let loadingMessage = { sender: 'ai', text: 'AI正在思考...', loading: true }
      this.chatMessages.push(loadingMessage)
      let answer = ''
      //   Add user message to chat
      try {
        await this.$axios.post(this.$BASE_API_URL + '/study/doPaperStudy', { 'query': chatMessage, 'file_reading_id': this.fileReadingID })
          .then(response => {
            answer = response.data.ai_reply
            this.probQuestions = response.data.prob_question
            loadingMessage.loading = false
            loadingMessage.text = ''
          })
      } catch (error) {
        console.error('Error:', error)
        loadingMessage.text = ''
        answer = '抱歉, 无法从AI获取回应。'
        loadingMessage.loading = false
      } finally {
        this.answerFinished = false
        let cur = 0
        while (cur < answer.length) {
          loadingMessage.text += answer.charAt(cur)
          cur++
          await this.delay(50)
        }
        this.answerFinished = true
      }
    },
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async regenerateAnswer () {
      console.log('regenerating...')
      const lastMessage = this.chatMessages[this.chatMessages.length - 1]
      lastMessage.text = 'AI正在思考...'
      lastMessage.loading = true
      this.answerFinished = false
      let answer = ''
      console.log('file_reading_id', this.file_reading_id)
      await axios.post(this.$BASE_API_URL + '/study/reDoPaperStudy', {'file_reading_id': this.file_reading_id})
        .then((response) => {
          answer = response.data.ai_reply
          this.probQuestions = response.data.prob_question
          lastMessage.text = ''
          lastMessage.loading = false
        })
        .catch((error) => {
          console.error('Error:', error)
          lastMessage.text = ''
          answer = '抱歉, 无法从AI获取回应。'
          lastMessage.loading = false
        })
      let cur = 0
      while (cur < answer.length) {
        lastMessage.text += answer.charAt(cur)
        cur++
        await this.delay(50)
      }
      this.answerFinished = true
    },
    sendProbQuestion (question) {
      this.chatInput = question
    }
  }

}
</script>

<style>
.el-header {
  text-align: center;
  padding: 20px;
}

.chat-content {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* 确保元素可以根据需要对齐到左边或右边 */
  background: rgb(233, 242, 251);
  width: 100%; /* 可以调整宽度以适应不同屏幕大小 */
}

.el-footer {
  background: rgb(233, 242, 251);
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}

.message-bubble {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ccc;
  margin: 5px 0;
  overflow-y: auto;
  text-align: left;
}

.message-bubble p {
    margin: 0;
}

.right {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  float: right;
  border-radius: 15px 0 15px 15px;
  clear: both;
  word-break: break-all;
}

.left {
  background-color: white;
  color: black;
  float: left;
  clear: both;
  border-radius: 0 15px 15px 15px;
}

.prob-question {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px 20px;
  text-align: left;
  margin-bottom: 5px;
  font-size: small;
  max-width: 90%;
  cursor: pointer
}

</style>
