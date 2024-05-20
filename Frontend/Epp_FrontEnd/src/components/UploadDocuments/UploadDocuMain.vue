<template>
<div class="uploadDocu">
  <div id="uploadDocu-main">
    <Sidebar @tabSelected="selectTab" />
    <div class="content">
      <Upload v-if="selectedTab === 'upload'" />
      <Documents v-else-if="selectedTab === 'documents'" />
    </div>
  </div>
</div>
</template>

<script>
import Sidebar from '@/components/UploadDocuments/UploadDocuNavbar.vue'
import Upload from '@/components/UploadDocuments/Upload.vue'
import Documents from '@/components/UploadDocuments/Documents.vue'

export default {
  name: 'uploadDocuMain',
  components: {
    Sidebar,
    Upload,
    Documents
  },
  data () {
    return {
      selectedTab: 'upload' // 默认选中“我的信息”
    }
  },
  methods: {
    selectTab (tabName) {
      this.selectedTab = tabName
    }
  },
  mounted () {
    const selectedTab = localStorage.getItem('selectedUploadDocuTab')
    if (selectedTab) {
      this.selectedTab = selectedTab
    }
  }
}
</script>

<style scoped>
#uploadDocu-main {
  display: flex;
}
.content {
  flex: 1;
  padding: 20px;
}
.uploadDocu{
  position: absolute;
  top: 35px; /* 假设导航栏高度为50px */
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
}
.uploadDocu::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120%;
  background-image: url('../../assets/personal-back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  z-index: -1; /* 确保背景图片在内容后面 */
}
</style>
