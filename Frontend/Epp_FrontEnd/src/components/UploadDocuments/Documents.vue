<template>
  <div class="collections">
    <div class="card" v-for="document in displayedDocuments" :key="document.document_id">
      <router-link :to="'/paper/localReader/' + document.document_id">
        <h3>{{ truncateTitle(document.title, 50) }}</h3>
      </router-link>
      <div class="info-container">
        <div class="info-item">
          <img src="../../assets/icon/documentDate.svg" alt="Date Icon" class="info-icon">
          <p><span class="label">日期:</span> {{ document.date }}</p>
        </div>
        <div class="info-item">
          <img src="../../assets/icon/documentSize.svg" alt="Size Icon" class="info-icon">
           <p><span class="label">大小:</span> {{ convertSize(document.size) }}KB</p>
        </div>
        <div class="info-item">
          <img src="../../assets/icon/documentType.svg" alt="Format Icon" class="info-icon">
           <p><span class="label">格式:</span> {{ document.format }}</p>
        </div>
      </div>
      <button @click="deleteDocument(document.document_id)">删除</button>
    </div>
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
    },
    convertSize (sizeInBytes) {
      return Math.floor(sizeInBytes / 1024)
    }
  },
  mounted () {
    this.fetchDocuments()
  }
}
</script>

<style scoped>
.collections {
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: calc(33.333% - 2rem);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-0.625rem);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

.card h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
  color: #409EFE;
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.625rem 0;
  margin-top: auto; /* 将 info-container 推到卡片底部 */
}

.info-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.3125rem 0;
  font-family: '微软雅黑', sans-serif;
}

.info-icon {
  margin-right: 0.625rem;
  width: 2.5rem; /* 使用相对单位 */
  height: 2.5rem; /* 使用相对单位 */
}

.info-item p {
  margin: 0;
  flex: 1;
  text-align: left;
  color: gray; /* 将后面的内容设置为灰色 */
}

.info-item .label {
  font-weight: bold;
  color: black; /* 确保标签颜色为黑色 */
}

.card button {
  background-color: #409EFE;
  color: #fff;
  border: none;
  padding: 0.625rem 1rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  transition: background-color 0.3s;
  width: 50%; /* 调整按钮宽度 */
  align-self: center; /* 水平居中 */
  margin-top: 0.625rem; /* 确保按钮和 info-container 有间距 */
}

.card button:hover {
  background-color: #3075d1;
}

.pagination {
  text-align: center;
  width: 100%;
  margin-top: 1.25rem;
}

.pagination button {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 0.3125rem 0.625rem;
  margin: 0 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #f5f5f5;
}

.pagination button.active {
  background-color: #409EFE;
  color: white;
  border-color: #409EFE;
}
</style>
