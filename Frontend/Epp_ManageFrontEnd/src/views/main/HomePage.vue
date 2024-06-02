<template>
    <div class="home-page">
        <!-- Web 服务器相关信息 -->
        <div class="web-server">
            <div class="visit-record">
                <div class="title">网站访问统计</div>
                <div style="height: 85%" id="web-server-visit"></div>
            </div>
            <div class="hardware">
                <div class="title">Web 服务器</div>
                <div class="cpu-info">
                    <div id="web-server-cpu" style="height: 80%"></div>
                    <div style="height: 15%; text-align: center">CPU 使用情况</div>
                </div>
                <div class="memory-info">
                    <el-progress
                        style="width: 90%; margin: 5% auto; height: 10%"
                        :text-inside="true"
                        :stroke-width="18"
                        :percentage="80.5"
                        status="warning"
                    />
                    <div style="text-align: center">内存使用情况：12MB/10GB</div>
                </div>
            </div>
        </div>

        <!-- 大模型服务器相关信息 -->
        <div class="module-server">
            <div class="header">模型服务器</div>
            <div class="container">
                <div class="hardware-left">1</div>
                <div class="hardware-right">
                    <div class="cpu-info">
                        <div id="module-server-cpu" style="height: 80%"></div>
                        <div style="height: 15%; text-align: center">CPU 使用情况</div>
                    </div>
                    <div class="memory-info">
                        <el-progress
                            style="width: 90%; margin: 5% auto; height: 10%"
                            :text-inside="true"
                            :stroke-width="18"
                            :percentage="80.5"
                            status="warning"
                        />
                        <div style="text-align: center">内存使用情况：12MB/10GB</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
    components: {},
    props: {},
    data() {
        return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {
        let internalInstance = getCurrentInstance()
        let echarts = internalInstance.appContext.config.globalProperties.$echarts
        // Web 服务器 CPU
        const webServerCPUChart = echarts.init(document.getElementById('web-server-cpu'))
        const webServerCPUOption = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: 'Pressure',
                    type: 'gauge',
                    radius: '90%', // 增加仪表盘的半径以填充更多空间
                    progress: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}%',
                        // 修改字体大小
                        fontSize: 13
                    },
                    axisLabel: {
                        fontSize: 10
                    },
                    title: {
                        fontSize: 13
                    },
                    data: [
                        {
                            value: 67.8
                        }
                    ]
                }
            ]
        }
        webServerCPUOption && webServerCPUChart.setOption(webServerCPUOption)
        // Web 服务器访问了统计
        let base = +new Date(1988, 9, 3)
        let oneDay = 24 * 3600 * 1000
        let data = [[base, Math.random() * 300]]
        for (let i = 1; i < 20000; i++) {
            let now = new Date((base += oneDay))
            data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
        }
        const webServerVisitChart = echarts.init(document.getElementById('web-server-visit'))
        const webServerVisitOption = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%']
                }
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 20
                },
                {
                    start: 0,
                    end: 20,
                    height: 18,
                    handleSize: '80%', // 缩放手柄的大小
                    handleStyle: {
                        color: '#6AB1D7'
                    }
                }
            ],
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        color: 'rgba(144,238,144,0.2)'
                    },
                    lineStyle: {
                        color: 'rgba(100,200,140)' // 设置线的颜色为浅绿
                    },
                    data: data
                }
            ]
        }
        webServerVisitOption && webServerVisitChart.setOption(webServerVisitOption)

        // 模型服务器 CPU
        const moduleServerCPUChart = echarts.init(document.getElementById('module-server-cpu'))
        const moduleServerCPUOption = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: 'Pressure',
                    type: 'gauge',
                    radius: '90%', // 增加仪表盘的半径以填充更多空间
                    progress: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}%',
                        // 修改字体大小
                        fontSize: 13
                    },
                    axisLabel: {
                        fontSize: 10
                    },
                    title: {
                        fontSize: 13
                    },
                    data: [
                        {
                            value: 67.8
                        }
                    ]
                }
            ]
        }
        moduleServerCPUOption && moduleServerCPUChart.setOption(moduleServerCPUOption)

        // 页面适应
        window.addEventListener('resize', function () {
            webServerCPUChart.resize()
            webServerVisitChart.resize()
        })
    }
}
</script>
<style lang="scss" scoped>
.home-page {
    width: 100%;
    background-color: white;
}
.web-server {
    height: 55vh;
    min-height: 270px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    background-color: rgb(249, 240, 227, 0.3);
    .visit-record {
        flex: 7;
        height: 50vh;
        border-right: solid 1px rgba(0, 0, 0, 0.2);
        padding-right: 10px;
        .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #303133;
        }
    }

    .hardware {
        flex: 2;
        height: 50vh;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        color: rgba(0, 0, 0, 0.5);
        flex-direction: column;
        .title {
            flex: 1;
            text-align: center;
            font-size: 20px;
            color: #303133;
        }
        .cpu-info {
            flex: 6;
        }
        .memory-info {
            flex: 2;
        }
    }
}

.module-server {
    height: 50vh;
    min-height: 250px;
    padding: 20px 10px;
    background-color: white;
    .header {
        font-size: 20px;
        font-weight: bold;
        color: #303133;
        text-align: center;
    }
    .container {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        .hardware-left {
            flex: 7;
            background-color: #303133;
            border-right: solid 1px rgba(0, 0, 0, 0.2);
        }

        .hardware-right {
            flex: 2;
            height: 45vh;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            color: rgba(0, 0, 0, 0.5);
            flex-direction: column;

            .title {
                flex: 1;
                text-align: center;
                font-size: 20px;
                color: #303133;
            }
            .cpu-info {
                flex: 3;
            }
            .memory-info {
                flex: 1;
            }
        }
    }
}
</style>
