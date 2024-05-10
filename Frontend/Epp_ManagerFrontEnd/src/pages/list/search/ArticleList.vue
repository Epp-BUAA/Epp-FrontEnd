<template>
  <div>
    <!--<search-form />-->
    <a-card :bordered="false">
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="listData"
      >
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
          <template slot="actions">
            <span @click="handleShow(item.id, item.type)">
              <a-icon type="star-o" style="margin-right: 8px" />
              {{ item.startext }}
            </span>
            <span @click="handleShow(item.id, item.type)">
              <a-icon type="like-o" style="margin-right: 8px" />
              {{ item.liketext }}
            </span>
            <span @click="handleShow(item.id, item.type)">
              <a-icon type="message" style="margin-right: 8px" />
              {{ item.messagetext }}
            </span>
          </template>

          <a-space
            direction="vertical"
            slot="extra"
            width="272"
            align="end"
            style="margin-right:20px;"
          >
            <a-row>
              <a-col :span="24">
                <a-button
                  type="primary"
                  style="width: 80px"
                  @click="handleShow(item.id, item.type)"
                >
                  查看
                </a-button>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="24">
                <a-popconfirm
                  title="确定要删除论文解读吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handleDelete(item.id, item.type)"
                >
                  <a-button type="danger" style="width: 80px"> 删除</a-button>
                </a-popconfirm>
              </a-col>
            </a-row>
          </a-space>
          <a-Modal v-model="showDetail" title="" @ok="handleOk" width="750px">
            <PaperCard v-if="showDetail" v-bind="post" />
          </a-Modal>

          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.title }}</a>
            <a-avatar slot="avatar" :src="item.avatar" />
          </a-list-item-meta>

          <a
            style="display:block"
            class="textbreak"
            href="javascript:void(0)"
            @click="handleShow(item.id, item.type)"
            >{{item.content|ellipsis}}           </a>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
// import SearchForm from "./SearchForm";
import editor from "@/pages/components/editor/editor.vue";
import PaperCard from "./paperCard";
import { getReports, InterpretationIdReq } from "@/services/paper";

const listData = [];

export default {
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 130) {
        return value.slice(0,130) + '...'
      }
      return value
    }
  },
  name: "ArticleList",
  components: { PaperCard, editor},
  data() {
    return {
      loading: true,
      pageIndex: 1,
      data: [],
      totalCnt: 1,
      showCutter: false,
      post: {},
      interpretation: {},
      postType: 0,
      InterpretationeType: 0,
      postSelectType: "论文解读",
      projectTotalCnt: 1,
      projectList: [],
      showDetail: false,
      showModify: false,
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      },
      // actions: [
      //   { type: "star-o", text: "" },
      //   { type: "like-o", text: "" },
      //   { type: "message", text: "" },
      // ],
      actions: [
        { type: "star-o", text: "" },
        { type: "like-o", text: "" },
        { type: "message", text: "" },
      ],
      conjectureRule: {
        content: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
      evidenceRule: {
        content: [{ required: true, message: "请填写内容", trigger: "blur" }],
        citation: [
          { required: true, message: "请填写参考文献", trigger: "blur" },
        ],
        published_year: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入文献年份"));
              } else {
                callback();
              }
            },
          },
        ],
      },
      interpretationRule: {
        content: [{ required: true, message: "请填写内容", trigger: "blur" }],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        citation: [
          { required: true, message: "请填写参考文献", trigger: "blur" },
        ],
        published_year: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入文献年份"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    ToText(HTML) {
      var input = HTML;
      return input
        .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
        .replace(/<[^>]+?>/g, "")
        .replace(/\s+/g, " ")
        .replace(/ /g, " ")
        .replace(/>/g, " ");
    },
    init: async function() {
      this.loadPost();
    },
    handleShow: function(id, type) {
      InterpretationIdReq(id, type, "get")
        .then((res) => {
          // console.log(res)
          this.post = {
            id: res.data.id,
            creator: res.data.created_by,
            kind: type,
            source: res.data.source,
            citation: res.data.citation,
            title: res.data.title,
            createAt: res.data.created_at,
            content: res.data.content,
            tags: res.data.tags,
            isLike: res.data.is_like,
            isCollect: res.data.is_favor,
            likeNumber: res.data.like_num,
            favorNumber: res.data.favor_num,
            commentNum: res.data.commentNum,
            publishedYear: res.data.published_year,
          };
          this.postType = type;
          this.showDetail = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleOk(e) {
      console.log(e);
      this.showDetail = false;
    },
    getSimpleText: function(html) {
      var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      var msg = html.replace(re1, ""); //执行替换成空字符
      return msg;
    },
    loadPost: function() {
      this.loading = true;
      var params = {mode :1}
      getReports({params})
      listData.push({
                href: "javascript:0",
                title: 'jjjj',
                avatar:
                //  " http://122.9.14.73:8000/api/" + res.data[i].userpic,
                  // " http://127.0.0.1:8000/api/" + res.data[i].userpic,
                  " http://116.63.14.146:8000/api/",

                description:
                 'bbbb',
                content: 'cccc',
                startext: 'a',
                liketext: 'e',
                messagetext: 'dd',
                id: 'dd',
                type: 1,
              });
    },
    handleDelete: function(id, type) {
      InterpretationIdReq(id, type, "delete")
        .then((res) => {
          this.pageIndex = 1;
          this.loadPost();
          this.$message.success("成功删除", 3);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleModifyPost: function(id, type) {
      InterpretationIdReq(id, type, "get")
        .then((res) => {
          this.post = res.data;
          this.postType = type;
          this.showModify = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSubmit: function(name) {
      if (name == "interpretation") {
        const params = {
          title: this.post.title,
          content: this.post.content,
          citation: this.post.citation,
          source: this.post.source,
          published_year: this.post.published_year,
        };
        InterpretationIdReq(this.post.id, this.postType, "put", params)
          .then((res) => {
            this.$Message.info("成功修改");
            this.pageIndex = 1;
            this.loadPost();
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.textbreak .text-div {
    word-break: break-all;
}


.extra {
  width: 272px;
  height: 1px;
}
.content {
  .detail {
    line-height: 22px;
    max-width: 720px;
  }
  .author {
    color: @text-color-second;
    margin-top: 16px;
    line-height: 22px;
    & > :global(.ant-avatar) {
      vertical-align: top;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      position: relative;
      top: 1px;
    }
    & > em {
      color: @disabled-color;
      font-style: normal;
      margin-left: 16px;
    }
  }
}
a:link {
  color: black;
} /* 未被访问的链接 */
a:hover {
  color: #13c2c2;
} /* 鼠标指针移动到链接上 */
a:active {
  color: #13c2c2;
} /* 正在被点击的链接 */
</style>
