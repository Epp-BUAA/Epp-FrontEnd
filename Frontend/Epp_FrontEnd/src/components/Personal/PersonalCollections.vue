<template>
  <div class="collections">
    <h1>收藏文献</h1>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>作者</th>
          <th>摘要</th>
          <th>日期</th>
          <th>评分</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.paper_id">
          <td><router-link :to="{name: 'paper-info', params: {paper_id: document.paper_id}}">{{ document.title }}</router-link></td>
          <!-- <td>{{ document.title }}</td> -->
          <td>{{ transauthors(document.authors)}}</td>
          <td>{{ truncateAbstract(document.abstract, 100) }}</td>
          <td>{{ document.publication_date }}</td>
          <td>{{ document.score }}</td>
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
import { fetchCollectedPapers, deleteCollectedPapers } from '@/request/userRequest.js'
export default {
  data () {
    return {
      documents: [{paper_id: '0000f570-04bc-49fa-b2d4-56447ca1bd9b', title: 'Quantization of Deep Neural Networks for Accurate Edge Computing', score: '9', author: 'Wentao Chen', date: '2021-04-25', abstract: 'Deep neural networks (DNNs) have demonstrated their great potential in recent\nyears, exceeding the per-formance of human experts in a wide range of\napplications. Due to their large sizes, however, compressiontechniques such as\nweight quantization and pruning are usually applied before they can be\naccommodated onthe edge. It is generally believed that quantization leads to\nperformance degradation, and plenty of existingworks have explored quantization\nstrategies aiming at minimum accuracy loss. In this paper, we argue\nthatquantization, which essentially imposes regularization on weight\nrepresentations, can sometimes help toimprove accuracy. We conduct\ncomprehensive experiments on three widely used applications: fully con-nected\nnetwork (FCN) for biomedical image segmentation, convolutional neural network\n(CNN) for imageclassification on ImageNet, and recurrent neural network (RNN)\nfor automatic speech recognition, and experi-mental results show that\nquantization can improve the accuracy by 1%, 1.95%, 4.23% on the three\napplicationsrespectively with 3.5x-6.4x memory reduction.\n'},
        {paper_id: 'f570111-04bc-49fa-b2d4-56447ca1bd9b', title: 'Quantization of Deep Neural Networks for Accurate Edge Computing', score: '9', author: 'Wentao Chen', date: '2021-04-25', abstract: 'Deep neural networks (DNNs) have demonstrated their great potential in recent\nyears, exceeding the per-formance of human experts in a wide range of\napplications. Due to their large sizes, however, compressiontechniques such as\nweight quantization and pruning are usually applied before they can be\naccommodated onthe edge. It is generally believed that quantization leads to\nperformance degradation, and plenty of existingworks have explored quantization\nstrategies aiming at minimum accuracy loss. In this paper, we argue\nthatquantization, which essentially imposes regularization on weight\nrepresentations, can sometimes help toimprove accuracy. We conduct\ncomprehensive experiments on three widely used applications: fully con-nected\nnetwork (FCN) for biomedical image segmentation, convolutional neural network\n(CNN) for imageclassification on ImageNet, and recurrent neural network (RNN)\nfor automatic speech recognition, and experi-mental results show that\nquantization can improve the accuracy by 1%, 1.95%, 4.23% on the three\napplicationsrespectively with 3.5x-6.4x memory reduction.\n'}],
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
        console.log('getres')
        this.documents = []
        var res = (await fetchCollectedPapers()).data
        console.log(res)
        console.log(res.total)
        console.log(res.papers)
        this.documents = res.papers
        // for (let i = 1; i <= res.total; i++) {
        //   console.log('i=')
        //   console.log(res.papers[i])
        //   this.documents.push(
        //     {
        //       title: res.papers[i].title,
        //       id: res.papers[i].paper_id,
        //       abstract: res.papers[i].abstract,
        //       author: res.papers[i].author[0],
        //       date: res.papers[i].publication_date,
        //       score: res.papers[i].score
        //     }
        //   )
        // }
      } catch (error) {
        console.log(error.message)
      }
    },
    async deleteDocument (id) {
      // eslint-disable-next-line camelcase
      var paper_ids = []
      paper_ids.push(id)
      try {
        var data = {paper_ids}
        var res = await deleteCollectedPapers({data})
        console.log(res)
        this.paper_ids = []
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
    transauthors (authors) {
      var str = ''
      authors.forEach(element => {
        str = str + element + ','
      })
      var ans = this.truncateAbstract(str, 20)
      return ans
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
  border: 1px solid rgb(36, 120, 231);
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
