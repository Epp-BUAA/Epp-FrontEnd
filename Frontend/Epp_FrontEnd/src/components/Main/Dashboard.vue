<template>
  <div class="container">
    <div class="top">
      <div class="image">
        <ImageCarousel />
      </div>
      <div class="login">
        <LoginRegister />
      </div>
    </div>
    <div class="buttons">
      <NavigationButtons />
    </div>
  </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue'
import LoginRegister from './Login.vue'
import NavigationButtons from './Buttons.vue'

export default {
  name: 'Dashboard',
  components: {
    ImageCarousel,
    LoginRegister,
    NavigationButtons
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top {
  flex: 1;
  display: flex;
}

.image {
  flex: 1;
}

.login {
  flex: 1;
}

.buttons {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
