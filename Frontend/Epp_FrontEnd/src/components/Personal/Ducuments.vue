<template>
  <div class="collections">
    <h1>文件列表</h1>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.document_id">
          <td><router-link :to="'/document/' + document.document_id">{{ document.title }}</router-link></td>
          <!-- <td>{{ document.title }}</td> -->
          <td>{{ document.date }}</td>
           <td><a href="#" @click="deleteDocument(document.document_id)">删除</a></td> <!-- 删除链接 -->
           <td><a href='#' @click="downloadDocument(document.document_id)">下载</a></td>
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
export default {
  data () {
    return {
      documents: [{document_id: '0000f570-04bc-49fa-b2d4-56447ca1bd9b', title: 'Quantization of Deep Neural Networks for Accurate Edge Computing', score: '9', author: 'Wentao Chen', date: '2021-04-25', abstract: 'Deep neural networks (DNNs) have demonstrated their great potential in recent\nyears, exceeding the per-formance of human experts in a wide range of\napplications. Due to their large sizes, however, compressiontechniques such as\nweight quantization and pruning are usually applied before they can be\naccommodated onthe edge. It is generally believed that quantization leads to\nperformance degradation, and plenty of existingworks have explored quantization\nstrategies aiming at minimum accuracy loss. In this paper, we argue\nthatquantization, which essentially imposes regularization on weight\nrepresentations, can sometimes help toimprove accuracy. We conduct\ncomprehensive experiments on three widely used applications: fully con-nected\nnetwork (FCN) for biomedical image segmentation, convolutional neural network\n(CNN) for imageclassification on ImageNet, and recurrent neural network (RNN)\nfor automatic speech recognition, and experi-mental results show that\nquantization can improve the accuracy by 1%, 1.95%, 4.23% on the three\napplicationsrespectively with 3.5x-6.4x memory reduction.\n'},
        {document_id: '0000f570-04bc-49fa-b2d4-56447ca1bd9b', title: 'Quantization of Deep Neural Networks for Accurate Edge Computing', score: '9', author: 'Wentao Chen', date: '2021-04-25', abstract: 'Deep neural networks (DNNs) have demonstrated their great potential in recent\nyears, exceeding the per-formance of human experts in a wide range of\napplications. Due to their large sizes, however, compressiontechniques such as\nweight quantization and pruning are usually applied before they can be\naccommodated onthe edge. It is generally believed that quantization leads to\nperformance degradation, and plenty of existingworks have explored quantization\nstrategies aiming at minimum accuracy loss. In this paper, we argue\nthatquantization, which essentially imposes regularization on weight\nrepresentations, can sometimes help toimprove accuracy. We conduct\ncomprehensive experiments on three widely used applications: fully con-nected\nnetwork (FCN) for biomedical image segmentation, convolutional neural network\n(CNN) for imageclassification on ImageNet, and recurrent neural network (RNN)\nfor automatic speech recognition, and experi-mental results show that\nquantization can improve the accuracy by 1%, 1.95%, 4.23% on the three\napplicationsrespectively with 3.5x-6.4x memory reduction.\n'}],
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
        var res = (await fetchDocument()).data
        this.documents = res.documents
      } catch (error) {
        console.log('error')
      }
    },
    async deleteDocument (id) {
      try {
        var params = {paper_id: id}
        var res = await deleteDocument(params)
        console.log(res)
      } catch (error) {
        console.log('error')
      }
      this.fetchDocuments()
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
