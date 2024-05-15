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
      console.log(this.selectedTab)
    }
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
.personal::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%; /* 占据底部1/3高度 */
  background-image: url('../../assets/personal-back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  z-index: -1; /* 确保背景图片在内容后面 */
}
</style>
