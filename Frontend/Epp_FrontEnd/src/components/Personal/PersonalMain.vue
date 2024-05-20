<template>
<div class="personal">
  <div id="personal-main">
    <sidebar @tabSelected="selectTab" />
    <div class="content">
      <PersonalInfo v-if="selectedTab === 'personal'" />
      <AiConversations v-else-if="selectedTab === 'ai'" />
      <SearchRecords v-else-if="selectedTab === 'search'" />
      <MyReports v-else-if="selectedTab === 'reports'" />
      <CollectedPapers v-else-if="selectedTab === 'collections'" />
      <Notifications v-else-if="selectedTab === 'notices'" />
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
import Notifications from '@/components/Personal/PersonalNotices.vue'

export default {
  name: 'PersonalMain',
  components: {
    Sidebar,
    PersonalInfo,
    AiConversations,
    SearchRecords,
    MyReports,
    CollectedPapers,
    Notifications
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
  },
  created () {
    const selectedTab = localStorage.getItem('selectedPersonalTab')
    if (selectedTab) {
      this.selectedTab = selectedTab
    }
  },
  destroyed () {
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    localStorage.removeItem('loginTime')
    localStorage.removeItem('favorites')
    localStorage.removeItem('likes')
  }
}
</script>

<style scoped>
#personal-main {
  display: flex;
}
.content {
  flex: 1;
  padding: 20px;
  margin-left: 150px; /* 侧边栏宽度 */
}
.personal{
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  padding-top: 50px;
  min-height: 100vh;
  background-image: url('../../assets/personal-back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-attachment: fixed;
}
</style>
