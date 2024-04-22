<template>
  <div class="sidebar">
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
  width: 200px;
  background-color: #f0f0f0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
}
</style>
