<template>
    <el-container style="height: calc(100vh - 55px);">
        <el-header>
          <h1>调研助手</h1>
        </el-header>

        <el-main class="chat-content">
            <div v-for="(message, index) in chatMessages" :key="index">
                <div v-if="message.sender === 'ai'" class="message-bubble left">
                    <div v-if="message.loading" v-loading="message.loading"
                        element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100px; height: 40px;">
                    </div>
                    <div v-else>
                        <p style="white-space: pre-wrap;">{{ message.text }}</p>
                        <el-button type="text" v-show="answerFinished && index == chatMessages.length - 1"
                        @click="regenerateAnswer">
                            <i class="fas fa-refresh"></i>
                            重新生成
                        </el-button>
                    </div>
                </div>
                <div v-else class="message-bubble right">
                    <p style="word-wrap: break-word;">{{ message.text }}</p>
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
    paperIds: {
      type: Array,
      default: null
    },
    keyword: {
      type: String,
      default: ''
    },
    aiReply: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chatInput: '',
      chatMessages: [],
      answerFinished: false
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.chatMessages.push({text: this.aiReply, sender: 'ai', loading: false, type: 'dialog'})
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
      this.chatMessages.push({sender: 'user', text: chatMessage, loading: false, type: 'dialog'})

      let loadingMessage = { sender: 'ai', text: 'AI正在思考...', loading: true, type: 'dialog' }
      this.chatMessages.push(loadingMessage)
      let answer = ''
      //   Add user message to chat
      try {
        await this.$axios.post(this.$BASE_API_URL + '/search/dialogQuery', { 'message': chatMessage, 'paper_ids': this.paperIds, 'keyword': this.keyword })
          .then(response => {
            loadingMessage.type = response.data.dialog_type
            loadingMessage.loading = false
            loadingMessage.text = ''
            answer = response.data.content
          })
      } catch (error) {
        console.error('Error:', error)
        loadingMessage.text = ''
        answer = '抱歉, 无法从AI获取回应。'
        loadingMessage.loading = false
      } finally {
        this.chatInput = ''
        this.answerFinished = false
        let cur = 0
        while (cur < answer.length) {
          loadingMessage.text += answer.charAt(cur)
          cur++
          await this.delay(100)
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
        await this.delay(100)
      }
      this.answerFinished = true
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
  border-color: #ccc;
  float: left;
  clear: both;
  border-radius: 0 15px 15px 15px;
}
</style>
