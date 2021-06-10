<template>
  <main class="single_page">
    <section class="page_title">
      <h1>{{ item.name }}</h1>
      <div class="page_title__adres">
        <font-awesome-icon class="icon" icon="map-marker-alt" />{{ item.adres }}
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      item: [],
    };
  },
  computed: {
    ...mapGetters(["listCatalog"]),
  },
  async beforeMount() {
    await axios
      .get(
        "http://localhost:3000/catalog?_expand=realtor&id=" +
          this.$route.params.id
      )
      .then((resp) => (this.item = resp.data[0]));
  },
  methods: {
    ...mapActions(["getListCatalog"]),
  },
};
</script>

<style lang="scss">
.single_page {
  .page_title {
    height: 150px;
    padding: 0;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Play;
    text-transform: uppercase;
    position: relative;
    flex-direction: column;
    h1 {
      font-size: 32px;
      z-index: 2;
      margin: 0px;
    }
    &__adres {
      color: #999;
      .icon {
        margin-right: 15px;
        font-size: 20px;
      }
    }
  }
}
</style>
