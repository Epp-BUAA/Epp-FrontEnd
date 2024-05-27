<template>
    <div class="report-manage-table">
        <el-table
            :data="reportData.reports"
            stripe
            style="width: 100%; border-top: 1px solid #edebeb; font-size: 15px"
            size="large"
            v-loading="isLoading"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center', 'vertical-align': 'middle' }"
            :default-sort="{ prop: 'date', order: 'descending' }"
        >
            <el-table-column label="序号" width="100" type="index"></el-table-column>
            <el-table-column label="日期" prop="date" width="200" />
            <el-table-column label="用户" width="150">
                <template v-slot="scope">
                    <div class="table-text">
                        {{ scope.row.user.user_name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="被举报评论">
                <template v-slot="scope">
                    <div class="table-text">
                        {{ scope.row.comment.content }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="举报意见">
                <template v-slot="scope">
                    <div class="table-text">
                        {{ scope.row.content }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="expand">
                <template #default="props">
                    <ReportDetail :reportID="props.row.id"></ReportDetail>
                </template>
            </el-table-column>
            <template v-slot:empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
    </div>
</template>

<script>
import { getUnhandledReportList } from '@/api/report'
import ReportDetail from './ReportDetail.vue'
import { ElMessage } from 'element-plus'
export default {
    components: {
        ReportDetail
    },
    data() {
        return {
            isLoading: false,
            reportData: {
                total: 2,
                reports: [
                    {
                        id: 9,
                        comment: {
                            date: '2024-04-29 22:58:41',
                            content: '测试评论'
                        },
                        user: {
                            user_id: '063eccd4-76b3-4755-84c0-eef9baf16c04',
                            user_name: 'Ank'
                        },
                        date: '2024-04-29 23:34:56',
                        content: '124'
                    }
                ],
                message: '举报信息获取成功'
            }
        }
    },
    methods: {
        async handleSearch() {
            this.isLoading = true
            await getUnhandledReportList({
                date: '',
                page_num: this.currentPage,
                page_size: this.pageSize
            })
                .then((response) => {
                    this.keywordBuffer = this.keyword
                    this.reportData = response.data
                })
                .catch((error) => {
                    ElMessage.error(error.response.data.message)
                })
            this.isLoading = false
        }
    },
    created() {
        this.handleSearch() // 初始化列表
    }
}
</script>

<style lang="scss" scoped>
.report-manage-table {
    width: 100%;
}

.table-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
