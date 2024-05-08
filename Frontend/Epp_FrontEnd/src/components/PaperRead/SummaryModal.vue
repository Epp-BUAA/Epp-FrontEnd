<template>
  <el-dialog :visible.sync="showSummaryModal" width="70%">
      <div v-html="markdownFile"></div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import markdownIt from 'markdown-it'
const md = markdownIt()
export default {
  name: 'SummaryModal',
  props: {
    showSummaryModal: {
      type: Boolean
    },
    paperID: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      markdownFile: ''
    }
  },
  mounted () {
    this.renderMarkdown()
  },
  methods: {
    renderMarkdown () {
      console.log('paper id is...', this.paperID)
      axios.post(this.$BASE_API_URL + '/study/generateAbstractReport', {document_id: '', paper_id: this.paperID})
        .then((response) => {
          const summary = response.data.summary
          this.markdownFile = md.render(summary)
        })
        .catch((error) => {
          console.error('摘要生成失败', error)
          this.$message({
            message: '摘要生成失败',
            type: 'error'
          })
        })
    }
  }
}
</script>
