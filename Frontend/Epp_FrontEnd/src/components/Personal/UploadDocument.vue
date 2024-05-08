<template>
<div>
  <div>
    <h1 style="margin-top: 60px;">上传文献</h1>
    <input type="file" @change="handleFileUpload" accept=".pdf,.doc,.docx">
    <button @click="uploadDocument">上传</button>
  </div>
  <Documents/>
 </div>
</template>

<script>
import Documents from '@/components/Personal/Documents.vue'
import { uploadDocument } from '@/request/userRequest.js'
import { EventBus } from '@/main.js'

export default {
  components: {
    Documents
  },
  data () {
    return {
      documents: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      report_id: ''
    }
  },
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
        EventBus.$emit('fetchDocuments')
        // this.fetchDocuments()
      } catch (error) {
        console.error(error)
        alert('文献上传失败，请重试。')
      }
    }
  }
}
</script>
