<template>
  <header>
    <div class="container">
      <router-link to="/" class="logo"
        ><img src="../assets/logo.png"
      /></router-link>
      <Menu />
    </div>
  </header>
</template>

<script>
import Menu from "./menu.vue";
export default {
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
header {
  border-bottom: 1px solid #f0f0f0;
  .container {
    display: flex;
    align-items: center;
    height: 80px;
    .logo {
      flex: 0 0 200px;
      img {
        height: 100%;
      }
    }
  }
}
</style>
