<template>
    <div class="home-page">
        <div class="test"><DynamicNumber title="帅哥"></DynamicNumber></div>
    </div>
</template>

<script>
import DynamicNumber from '@/components/statistic/DynamicNumber.vue'
export default {
    components: { DynamicNumber },
    props: {},
    data() {
        return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
}
</script>
<style lang="scss" scoped>
.home-page {
    width: 100%;
    height: 100%;
    .test {
        width: 20vw;
        height: 30vh;
        background-color: white;
    }
}
</style>
