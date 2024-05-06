<template>
  <div class="collections">
    <h1>AI对话</h1>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>得分</th>
          <th>日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.file_reading_id">
          <td><router-link :to="{name: 'paper-reader', params: {paper_id: document.paper_id}, query: {fileReadingID: document.file_reading_id}}">{{ document.paper_title }}</router-link></td>
          <td>{{ document.paper_score }}</td>
          <!-- <td>{{ truncateAbstract(document.abstract, 100) }}</td> -->
          <td>{{ document.date }}</td>
           <td><a href="#" @click="deleteDocument(document.paper_id)">删除</a></td> <!-- 删除链接 -->
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </div>
  </div>
</template>

<script>
import { fetchChat, deleteChat } from '@/request/userRequest.js'
export default {
  data () {
    return {
      documents: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10
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
        var res = (await fetchChat()).data
        this.documents = res.paper_reading_list
      } catch (error) {
        console.log('error')
      }
    },
    async deleteDocument (id) {
      try {
        // eslint-disable-next-line camelcase
        var paper_ids = []
        paper_ids.push(id)
        var data = {paper_ids}
        var res = (await deleteChat({data}))
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
  color:rgb(36, 120, 231);
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
