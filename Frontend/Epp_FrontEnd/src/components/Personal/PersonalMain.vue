<template>
<div class="personal">
  <div id="app">
    <sidebar @tabSelected="selectTab" />
    <div class="content">
      <personal-info v-if="selectedTab === 'personal'" />
      <ai-conversations v-else-if="selectedTab === 'ai'" />
      <search-records v-else-if="selectedTab === 'search'" />
      <my-reports v-else-if="selectedTab === 'reports'" />
      <CollectedPapers v-else-if="selectedTab === 'collections'" />
      <!-- <CollectedPapers v-else-if="selectTab === 'collections'" /> -->
    </div>
  </div>
</div>
</template>

<script>
import Sidebar from '@/components/Personal/PersonalNavbar.vue'
import PersonalInfo from '@/components/Personal/PersonalInfo.vue'
import AiConversations from '@/components/Personal/PersonalChat.vue'
import SearchRecords from '@/components/Personal/PersonalSearch.vue'
import MyReports from '@/components/Personal/PersonalReport.vue'
import CollectedPapers from '@/components/Personal/PersonalCollections.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    PersonalInfo,
    AiConversations,
    SearchRecords,
    MyReports,
    CollectedPapers
  },
  data () {
    return {
      selectedTab: 'personal' // 默认选中“我的信息”
    }
  },
  methods: {
    selectTab (tabName) {
      this.selectedTab = tabName
    }
  }
}
</script>

<style>
#app {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}
.personal{
  position: absolute;
  top: 36px; /* 假设导航栏高度为50px */
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  overflow: auto; /* 如果内容过多，添加滚动条 */
}
</style>
