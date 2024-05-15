<template>
  <div class="profile">
    <el-card class="user-info">
      <el-card class="inside-card">
        <img class="avatar" :src="path" alt="User Avatar">
        <div class="text-container">
          <p>{{ greeting }} ，{{ username }}！</p>
        </div>
      </el-card>
    </el-card>
    <el-card class="other-info">
      <div class="other-text">
        <el-statistic title="登录时间">
          <template slot="formatter">
            <i
              class="el-icon-stopwatch"
            ></i>
            {{ loginTime }}
          </template>
        </el-statistic>
        <el-statistic title="收藏数">
          <template slot="formatter">
            <i
              class="el-icon-star-off"
            ></i>
            {{ favorites }}
          </template>
        </el-statistic>
        <el-statistic title="点赞数">
          <template slot="formatter">
            <i
              class="el-icon-goods"
            ></i>
            {{ likes }}
          </template>
        </el-statistic>
      </div>
    </el-card>
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
      likes: 20,
      greeting: '你好'
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
        // 设置问候语
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) {
          this.greeting = '🌞早上好'
        } else if (hour >= 12 && hour < 18) {
          this.greeting = '🌻下午好'
        } else if (hour >= 18 && hour < 24) {
          this.greeting = '⭐晚上好'
        } else {
          this.greeting = '🌃夜深了'
        }
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

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  margin-left: 10px;
  height: 480px;
  width: 980px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  background-image: url('../../assets/library.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.avatar {
  width: 100px; /* 设置头像的宽度 */
  height: 100px; /* 设置头像的高度 */
  border-radius: 50%; /* 设置头像为圆形 */
  margin-top: 100px; /* 设置头像与下方元素的间距 */
  margin-bottom: 5px;
  object-fit: cover;
}
.user-info p {
  margin: 5px 0;
  font-size: 18px;
}

.user-info p:first-child {
  font-size: 20px;
  font-weight: bold;
}

.text-container {
  text-align: center;
}

.inside-card {
  background-color: rgba(246, 247, 248, 0.65);
  border-radius: 12px;
  border: 0cap;
  bottom: 50%;
  width: 300px;
  height: 300px;
  transform: translateY(-50%);
  padding: 10px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影效果，提升层次感 */
}

.other-info {
  display: flex;
  justify-content: space-around;
  background-color: rgba(246, 247, 248, 0.65);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 0cap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影效果，提升层次感 */
  margin-left: 10px;
  height: 160px;
  width: 900px;
  padding: 20px;
  border-radius: 12px;
  transform: translateY(-50%);
}
.other-text {
  display: flex;
  justify-content: space-around;
  width: 800px;
}
</style>
