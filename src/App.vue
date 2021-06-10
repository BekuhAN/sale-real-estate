<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Roboto", sans-serif;
  color: #4d4d4d;
}

body {
  margin: 0;
}

* {
  color: inherit;
  line-height: 1.5;
}

a {
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

.section_title {
  font-size: 30px;
  font-family: Play;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 20px;
  position: relative;
  margin-bottom: 30px;
  &::before {
    position: absolute;
    content: "";
    display: block;
    height: 2px;
    width: 100px;
    background: #29aae3;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}
</style>
