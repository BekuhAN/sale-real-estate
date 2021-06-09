<template>
  <main class="home">
    <section class="page_slider">
      <hooper>
        <slide v-for="(item, index) in fullList" :key="index"
          ><router-link
            :to="`/catalogItem/${item.id}`"
            :style="`background-image: url(${getImgUrl(item.images[0].src)})`"
            class="slider_item"
          >
            <div class="slider_item__description">
              <div class="wrapper">
                <div class="name">{{ item.name }}</div>
                <div class="adres">
                  <font-awesome-icon class="icon" icon="map-marker-alt" />{{
                    item.adres
                  }}
                </div>
                <div class="price">
                  {{ item.price
                  }}<font-awesome-icon class="icon" icon="ruble-sign" />
                </div>
              </div></div></router-link
        ></slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </section>
  </main>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import "hooper/dist/hooper.css";

export default {
  data() {
    return {
      latest: [],
      recommendeds: [],
      fullList: [],
    };
  },
  computed: {
    ...mapGetters(["listCatalog"]),
  },
  async beforeMount() {
    await this.fetchData();
    await this.fetchListLatest();
    await this.fetchListRecommendeds();
  },
  methods: {
    ...mapActions(["getListCatalog"]),
    getImgUrl(image) {
      return require("../assets/img/" + image);
    },
    async fetchListLatest() {
      await this.getListCatalog({ _sort: "date", _order: "asc" });
      this.latest = this.listCatalog;
    },
    async fetchListRecommendeds() {
      await this.getListCatalog({ recommended: true });
      this.recommendeds = this.listCatalog;
    },
    async fetchData() {
      axios
        .get("http://localhost:3000/catalog?_limit=4")
        .then((resp) => (this.fullList = resp.data));
    },
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
};
</script>

<style lang="scss">
.page_slider {
  .hooper {
    height: calc(100vh - 150px);
    &-next,
    &-prev {
      background: rgba(#fff, 0.8);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      &:hover {
        background: #29aae3;
        color: #fff;
        svg:last-child {
          fill: #fff;
        }
      }
    }
    &-prev {
      left: 30px;
    }
    &-next {
      right: 30px;
    }
  }
  .slider_item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position-y: center;
    padding: 0px 200px;
    text-decoration: none;
    &__description {
      position: relative;
      width: 55%;
      padding-right: 200px;
      .wrapper {
        padding: 30px;
        background: rgba(#fff, 0.8);
        .name {
          font-family: Play;
          text-transform: uppercase;
          font-size: 32px;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 20px;
        }
        .adres {
          font-style: italic;
          width: 75%;
          overflow: hidden;
          max-height: 70px;
          position: relative;
          padding-left: 40px;
          .icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            font-size: 32px;
          }
        }
        .price {
          background: #29aae3;
          color: #fff;
          position: absolute;
          padding: 10px 70px;
          font-family: play;
          bottom: 30px;
          font-size: 24px;
          left: 50%;
          .icon {
            font-size: 20px;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
