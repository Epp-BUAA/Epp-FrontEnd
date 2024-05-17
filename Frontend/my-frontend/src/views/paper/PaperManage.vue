<template>
    <div>
        <div style="width: 100%; height: 100%">
            <el-collapse v-model="isClsActive">
                <el-collapse-item name="1">
                    <template #title>
                        <div class="collapse-title">
                            <el-icon><i-ep-Histogram /></el-icon>
                            <span class="collapse-title-text">论文统计数据</span>
                        </div>
                    </template>
                    <!-- <div style="width: 100%; overflow: hidden; padding: 0 2%">
                        <div class="number-box">
                            论文个数
                            <svg
                                t="1715522008378"
                                class="number-box-icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1642"
                                width="200"
                                height="200"
                            >
                                <path d="M502.9 501.67z" p-id="1643" fill="#1296db"></path>
                                <path
                                    d="M240.14 316.3a164.63 178.53 0 1 0 329.26 0 164.63 178.53 0 1 0-329.26 0Z"
                                    p-id="1644"
                                    fill="#1296db"
                                ></path>
                                <path
                                    d="M502.9 501.67c-28.32 21.94-62 34.65-98.13 34.65S335 523.6 306.65 501.67C183.37 551.28 94.49 691.77 94.49 857.36q0 14.57 0.9 28.87h618.77q0.9-14.42 0.9-28.87c0-165.59-88.88-306.09-212.16-355.69zM591.64 346.58a160.39 160.39 0 0 1-5.64 43.19 157.47 157.47 0 0 1-47 75.36c22.38 49.4 70.66 83.62 126.64 83.62 77.31 0 140-65.17 140-145.56S743 257.62 665.69 257.62a135.79 135.79 0 0 0-83.08 28.44 78.94 78.94 0 0 1 9.06 26.81c1.7 11.21 2.19 22.94-0.03 33.71z"
                                    p-id="1645"
                                    fill="#1296db"
                                ></path>
                                <path
                                    d="M749.12 559.11c-24.07 18.65-52.71 29.46-83.43 29.46a128.93 128.93 0 0 1-23.39-2.17c28.18 23.15 46.62 63.51 60.44 100.54 7.06 17.47 13.13 35.56 18.75 53.36 12.75 40.41 21.3 85.47 16.61 128.45 0.45 5.77 0.75 11.55 0.86 17.32h189.79q0.77-12.15 0.77-24.54c-0.01-140.78-75.58-260.25-180.4-302.42z"
                                    p-id="1646"
                                    fill="#1296db"
                                ></path>
                            </svg>
                            <div class="number-box-content">
                                <span class="number-box-title">用户总数</span>
                                <span class="number-box-digit"
                                    ><AnimatedNumber
                                        :from="0"
                                        :to="userStatistic.userCnt"
                                        :key="userStatistic.userCnt"
                                        fromColor="#44cc00"
                                        toColor="#232323"
                                        easing="easeOutQuad"
                                    ></AnimatedNumber
                                ></span>
                            </div>
                        </div>
                    </div>
                    <div class="chart-box"></div> -->
                </el-collapse-item>
            </el-collapse>

            <!-- 论文管理 -->
            <div class="paper-manage-container">
                <!-- 标题 -->
                <div class="collapse-title">
                    <el-icon><i-ep-management /></el-icon>
                    <span class="collapse-title-text">论文管理</span>
                </div>
                <!-- 搜索框 -->
                <div class="paper-manage-search">
                    <el-input v-model="keyword" style="width: 18vw" placeholder="输入论文标题" clearable />
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </div>
                <!-- 表格内容 -->
                <div class="paper-manage-table">
                    <el-table
                        :data="paperData.papers"
                        stripe
                        style="width: 94%; border-top: 1px solid #edebeb; font-size: 15px"
                        size="large"
                        v-loading="isLoading"
                        :header-cell-style="{ 'text-align': 'center' }"
                        :cell-style="{ 'text-align': 'center' }"
                        :default-sort="{ prop: 'publication_date', order: 'descending' }"
                    >
                        <el-table-column label="序号" width="100" type="index"></el-table-column>
                        <el-table-column label="标题" width="300">
                            <template v-slot="scope">
                                <el-tooltip class="item" effect="light" :content="scope.row.title" placement="bottom">
                                    <div class="text-left" style="color: #409efe; cursor: pointer">
                                        {{ scope.row.title }}
                                    </div>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="作者" width="250">
                            <template v-slot="scope">
                                <el-tooltip effect="light" :content="scope.row.authors.join(', ')" placement="bottom">
                                    <div class="text-left" style="cursor: pointer">
                                        {{ scope.row.authors.join(', ') }}
                                    </div>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="发表日期"
                            prop="publication_date"
                            width="150"
                            sortable
                        ></el-table-column>
                        <el-table-column label="引用" prop="citation_count" width="100" sortable></el-table-column>
                        <el-table-column label="评分" width="100" sortable>
                            <template v-slot="scope">
                                <div style="cursor: pointer; color: rgb(215, 141, 2)">
                                    {{ scope.row.score }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template v-slot="scope">
                                <el-button circle plain type="danger" @click="handleEdit(scope.row)">
                                    <el-icon><i-ep-Edit></i-ep-Edit></el-icon>
                                </el-button>
                                <el-button circle plain type="success" @click="handleView(scope.row)">
                                    <el-icon><i-ep-view></i-ep-view></el-icon>
                                </el-button>
                            </template>
                        </el-table-column>
                        <template v-slot:empty>
                            <el-empty description="没有数据" />
                        </template>
                    </el-table>
                </div>
                <!-- 论文概述 -->
                <el-dialog v-model="paperOutline.visible" width="60vw">
                    <PaperOutline :paperID="paperOutline.paperID"></PaperOutline>
                </el-dialog>
                <!-- 分页组件 -->
                <el-pagination
                    class="paper-manage-pagination"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 25, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paperData.total"
                    @change="handleSearch"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PaperOutline from './PaperOutline.vue'
import { getPaperList } from '@/api/paper'
import { ElMessage } from 'element-plus'
export default {
    components: { PaperOutline },
    props: {},
    data() {
        return {
            paperOutline: {
                visible: false,
                paperID: ''
            },
            paperData: {
                total: 0,
                papers: [
                    {
                        paper_id: '003fc09d-ac2f-4756-9395-a5767584ada8',
                        title: 'Monocular Depth Estimation Using Cues Inspired by Biological Vision\n  Systems',
                        authors: ['Dylan Auty', 'Krystian Mikolajczyk', ''],
                        publication_date: '2022-04-21',
                        journal: null,
                        citation_count: 185,
                        score: 0
                    },
                    {
                        paper_id: '003fc09d-ac2f-4756-9395-a5767584ada8',
                        title: 'Monocular Depth Estimation Using Cues Inspired by Biological Vision\n  Systems',
                        authors: ['Dylan Auty', 'Krystian Mikolajczyk', ''],
                        publication_date: '2022-04-21',
                        journal: null,
                        citation_count: 185,
                        score: 1
                    }
                ]
            },
            keyword: '', // 搜索框信息
            keywordBuffer: '',
            isLoading: false,
            currentPage: 1, // 分页当前页
            pageSize: 10 // 分页大小
        }
    },
    watch: {},
    computed: {},
    methods: {
        handleView() {
            this.$nextTick(() => {
                this.paperOutline.visible = true
            })
        },
        async handleSearch() {
            this.isLoading = true
            await getPaperList({
                keyword: this.keyword,
                page_num: this.currentPage,
                page_size: this.pageSize
            })
                .then((response) => {
                    this.keywordBuffer = this.keyword
                    this.paperData = response.data
                })
                .catch((error) => {
                    ElMessage.error(error.response.data.message)
                })
            this.isLoading = false
        }
    },
    created() {
        this.handleSearch() // 初始化论文搜索列表
    },
    mounted() {}
}
</script>
<style lang="scss" scoped>
.collapse-title {
    display: flex;
    align-items: center;
    color: rgb(0, 0, 0, 0.6);
    font-size: 16px;
    padding: 10px;
    .collapse-title-text {
        margin-left: 10px;
    }
}
.number-box {
    float: left;
    width: 22%;
    height: 14vh;
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 2%;
    margin-top: 1%;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
    .number-box-icon {
        float: left;
        width: 40%;
        height: 100%;
    }

    .number-box-content {
        float: right;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .number-box-title {
            flex: 2;
            font-size: 21px;
            font-weight: bold;
            padding: 5%;
            border-bottom: 1px solid black;
        }
        .number-box-digit {
            flex: 3;
            margin-top: 5%;
            font-weight: 500;
            font-size: 21px;
        }
    }
}
.chart-box {
    width: 94%;
    height: 45vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
    .chart-box-title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;
        span {
            font-size: 20px;
            font-weight: bold;
        }
    }
    .chart-box-content {
        flex: 8;
        width: 95%;
    }
}
.paper-manage-container {
    margin-top: 2vh;
    background-color: white;
    overflow: hidden;
    .paper-manage-search {
        float: right;
        height: 8vh;
        line-height: 8vh;
        padding: 0 3%;
    }
    .paper-manage-table {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .paper-manage-pagination {
        height: 10vh;
        margin-right: 3%;
        float: right;
    }
}
.text-left {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
