<template>
    <div>
      <iframe :src="pdfUrl" style="width: 100%; height: 755px;">
      </iframe>
    </div>
  </template>

<script>
import VuePdf from 'vue-pdf'

export default {
  components: {
    'vue-pdf': VuePdf
  },
  props: {
    pdfUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      numPages: 0,
      src: ''
    }
  },
  mounted () {
    this.loadPdf()
  },
  methods: {
    loadPdf () {
      this.src = VuePdf.createLoadingTask(this.pdfUrl)
      this.src.promise.then(pdf => {
        this.numPages = pdf.numPages // 这里拿到当前pdf总页数
      })
    }
  }
}
</script>

<style scoped>

</style>
