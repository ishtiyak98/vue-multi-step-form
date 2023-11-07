<script setup>
import SignupForm from "../components/SignupForm.vue";
</script>

<template>
  <main class="container home-container">
    <SignupForm></SignupForm>
  </main>
</template>

<style lang="scss" scoped>
@import "../styles/responsive";
.home-container {
  width: 100%;
  height: 100%;

  @include lg {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
