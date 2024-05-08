<template>
    <div style="margin-top: 60px;">
      <h1>关于我们</h1>
      <p>欢迎打赏</p>
      <img :src="imagePath" alt="收款码" width="300" height="300">
    </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      imagePath: require('@/assets/getMoney.jpg')
    }
  }
}
</script>

<style scoped>
  /* Your CSS here */
</style>
