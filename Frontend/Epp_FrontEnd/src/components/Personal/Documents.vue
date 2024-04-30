<template>
  <div class="collections">
    <h1>文件列表</h1>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>日期</th>
          <th>大小</th>
          <th>格式</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.document_id">
          <td><router-link :to="'/paper/reader/' + document.document_id">{{ truncateTitle(document.title, 75) }}</router-link></td>
          <!-- <td>{{ document.title }}</td> -->
          <td>{{ document.date }}</td>
          <td>{{ document.size }}B</td>
          <td>{{ document.format}}
           <td><a href="#" @click="deleteDocument(document.document_id)">删除</a></td> <!-- 删除链接 -->
           <!-- <td><a href='#' @click="downloadDocument(document.document_id)">下载</a></td> -->
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </div>
  </div>
</template>

<script>
import { fetchDocument, deleteDocument } from '@/request/userRequest.js'
import { EventBus } from '@/main.js'

export default {
  data () {
    return {
      documents: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10
    }
  },
  created () {
    EventBus.$on('fetchDocuments', () => {
      this.fetchDocuments()
    })
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
        var res = (await fetchDocument()).data
        this.documents = res.documents
      } catch (error) {
        console.log('error')
      }
    },
    async deleteDocument (id) {
      try {
        var params = {'paper_id': id}
        var res = await deleteDocument(params)
        console.log(res)
      } catch (error) {
        console.log('error')
      }
      this.fetchDocuments()
    },
    changePage (page) {
      this.currentPage = page
    },
    truncateTitle (abstract, maxLength) {
      if (abstract.length > maxLength) {
        return abstract.substring(0, maxLength) + '...'
      }
      return abstract
    }
  },
  mounted () {
    this.fetchDocuments()
  }
}
</script>

<style>
/* 可以添加样式来美化表格 */

.h1{
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
  border: 1px solid rgb(15, 224, 190);
  padding: 8px;
  text-align: left;
  font-size:18px;
  background: rgb(15, 224, 190);
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
