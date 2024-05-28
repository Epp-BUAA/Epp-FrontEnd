<template>
  <div class="searchPage">
    <el-row style="margin-top: 30px;">
      <!-- 推荐文献卡片滑动框 -->
      <el-carousel :interval="4000" arrow="none" indicator-position="none">
        <el-carousel-item v-for="(item, index) in recommendations" :key="index">
          <div class="recommendation-card">
            <img class="hot_icon" src="../../assets/icon/hotpaper.svg" alt="icon" />
            <div class="content">
               <div class="title-container">
                <h4 class="title">{{ item.title }}</h4>
                <div class="subfield">{{ item.sub_classes[0] }}</div>
              </div>
              <div class="info">
                <div class="info-item">
                  <i class="el-icon-document"></i>
                  引用数: {{ item.citation_count }}
                </div>
                <div class="info-item">
                  <i class="el-icon-view"></i>
                  阅读量: {{ item.read_count }}
                </div>
                <div class="info-item">
                  <i class="el-icon-star-off"></i>
                  收藏数: {{ item.collect_count }}
                </div>
                <div class="info-item">
                  <i class="el-icon-like"></i>
                  点赞数: {{ item.like_count }}
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <!-- 打字机效果的文字 -->
      <div class="typewriter">
        <h2>搜索更简单,啦啦啦啦啦</h2>
      </div>

      <!-- 搜索框 -->
      <el-col :span="20" :offset="2">
        <search-input />
      </el-col>
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
  width: 80%;
  height: 13rem;
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
  background: #fff;
  padding: 1.6rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
  position: relative;
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
</style>
