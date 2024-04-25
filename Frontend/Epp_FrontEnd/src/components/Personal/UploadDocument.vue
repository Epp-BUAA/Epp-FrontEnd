<template>
  <div>
    <h1>上传文献</h1>
    <input type="file" @change="handleFileUpload" accept=".pdf,.doc,.docx">
    <button @click="uploadDocument">上传</button>
  </div>
</template>

<script>
import { uploadDocument } from '@/request/userRequest.js'

export default {
  methods: {
    handleFileUpload (event) {
      this.file = event.target.files[0]
    },
    async uploadDocument () {
      try {
        const formData = new FormData()
        formData.append('new_paper', this.file) // 将文件字段名改为new_paper
        await uploadDocument(formData)
        alert('文献上传成功！')
        this.fetchDocuments()
      } catch (error) {
        console.error(error)
        alert('文献上传失败，请重试。')
      }
    }
  },
  data () {
    return {
      file: null
    }
  }
}
</script>
