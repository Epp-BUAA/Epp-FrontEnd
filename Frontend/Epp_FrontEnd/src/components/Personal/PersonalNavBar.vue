<template>
  <div class="sidebar">
    <h1>个人中心</h1>
    <ul>
      <li @click="selectTab('personal')">我的信息</li>
      <li @click="selectTab('ai')">AI对话</li>
      <li @click="selectTab('search')">搜索记录</li>
      <li @click="selectTab('reports')">我的报告</li>
      <li @click="selectTab('collections')">收藏夹</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    selectTab (tabName) {
      this.$emit('tabSelected', tabName) // 发送事件通知父组件选中了哪个选项
    }
  }
}
</script>

<style>
.sidebar {
  width: 150px;
  height:100%;
  background-color: white;
  border-radius: 15px;
}

.sidebar h1 {
  text-align: center; /* 标题居中显示 */
  padding: 10px 0; /* 上下留出一定的空白 */
  margin-bottom: 20px; /* 与导航栏之间的间距 */
  border-bottom: 1px solid #ccc; /* 添加底部边框 */
  font-size: 30px;
  color:#0cc0df;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  color: aliceblue;
  padding: 10px;
  cursor: pointer;
  background: #15d189;
  transition: background-color 0.3s, border-color 0.3s; /* 添加border-color的过渡效果 */
  border: 1px solid #15d163; /* 初始状态下边框透明 */
  border-radius: 15px;
}

.sidebar li:hover {
  background-color: #248cec; /* 鼠标悬停时的背景色 */
  border-color: #1900ff; /* 鼠标悬停时的边框颜色 */
}

.sidebar li:active {
  background-color: #007bff; /* 当前选项的背景色 */
  color: black; /* 当前选项的文字颜色 */
  border-color: #007bff; /* 当前选项的边框颜色 */
}

.sidebar li:not(:last-child) {
  margin-bottom: 18px; /* 选项之间的间距 */
}
</style>
