<template>
  <div class="collections">
    <h1>通知消息</h1>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notification in notifications" :key="notification.notification_id">
          <td><router-link :to="'/document/' + notification.id">{{ notification.title }}</router-link></td>
          <!-- <td>{{ document.title }}</td> -->
          <td>{{ notification.date }}</td>
           <td><a href="#" @click="deleteDocument(notification.notification_id)">删除</a></td> <!-- 删除链接 -->
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </div>
  </div>
</template>

<script>
import { fetchNotification, deleteNotification, readNotification } from '@/request/userRequest.js'
export default {
  data () {
    return {
      notifications: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      unreadSum: 0
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
    async fetchDocuments (id) {
      try {
        var params = { mode: id }
        if (id === 1) {
          console.log(1)
          var res = (await fetchNotification(params)).data
          this.notifications = res.notifications
        } else {
          res = (await fetchNotification(params)).data
          this.unreadSum = res.total
        }
      } catch (error) {
        console.log('error:fetchDocuments')
      }
    },
    async deleteDocument (id) {
      try {
        // eslint-disable-next-line camelcase
        var notification_ids = []
        notification_ids.push(id)
        var params = {notification_ids}
        var res = await deleteNotification(params)
        console.log(res)
      } catch (error) {
        console.log('error:deleteNotification')
      }
      this.fetchDocuments(1)
      this.fetchDocuments(2)
    },
    async read (id) {
      try {
        var params = {notification_id: id}
        await readNotification(params)
        this.fetchDocuments(2)
      } catch (error) {
        console.log('error:read')
      }
    },
    changePage (page) {
      this.currentPage = page
    }
  },
  mounted () {
    this.fetchDocuments(1)
    this.fetchDocuments(2)
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
