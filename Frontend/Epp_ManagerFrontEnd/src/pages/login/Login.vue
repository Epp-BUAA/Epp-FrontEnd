<template>
  <div class="login-register">
    <!-- <h2 v-if="isLogin">登录</h2>
    <h2 v-else>注册</h2> -->
      <div class="input-group">
      <label>
        用户名:
        <input type="text" v-model="username" required>
      </label>
      </div>
      <div class="input-group">
      <label>
        密码:
        <input type="password" v-model="password" required>
      </label>
      </div>
    <!-- </form> -->
    <form @submit.prevent="handleSubmit"  class="form">
    <div class="button-group">
    <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
    <button @click="toggleMode">{{ isLogin ? '注册新账号' : '使用已有账号登录' }}</button>
    </div>
    </form>
     <p :class="{ 'login-message': message }">{{ message }}</p>
  </div>
</template>

<script>

import { login } from '@/services/user.js'

export default {
  data () {
    return {
      isLogin: true,
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (this.isLogin) {
          var params = {
            'managerName': this.username,
            'manpassowrd': this.password
          }
          var res = await login(params)
          console.log(res.message)
          this.message = res.data.message
          this.$router.push('/dashboard')
        } else {
          params = {
            'username': this.username,
            'password': this.password
          }
          res = await register(params)
          console.log(res)
          this.message = res.data.message
        }
      } catch (error) {
        console.log('error')
        if (this.isLogin) {
          this.message = '登录失败'
        } else {
          this.message = '注册失败'
        }
      }
    },
    toggleMode () {
      this.isLogin = !this.isLogin
      this.username = ''
      this.password = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
.login-register {
  height: 400px;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  /* border: 1px solid #ccc; */
  /* border-radius: 5px; */
  /* background-image: url('../../assets/loginBoard.png'); */
  background-size: cover;
  background-position: center;
}

.form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-top: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.input-group label {
  flex: 1;
}

.input-group input {
  flex: 3;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.button-group button {
  margin-bottom: 20px;
  padding: 8px 12px;
  font-size: 16px;
  background-color: #0cc0df;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 48%; /* 让两个按钮平分宽度 */
}

.button-group button:hover {
  background-color: #0056b3;
}

.login-message {
  margin-top: 10px;
  font-size: 24px;
  color: red;
}
</style>
