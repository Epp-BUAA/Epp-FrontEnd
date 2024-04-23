<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="20">
                <!-- 论文部分 -->
                <el-container class="box" style="margin-top: 20px;">
                    <el-row class="header">
                        {{ paper.title }}
                    </el-row>
                    <el-row>
                        <p><strong>作者:</strong> {{ paper.authors }}</p>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-col :span="24">
                            <div style="width: 90%; margin: auto; text-align: left;">
                                <p><strong>摘要:</strong> {{ paper.abstract }}</p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="buttons">
                        <el-button type="text" @click="likePaper">
                            <i :class="liked ? 'fas' : 'far' " class="fa-thumbs-up"></i>
                            {{ paper.like_count }}
                        </el-button>
                        <el-button type="text" icon="el-icon-chat-dot-round"
                            @click="showCommentModal = true">{{ comments.length }}</el-button>
                        <el-button type="text" icon="el-icon-download" @click="downloadPaper">下载</el-button>
                        <el-button type="text" icon="el-icon-view" @click="readOnline">在线研读</el-button>
                        <el-link type="primary" :href="paper.original_url" icon="el-icon-link"
                            style="margin-left: 10px;">原文链接</el-link>
                    </el-row>
                </el-container>

                <!-- 评分部分 -->
                <el-container class="box">
                    <el-row>
                        <el-col :span="8" style="justify-content: center; text-align: center">
                            <el-rate v-model="paper.score" disabled show-score text-color="#ff9900">
                            </el-rate>
                            <p>{{ paper.score_count }}个评分</p>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" icon="el-icon-edit-outline"
                                @click="showScoreModal = true">我要评分</el-button>
                        </el-col>
                        <el-dialog title="我要评分" :visible.sync="showScoreModal" width="50%" @close="closeScoreModal">
                            <el-form>
                                <el-form-item>
                                    <el-rate v-model="newScore"></el-rate>
                                </el-form-item>
                            </el-form>
                            <span slot="footer">
                                <el-button @click="showScoreModal = false">取 消</el-button>
                                <el-button type="primary" @click="submitScore">发 送</el-button>
                            </span>
                        </el-dialog>
                    </el-row>
                </el-container>

                <!-- 评论区 -->
                <el-container class="box" style="margin-top: 20px">
                    <!-- 评论弹窗 -->
                    <el-dialog title="发表评论" :visible.sync="showCommentModal" width="50%" @close="closeCommentModal">
                        <el-form>
                            <el-form-item>
                                <el-input type="textarea" placeholder="添加评论..." v-model="newComment" autosize>
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer">
                            <el-button @click="showCommentModal = false">取 消</el-button>
                            <el-button type="primary" @click="submitComment">发 送</el-button>
                        </span>
                    </el-dialog>
                    <el-divider>评论区</el-divider>
                    <div class="comments">
                        <div v-if="comments.length > 0">
                            <!-- 一级评论 -->
                            <div v-for="comment in comments" :key="comment.comment_id" class="comment-item">
                                <el-row>
                                    <el-col :span="2">
                                        <img :src="fullURL(comment.user_image)" alt="user avatar" class="avatar">
                                    </el-col>
                                    <el-col :span="22">
                                        <div class="comment-content">
                                            <div style="font-weight: bold;">{{ comment.username }}</div>
                                            <div class="text">{{ comment.text }}</div>
                                            <div class="my-footer">
                                                <span class="date">{{ comment.date }}</span>
                                                <span class="actions">
                                                    <el-button type="text" icon="el-icon-chat-dot-round"
                                                        @click="commentAction(comment.comment_id)">评论</el-button>
                                                    <el-button type="text" icon="el-icon-thumb"
                                                        @click="likeAction(comment.comment_id)">点赞</el-button>
                                                    <el-button type="text" icon="el-icon-warning-outline"
                                                        @click="likeAction(comment.comment_id)">举报</el-button>
                                                    <el-button type="text" icon="el-icon-arrow-down"
                                                        @click="showRepliesAction(comment.comment_id)">展开</el-button>
                                                </span>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>

                                <!-- 二级评论部分 -->
                                <div v-show="showRepliesCommentId === comment.comment_id">
                                    <div v-if="secondLevelComments.length > 0">
                                        <div v-for="comment2 in secondLevelComments" :key="comment2.comment_id" class="comment-item">
                                            <el-row>
                                                <el-col :span="2" :offset="2">
                                                    <img :src="fullURL(comment2.user_image)" alt="user avatar" class="avatar">
                                                </el-col>
                                                <el-col :span="20">
                                                    <div class="comment-content">
                                                        <div style="font-weight: bold;">{{ comment2.username }}</div>
                                                        <div class="text">
                                                            <!-- 后续加上跳转到用户个人中心的功能 -->
                                                            <router-link
                                                                v-if="comment2.to_username"
                                                                :to="{ name: '', params: { username: comment2.to_username }}">
                                                                @{{ comment2.to_username }}
                                                            </router-link>
                                                            {{ comment2.text }}
                                                        </div>
                                                        <div class="my-footer">
                                                            <span class="date">{{ comment2.date }}</span>
                                                            <span class="actions">
                                                                <el-button type="text" icon="el-icon-chat-dot-round"
                                                                    @click="commentAction(comment2.comment_id)">评论</el-button>
                                                                <el-button type="text" icon="el-icon-thumb"
                                                                    @click="likeAction(comment2.comment_id)">点赞</el-button>
                                                                <el-button type="text" icon="el-icon-warning-outline"
                                                                    @click="likeAction(comment2.comment_id)">举报</el-button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                    <p v-else>暂无评论</p>
                                </div>
                            </div>
                        </div>
                        <p v-else>暂无评论</p>
                    </div>
                </el-container>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    paper_id: {
      type: String,
      required: true
    }
  },
  computed: {
  },
  data () {
    return {
      paper: {},
      liked: false,
      collected: false,
      newComment: '',
      comments: [],
      showCommentModal: false,
      newScore: 0,
      showScoreModal: false,
      showRepliesBox: false,
      showRepliesCommentId: null,
      secondLevelComments: []
    }
  },
  created () {
    this.paper_id = this.$route.params.paper_id
    this.fetchPaperInfo()
    this.fetchComments1()
  },
  methods: {
    fullURL (url) {
      return this.$BASE_URL + url
    },
    fetchUserPaperInfo () {
      axios.get(this.$BASE_API_URL + '/getUserPaperInfo?paper_id' + this.paper_id)
        .then((response) => {
          this.liked = response.data.liked
          this.collected = response.data.liked
          this.user_score = response.data.score
        })
        .catch((error) => {
          console.error('Error', error)
        })
    },
    fetchPaperInfo () {
      console.log('传递过来的paper id:', this.paper_id)
      // 向后端传送id，返回论文结果
      axios.get(this.$BASE_API_URL + '/getPaperInfo?paper_id=' + this.paper_id)
        .then((response) => {
          console.log('paper info is ...')
          this.paper = response.data
          console.log(this.paper)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    fetchComments1 () {
      // 向后端传送id，返回论文结果
      axios.get(this.$BASE_API_URL + '/getComment1?paper_id=' + this.paper_id)
        .then((response) => {
          console.log('一级评论 ...')
          this.comments = response.data.comments
          console.log(this.comments)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    likePaper () {
      this.liked = !this.liked
      this.liked ? this.paper.like_count++ : this.paper.like_count--
      axios.post(this.$BASE_API_URL + '/userLikePaper', {'paper_id': this.paper_id})
        .catch((error) => {
        //   this.liked ? this.paper.like_count-- : this.like_count++
          // 可以在这里处理错误，比如显示错误消息
          console.error('点赞操作失败:', error)
        //   this.liked = !this.liked // 也要回滚点赞状态
        })
    },
    downloadPaper () {
      // 实现下载功能
      alert('下载功能尚未实现！')
    },
    readOnline () {
      // 实现在线阅读功能
      alert('在线研读功能尚未实现！')
    },
    reportComment () {
      alert('举报功能尚未实现')
    },
    closeCommentModal () {
      this.newComment = ''
    },
    submitComment () {
      console.log('提交的评论内容：', this.newComment)
      // 这里可以添加评论提交的逻辑
      this.showCommentModal = false // 关闭对话框
    },
    closeScoreModal (done) {
      this.newScore = 0
    },
    submitScore () {
      console.log('提交的评分内容：', this.newScore)
      // 这里可以添加评论提交的逻辑
      this.showScoreModal = false // 关闭对话框
    },
    showRepliesAction (commentId) {
      if (this.showRepliesCommentId === commentId) {
        this.showRepliesCommentId = null
        return
      }
      console.log('second level comment id is ' + commentId)
      const url = this.$BASE_API_URL + '/getComment2?paper_id=' + this.paper_id + '&comment1_id=' + commentId
      console.log(url)
      axios.get(url)
        .then((response) => {
          this.secondLevelComments = response.data.comments
          console.log(response.data.message)
          console.log('二级评论：', response.data.comments)
          this.showRepliesBox = !this.showRepliesBox
          this.showRepliesCommentId = commentId
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
}
</script>

<style scoped>
.header {
    font-size: 40px;
    text-align: center;
}

.buttons {
    margin-top: 20px;
}

p {
    word-wrap: break-word;
    /* 允许单词在必要时断行 */
}

.avatar {
    width: 50%;
    /* height: 24px; */
    border-radius: 50%;
}

.comment-content {
    text-align: left;
}

.text {
    margin-top: 5px;
}

.my-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.date {
    font-size: 0.85rem;
    color: #666;
}

.actions {
    display: flex;
    align-items: center;
}
</style>
