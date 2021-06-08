<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  color: #4d4d4d;
}

* {
  color: inherit;
  &:hover {
    color: inherit;
  }
}

#nav {
  padding: 30px;

  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #29aae3;
    }
  }
}
</style>
