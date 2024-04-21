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
                            <div style="width: 90%; margin: auto;">
                                <p><strong>摘要:</strong> {{ paper.abstract }}</p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="buttons">
                        <el-button type="text" icon="el-icon-thumb" @click="likePaper">点赞</el-button>
                        <el-button type="text" icon="el-icon-chat-dot-round"
                            @click="showCommentModal = true">评论</el-button>
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
                            <el-rate
                                v-model="paper.score"
                                disabled
                                show-score
                                text-color="#ff9900"
                            >
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
                            <el-row v-for="comment in comments" :key="comment.id" class="comment-item">
                                <el-col :span="4">
                                    <img :src="comment.avatar" alt="user avatar" class="avatar">
                                </el-col>
                                <el-col :span="20">
                                    <div class="comment-content">
                                        <div style="font-weight: bold;">{{ comment.username }}</div>
                                        <div class="text">{{ comment.comment }}</div>
                                        <div class="my-footer">
                                            <span class="date">{{ comment.date }}</span>
                                            <span class="actions">
                                                <el-button type="text" icon="el-icon-chat-dot-round"
                                                    @click="commentAction(comment.id)">评论</el-button>
                                                <el-button type="text" icon="el-icon-thumb"
                                                    @click="likeAction(comment.id)">点赞</el-button>
                                                <el-button type="text" icon="el-icon-warning-outline"
                                                    @click="likeAction(comment.id)">举报</el-button>
                                            </span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <p v-else>暂无评论</p>
                    </div>
                </el-container>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      paper: {},
      newComment: '',
      comments: [],
      showCommentModal: false,
      newScore: 0,
      showScoreModal: false
    }
  },
  created () {
    this.fetchPaperInfo()
    this.fetchComments()
  },
  methods: {
    fetchPaperInfo () {
      console.log('传递过来的paper id:', this.paper_id)
      console.log(this.id)
      // 向后端传送id，返回论文结果
      //   axios.post(this.$backend_url + '/xxxx', this.id)
      //     .then((response) => {
      //       console.log('response is ...')
      //       this.paper = response.data.paper_info
      //       console.log(this.paper)
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error)
      //     })
      this.paper = {
        'title': 'AAAAAAAA',
        abstract: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'publication_date': 'Mon, 19 Oct 2020 00:00:00 GMT',
        'authors': 'jkm',
        'original_url': 'http://arxiv.org/abs/2309.15477v1',
        'score': 3.5,
        'score_count': 99
      }
    },
    fetchComments () {
      // 向后端传送id，返回论文结果
      //   axios.get(this.$backend_url + '/xxxx', this.id)
      //     .then((response) => {
      //       console.log('response is ...')
      //       this.comments = response.data.comments
      //       console.log(this.comments)
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error)
      //     })
      this.comments = [{ 'comment_id': 1, 'comment': 'commen1', 'comment_level': 1, 'username': 'jkm', 'date': '2023-01-01' },
        { 'comment_id': 2, 'comment': 'comment2', 'comment_level': 1, 'username': 'ybw', 'date': '2024-01-01' }]
    },
    likePaper () {
      // 实现点赞功能
      alert('点赞功能尚未实现！')
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
    width: 100%;
    border-radius: 50%;
}

.comment-content {
    padding: 10px;
    text-align: left;
}

.text {
    margin: 10px 0;
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
