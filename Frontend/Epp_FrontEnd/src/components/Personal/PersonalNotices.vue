<template>
  <div class="collections">
    <h1>通知消息</h1>
    <div  class="unread">未读消息总数：{{ unreadSum }}</div>
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>日期</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notification in notifications" :key="notification.notification_id">
          <td><a href="#" @click="showModal(notification)">{{ notification.title }}</a></td>
          <!-- <td>{{ document.title }}</td> -->
          <td>{{ notification.date }}</td>
          <td>
            <b-form-checkbox v-model="notification.is_read" switch @change="toggleRead(notification)"></b-form-checkbox>
          </td>
           <td><a href="#" @click="deleteDocument(notification.notification_id)">删除</a></td> <!-- 删除链接 -->
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </div>
     <b-modal v-model="modalShow" title="消息内容">
      <p>{{ selectedNotification.content }}</p>
    </b-modal>
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
      unreadSum: 0,
      modalShow: false,
      selectedNotification: {}
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
        var params = { mode: parseInt(id) }
        if (id === 2) {
          console.log(2)
          var res = (await fetchNotification({params})).data
          this.notifications = res.notifications
        } else {
          console.log(id)
          res = (await fetchNotification({params})).data
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
        var data = {notification_ids}
        var res = await deleteNotification({data})
        console.log(res)
      } catch (error) {
        console.log('error:deleteNotification')
      }
      this.fetchDocuments(1)
      this.fetchDocuments(2)
    },
    async read (id) {
      try {
        var data = {notification_id: id}
        await readNotification(data)
        this.fetchDocuments(1)
      } catch (error) {
        console.log('error:read')
      }
    },
    changePage (page) {
      this.currentPage = page
    },
    showModal (notification) {
      this.read(notification.notification_id)
      this.selectedNotification = notification
      this.toggleRead(notification)
      this.modalShow = true
    },
    toggleRead (notification) {
      notification.is_read = true
      this.read(notification.notification_id)
    }
  },
  mounted () {
    this.fetchDocuments(1)
    this.fetchDocuments(2)
  }
}
</script>

<style scoped>
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
