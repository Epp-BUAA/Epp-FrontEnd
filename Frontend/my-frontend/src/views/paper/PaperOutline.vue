<template>
    <div></div>
</template>

<script>
import { getPaperOutline } from '@/api/paper'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
export default {
    components: {},
    props: { paperID: String },
    data() {
        return {}
    },
    watch: {},
    computed: {},
    methods: {
        async draw() {
            await getPaperOutline('000345d3ff5f41408f3c5f5793cc44d6')
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    ElMessage.error(error.response.data.message)
                })
        }
    },
    created() {},
    mounted() {}
}
</script>
<style lang="scss" scoped></style>
