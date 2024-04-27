<template>
    <el-row :gutter="20">
      <el-col :span="16">
        <pdf-reader :pdfUrl="pdfUrl"/>
      </el-col>
      <el-col :span="8">
        <ai-assistant :paper_id="paper_id" />
      </el-col>
    </el-row>
</template>

<script>
import PDFReader from './PDFReader.vue'
import ReadAssistant from './ReadAssistant.vue'
export default {
  components: {
    'pdf-reader': PDFReader,
    'ai-assistant': ReadAssistant
  },
  props: {
    paper_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pdfUrl: ''
    }
  },
  created () {
    this.fetchPaperPDF()
  },
  methods: {
    fetchPaperPDF () {
      this.pdfUrl = '../../../static/Inductive Representation Learning on Large Graphs.pdf'
    }
  }

}
</script>

<style>

</style>
