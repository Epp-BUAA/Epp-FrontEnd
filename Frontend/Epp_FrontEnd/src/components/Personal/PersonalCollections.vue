<template>
  <div>
    <h1>收藏文献</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Abstract</th>
          <th>Date</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.id">
          <td><router-link :to="'/document/' + document.id">{{ document.title }}</router-link></td>
          <!-- <td>{{ document.title }}</td> -->
          <td>{{ document.author }}</td>
          <td>{{ document.abstract }}</td>
          <td>{{ document.date }}</td>
          <td>{{ document.score }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </div>
  </div>
</template>

<script>
import { fetchCollectedPapers } from '@/request/userRequest.js'
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
    fetchDocuments () {
      try {
        var res = fetchCollectedPapers()
        // var res = fetchSearchHistory()
        this.documents = res.data.papers
      } catch (error) {
        console.log('error')
      }
    },
    changePage (page) {
      this.currentPage = page
    }
  },
  mounted () {
    this.fetchDocuments()
  }
}
</script>

<style>
/* 可以添加样式来美化表格 */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
