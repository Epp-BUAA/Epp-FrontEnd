<template>
  <div class="user-info">
    <img class="avatar" :src="path" alt="User Avatar">
      <div class="text-container">
    <p>用户名：{{ username }}</p>
    <p>登录时间: {{ loginTime }}</p>
    <p>收藏数: {{ favorites }}</p>
    <p>点赞数: {{ likes }}</p>
      </div>
  </div>
</template>

<script>
import { fetchUserInfo } from '@/request/userRequest.js'
export default {
  data () {
    return {
      path: '',
      username: 'John Doe',
      loginTime: '2024-04-24 10:00:00',
      favorites: 10,
      likes: 20
    }
  },
  methods: {
    async getUserInfo () {
      try {
        console.log('getuserinformation')
        var res = (await fetchUserInfo()).data
        console.log(res)
        this.path = 'https://epp.buaase.cn' + res.avatar
        console.log(this.path)
        this.username = res.username
        this.loginTime = res.registration_date
        this.favorites = res.collected_papers_cnt
        this.likes = res.liked_papers_cnt
        console.log(res)
      } catch (error) {
        console.log(error)
        console.log('getUserInfoError')
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style>
.user-info {
  height: 400px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  /* background-color: #f9f9f9; */
  background-image: url('../../assets/card.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.avatar {
  margin-left: 50px;
  width: 100px; /* 设置头像的宽度 */
  height: 90px; /* 设置头像的高度 */
  border-radius: 50%; /* 设置头像为圆形 */
  margin-bottom: 20px; /* 设置头像与下方元素的间距 */
  object-fit: cover;
}
.user-info p {
  margin: 5px 0;
  font-size: 18px;
  color: #5271ff;
}

.user-info p:first-child {
  font-size: 24px;
  font-weight: bold;
}
.text-container {
  margin-left: 50px; /* 设置文字与容器左端的距离 */
  text-align: left;
}

/* 可以继续添加样式来美化页面 */
</style>
