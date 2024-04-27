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
                        <p>{{ message.text }}</p>
                    </div>
                </div>
                <div v-else class="message-bubble right">
                    <p>{{ message.text }}</p>
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
    }
  },
  data () {
    return {
      chatInput: '',
      chatMessages: []
    }
  },
  created () {
    this.createPaperStudy()
  },
  methods: {
    createPaperStudy () {
      axios.post(this.$BASE_API_URL + '/study/createPaperStudy' + {'paper_id': this.paper_id, 'file_type': 2})
        .then((response) => {
          if (response.status === 200) {
            console.log('论文研读创建成功！')
            this.tmp_kb_id = response.data.tmp_kb_id
            console.log(response.data.tmp_kb_id)
            this.file_reading_id = response.data.file_reading_id
          }
        })
        .catch((error) => {
          console.log('Error: ', error)
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
      this.chatMessages.push({sender: 'user', text: chatMessage, loading: false})

      let loadingMessage = { sender: 'ai', text: 'AI正在思考...', loading: true }
      this.chatMessages.push(loadingMessage)
      let answer = ''
      //   Add user message to chat
      this.$axios.post(this.$BASE_API_URL + '/study/doPaperStudy', { query: chatMessage, tmp_kb_id: this.tmp_kb_id })
        .then(response => {
          answer = response.data.reply
          loadingMessage.loading = false

          loadingMessage.loading = false
          loadingMessage.text = ''
        })
        .catch(error => {
          console.error('Error:', error)
          loadingMessage.text = '抱歉，无法从AI获取回应。'
          loadingMessage.loading = false
        })
        .finally(() => {
          this.chatInput = ''
        })
      let cur = 0
      while (cur < answer.length) {
        loadingMessage.text += answer.charAt(cur)
        cur++
        await this.delay(100)
      }
    },
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
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
}

.message-bubble p {
  margin: 0;
  word-wrap: break-word;
}

.right {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  float: right;
  border-radius: 15px 0 15px 15px;
  clear: both;
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
