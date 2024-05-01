<template>
  <div>
    <h1>综述报告</h1>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <!-- <th>摘要</th> -->
          <th>日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.report_id">
          <td><a href="#" @click="viewReport(document.report_id)">{{ document.title }}</a></td>
          <!-- <td>{{ document.title }}</td> -->
          <!-- <td>{{ truncateAbstract(document.abstract, 100) }}</td> -->
          <td>{{ document.date }}</td>
          <td><a href="#" @click="deleteReport(document.report_id)">删除</a></td> <!-- 删除链接 -->
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </div>
  </div>
</template>

<script>
import { fetchReports, deleteReport, fetchReportContent } from '@/request/userRequest.js'
import markdownIt from 'markdown-it'
import html2pdf from 'html2pdf'
// import pdfjsLib from 'pdfjs-dist'

const md = markdownIt()

function convertMarkdownToPdf (markdownContent, id) {
  const htmlContent = md.render(markdownContent)

  html2pdf().from(htmlContent).toPdf().get('pdf').then(function (pdf) {
    // 将生成的 PDF 对象传递给展示函数
    renderPdf(pdf, id)
  })
}

function renderPdf (pdf, id) {
  // 获取第一页
  pdf.getData().then(function (data) {
    var blob = new Blob([data], { type: 'application/pdf' })

    // 创建一个指向该 Blob 的 URL
    var url = URL.createObjectURL(blob)

    // 跳转到新页面显示 PDF
    window.open(`/pdf-viewer/${id}`, '_blank')

    // 在窗口关闭时释放 URL 对象
    window.addEventListener('unload', function () {
      URL.revokeObjectURL(url)
    })
  })
}

export default {
  data () {
    return {
      documents: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      report_id: ''
    }
  },
  computed: {
    displayedDocuments () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.documents.slice(start, end)
    }
  },
  methods: {
    async fetchDocuments () {
      try {
        this.documents = []
        var res = (await fetchReports()).data
        console.log(res)
        this.documents = res.reports
      } catch (error) {
        console.log('error')
      }
    },
    async deleteReport (id) {
      // eslint-disable-next-line camelcase
      var report_ids = []
      report_ids.push(id)
      var data = {report_ids}
      try {
        var res = (await deleteReport({data}))
        console.log(res)
      } catch (error) {
        console.log('error')
      }
      this.fetchDocuments()
    },
    changePage (page) {
      this.currentPage = page
    },
    truncateAbstract (abstract, maxLength) {
      if (abstract.length > maxLength) {
        return abstract.substring(0, maxLength) + '...'
      }
      return abstract
    },
    async viewReport (id) {
      try {
        var params = {report_id: id}
        const markdownContent = (await fetchReportContent({params})).data.summary
        console.log(markdownContent)
        convertMarkdownToPdf(markdownContent, id)
      } catch (error) {
        console.log('error')
      }
    }
  },
  mounted () {
    this.fetchDocuments()
  }
}
</script>

<style>
/* 可以添加样式来美化表格 */
h1{
  font-size: 2px;
  font-weight: bold;
  margin-bottom: 20px;
  color:aquamarine;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th{
  border: 1px solid rgb(75, 168, 245);
  padding: 8px;
  text-align: left;
  font-size:18px;
  background: rgb(75, 168, 245);
}

/* 鼠标悬停时的样式 */
tr:hover {
  background-color: #f5f5f5;
}

/* 分页样式 */
.pagination {
  margin-top: 20px;
}

.pagination button {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #f5f5f5;
}
</style>
