<template>
  <nav id="nav">
    <ul class="main_nav">
      <li class="main_nav__item" v-for="(item, index) in listMenu" :key="index">
        <router-link class="main_nav__item__link" :to="item.link">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["listMenu"]),
  },
  beforeMount() {
    this.getListMenu();
  },
  methods: {
    ...mapActions(["getListMenu"]),
  },
};
</script>

<style lang="scss">
#nav {
  margin-left: auto;
  .main_nav {
    display: flex;
    list-style: none;
    padding: 0;
    align-items: center;
    &__item {
      &__link {
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 20px;
        transition: 0.2s;
        &:hover {
          color: #29aae3;
        }
      }
    }
  }
}
</style>
