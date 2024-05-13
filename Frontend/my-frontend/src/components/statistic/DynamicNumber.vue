<template>
    <div class="main-box">
        <div class="box-title" ref="boxTitle">{{ title }}</div>
        <div class="box-content" ref="boxContent"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    components: {},
    props: {
        title: String,
        number: Number
    },
    data() {
        return {}
    },
    watch: {},
    computed: {},
    methods: {},
    setup() {
        const boxTitle = ref(null)
        onMounted(() => {
            console.log(boxTitle)
        })
    }
}
</script>
<style lang="scss" scoped>
.main-box {
    height: 100%;
    width: 100%;
    background-color: antiquewhite;
    .box-title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        height: 30%;
        width: 80%;
        margin: 0 auto;
        color: black;
        border-bottom: 1px solid rgb(67, 64, 64);
    }
}
</style>
