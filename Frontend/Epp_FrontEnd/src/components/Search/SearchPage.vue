<template>
  <div class="searchPage">
    <el-row style="margin-top: 30px;">
      <!-- 打字机效果的文字 -->
      <div class="typewriter">
        <h2>搜索更简单，啦啦啦啦啦</h2>
      </div>

      <!-- 搜索框 -->
      <el-col :span="20" :offset="2">
        <search-input />
      </el-col>
      <div class="hot_title">
        <h3>热门文献推荐</h3>
        </div>
      <!-- 推荐文献卡片滑动框 -->
      <el-carousel :interval="4000" arrow="none" indicator-position="none">
        <el-carousel-item v-for="(item, index) in recommendations" :key="index">
          <div class="recommendation-card">
            <img class="hot_icon" src="../../assets/icon/hotpaper.svg" alt="icon" />
            <div class="content">
               <div class="title-container">
                <router-link :to="{ name: 'paper-info', params: { paper_id: item.paper_id } }" class="title">
          {{ item.title }}
        </router-link>
                <div class="subfield">{{ item.sub_classes[0] }}</div>
              </div>
              <div class="info">
                <div class="info-item">
                  <img src="../../assets/icon/citate.svg" alt="citate" class="info-icon">
                  引用数: {{ item.citation_count }}
                </div>
                <div class="info-item">
                  <img src="../../assets/icon/read.svg" alt="read" class="info-icon">
                  阅读量: {{ item.read_count }}
                </div>
                <div class="info-item">
                  <img src="../../assets/icon/collect.svg" alt="collect" class="info-icon">
                  收藏数: {{ item.collect_count }}
                </div>
                <div class="info-item">
                  <img src="../../assets/icon/good.svg" alt="good" class="info-icon">
                  点赞数: {{ item.like_count }}
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import SearchInput from './SearchInput.vue'

export default {
  components: {
    'search-input': SearchInput
  },
  data () {
    return {
      recommendations: []
    }
  },
  created () {
    this.fetchRecommend()
  },
  methods: {
    fetchRecommend () {
      axios
        .get(this.$BASE_API_URL + '/paperRecommend')
        .then(response => {
          this.recommendations = response.data.papers
        })
        .catch(error => {
          console.error('Error', error)
        })
    },
    truncateTitle (abstract, maxLength) {
      if (abstract.length > maxLength) {
        return abstract.substring(0, maxLength) + '...'
      }
      return abstract
    },
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    }
  }
}
</script>

<style scoped>
.searchPage {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
   padding-top: 2.5rem;
  min-height: 100vh;
  background-image: url('../../assets/dashboardBack2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.el-carousel {
  margin-top: 0rem;
  width: 80%;
  height: 11rem;
  margin-left: 10%;
  overflow-y: hidden;
}
.el-row {
  width: 100%;
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommendation-card {
  display: flex;
  align-self: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 1.6rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
  position: relative;
   transition: transform 0.3s ease;
}
.hot_title{
  margin-top: 7rem;
  text-align: center;
  font-size: 2rem; /* 调整字体大小 */
  color: #cd5b4c;
  font-family: '微软雅黑', 'Microsoft YaHei', sans-serif;
  font-weight: bold;
  display: flex;
  justify-content: center;
  width: 100%;
}
.hot_icon {
  width: 5rem;
  height: 5rem;
  margin-right: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.subfield {
  background-image: url('../../assets/dashboardBack3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-attachment: fixed;
  padding: 1rem 1rem;
  border-radius: 3px;
  font-size: 1rem;
  text-align: center;
  width: 30%;
  color: rgb(97, 93, 93);
}

.title {
  color: #409EFE;
  margin: 0;
  /* width: 80%; */
  font-size: 16px;
}

.title:hover {
  color: #0056b3; /* Change the color to a darker shade on hover */
}

.info {
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #606266;
}

.info-item i {
  margin-right: 0.2rem;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.el-carousel__arrow {
  margin: 0 10px;
}

.el-carousel-indicator {
  margin: 0 5px;
}

.info-item .info-icon {
  width: 1rem; /* Set the width of the icon */
  height: 1rem; /* Set the height of the icon */
  margin-right: 0.2rem; /* Add some spacing between the icon and the text */
}

.typewriter {
  margin-top: 5rem;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 2.5rem; /* Full viewport height to center vertically */
  margin-bottom: 2rem;
}

.typewriter h2 {
  color: #409EFE;
   font-family: '微软雅黑', 'Microsoft YaHei', sans-serif; /* Sets the font to 微软雅黑 */
  font-weight: bold; /* Sets the font weight to bold */
  overflow: hidden; /* Ensures the text is not visible outside its containing element */
  border-right: 0.15em solid #409EFE; /* Creates the typewriter cursor effect */
  white-space: nowrap; /* Prevents the text from wrapping */
  margin-left: 35%;
  margin-right: 35%;
  animation: typing 4s steps(40, end) infinite, blink-caret 0.75s step-end infinite; /* Typing animation with infinite loop */
  animation-fill-mode: forwards; /* Ensures element retains final state after animation */
}

@keyframes typing {
  0% {
    width: 0; /* Start with no width (text is invisible) */
  }
  50% {
    width: 100%; /* Text is fully visible */
  }
  100% {
    width: 0; /* Text disappears again */
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent; /* Start and end with invisible cursor (no border color) */
  }
  50% {
    border-color: #409EFE; /* Blinking cursor */
  }
}

</style>
