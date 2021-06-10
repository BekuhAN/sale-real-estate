<template>
  <main class="home">
    <section class="page_slider">
      <hooper :infiniteScroll="true" :wheelControl="false">
        <slide v-for="(item, index) in fullList" :key="index"
          ><router-link
            :to="`/catalogItem/${item.id}`"
            :style="`background-image: url(${getImgUrl(item.images[0].src)})`"
            class="slider_item"
          >
            <div class="container">
              <div class="slider_item__description">
                <div class="wrapper">
                  <div class="name">{{ item.name }}</div>
                  <div class="adres">
                    <font-awesome-icon class="icon" icon="map-marker-alt" />{{
                      item.adres
                    }}
                  </div>
                  <div class="price">
                    {{ item.price | filterPrice 
                    }}<font-awesome-icon class="icon" icon="ruble-sign" />
                  </div>
                </div>
              </div>
            </div> </router-link
        ></slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </section>
    <section class="latest_catalog">
      <div class="container">
        <div class="section_title">Последние</div>
        <div class="row catalog_list" v-if="latest">
          <CatalogItem
            class="col-4"
            v-for="(item, index) in latest"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </section>
    <section class="comments">
      <div class="container">
        <div class="section_title">Что говорят наши клиенты</div>
        <hooper :wheelControl="false">
          <slide
            ><div class="comments__item">
              <div class="message">
                Лучшая, Простая в настройках, Отличная поддержка, Самая мощная
                тема, с которой я когда-либо работала… ПРОСТО ПОТРЯСАЮЩЕ. Тема
                настолько красиво выглядит, один клик мыши рядом с импортом демо
                и мне не нужно никаких дополнительных настроек. Они будто читают
                мои мысли:) демо версия очень близка к тому, что мне нужно,
                поэтому веб-сайт был создан за несколько минут, кроме некоторых
                доработок. Хочу также отметить, что служба поддержки
                замечательная. Большое спасибо.
              </div>
              <figure class="image">
                <img src="../assets/img/comment-1.jpg" />
              </figure>
              <div class="name">Блинова Марта</div>
            </div></slide
          >
          <slide
            ><div class="comments__item">
              <div class="message">
                Эта тема очень красива, проста в настройке (даже без навыков
                программирования). Богатый функционал (некоторые новые вещи я до
                сих открываю для себя!!). Техническая поддержка просто
                потрясающая. Очень точные, вежливые, быстрые ответы. Я
                рекомендую эту тему всем, кто ищет шаблон WordPress в сфере
                недвижимости.
              </div>
              <figure class="image">
                <img src="../assets/img/comment-2.jpg" />
              </figure>
              <div class="name">Сысоев Ярослав</div>
            </div></slide
          >
          <slide
            ><div class="comments__item">
              <div class="message">
                Эта тема очень красива, проста в настройке (даже без навыков
                программирования). Богатый функционал (некоторые новые вещи я до
                сих открываю для себя!!). Техническая поддержка просто
                потрясающая. Очень точные, вежливые, быстрые ответы. Я
                рекомендую эту тему всем, кто ищет шаблон WordPress в сфере
                недвижимости.
              </div>
              <figure class="image">
                <img src="../assets/img/comment-3.jpg" />
              </figure>
              <div class="name">Никифорова Доминика</div>
            </div></slide
          >
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>
      </div>
    </section>
    <section class="recommended_catalog">
      <div class="container">
        <div class="section_title">Рекомендуемые</div>
        <div class="row catalog_list" v-if="latest">
          <CatalogItem
            class="col-4"
            v-for="(item, index) in recommendeds"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </section>
    <section class="realtors">
      <div class="container">
        <div class="section_title">Риэлторы</div>
        <hooper :wheelControl="false" :itemsToShow="3" :infiniteScroll="true">
          <slide
            class="col-4"
            v-for="(item, index) in listRealtors"
            :key="index"
          >
            <RealtorItem :item="item"
          /></slide>
        </hooper>
      </div>
    </section>
    <section class="clients">
      <div class="container">
        <div class="section_title">Наши клиенты</div>
        <hooper class="row" :itemsToShow="4" :infiniteScroll="true">
          <slide class="col-3 clients__item"
            ><img src="../assets/img/client-1.png"
          /></slide>
          <slide class="col-3 clients__item"
            ><img src="../assets/img/client-2.png"
          /></slide>
          <slide class="col-3 clients__item"
            ><img src="../assets/img/client-3.png"
          /></slide>
          <slide class="col-3 clients__item"
            ><img src="../assets/img/client-1.png"
          /></slide>
          <slide class="col-3 clients__item"
            ><img src="../assets/img/client-4.png"
          /></slide>
          <slide class="col-3 clients__item"
            ><img src="../assets/img/client-5.png"
          /></slide>
        </hooper>
      </div>
    </section>
  </main>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from "hooper";
import "hooper/dist/hooper.css";
import { mapActions, mapGetters } from "vuex";
import CatalogItem from "../components/catalogItem.vue";
import RealtorItem from "../components/realtorItem.vue";
import axios from "axios";

export default {
  data() {
    return {
      latest: [],
      recommendeds: [],
      fullList: [],
    };
  },
  computed: {
    ...mapGetters(["listCatalog", "listRealtors"]),
  },
  async beforeMount() {
    await this.fetchData();
    await this.fetchListLatest();
    await this.fetchListRecommendeds();
    await this.getListRealtors();
  },
  methods: {
    ...mapActions(["getListCatalog", "getListRealtors"]),
    getImgUrl(image) {
      return require("../assets/img/" + image);
    },
    async fetchListLatest() {
      await axios
        .get(
          "http://localhost:3000/catalog?categoryId=2&categoryId=3&_sort=date&_order=asc&_limit=6"
        )
        .then((resp) => (this.latest = resp.data));
    },
    async fetchListRecommendeds() {
      await axios
        .get("http://localhost:3000/catalog?recommended=true&_limit=6")
        .then((resp) => (this.recommendeds = resp.data));
    },
    async fetchData() {
      await axios
        .get("http://localhost:3000/catalog?categoryId=2&_limit=4")
        .then((resp) => (this.fullList = resp.data));
    },
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
    CatalogItem,
    RealtorItem,
  },
};
</script>

<style lang="scss">
.page_slider {
  padding: 0;
  .hooper {
    height: calc(100vh - 250px);
    padding: 0;
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
          padding: 10px 50px;
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

.hooper-indicator {
  &:hover {
    background: #29aae3;
  }
  &.is-active {
    background: #29aae3;
  }
}
.comments {
  background: url("../assets/img/bg-1.jpg") no-repeat;
  background-size: 100% auto;
  background-position-y: center;
  .hooper {
    height: auto;
  }
  &__item {
    width: 600px;
    margin: 0px auto;
    .message {
      height: 168px;
      max-height: 168px;
      overflow: hidden;
      text-align: center;
      margin-bottom: 30px;
    }
    .image {
      margin: 0 auto 20px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
    .name {
      text-align: center;
      text-transform: uppercase;
      font-family: Play;
      font-weight: bold;
      font-size: 22px;
    }
  }
}
.realtors {
  background: url("../assets/img/bg-2.jpg") no-repeat;
  background-size: 100% auto;
  background-position-y: center;
  .hooper {
    height: auto;
    padding: 0;
  }
  .col-4 {
    padding: 0px 15px !important;
  }
}
.clients {
  .hooper {
    height: auto;
    padding: 0;
  }
  &__item {
    overflow: hidden;
    padding: 0px 30px;
    img {
      width: 100%;
    }
  }
}
section {
  padding: 50px 0;
}
</style>
