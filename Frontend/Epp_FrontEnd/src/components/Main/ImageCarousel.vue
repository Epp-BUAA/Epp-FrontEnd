<template>
  <div class="image-container">
    <img class="image" :src="imagePath" alt="Dashboard Image" />
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  data () {
    return {
      imagePath: require('@/assets/logo2.jpg')
    }
  }
}
</script>

<style scoped>
.image-container {
  margin-left:50px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 图片填充方式，保持纵横比并填充整个容器 */
}
</style>
