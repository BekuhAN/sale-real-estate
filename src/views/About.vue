<template>
  <main class="about_page">
    <section class="page_title"><h1>О нас</h1></section>
    <section class="detail">
      <div class="container">
        <div class="row">
          <div class="col-6 detail__item">
            <div class="image">
              <img src="../assets/img/icon-1.jpg" alt="" />
            </div>
            <div class="section_title">НАША КОМПАНИЯ</div>
            <div class="description">
              Калиево-натриевый полевой шпат покрывает магматический форшок, за
              счет чего увеличивается мощность коры под многими хребтами
            </div>
          </div>
          <div class="col-6 detail__item">
            <div class="image">
              <img src="../assets/img/icon-2.jpg" alt="" />
            </div>
            <div class="section_title">НАШ ПОДХОД</div>
            <div class="description">
              Калиево-натриевый полевой шпат покрывает магматический форшок, за
              счет чего увеличивается мощность коры под многими хребтами
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="team">
      <div class="container">
        <div class="section_title">Наша команда</div>
        <div class="team__list row">
          <div
            class="team__list__item col-4"
            v-for="(item, index) in listRealtors"
            :key="index"
          >
            <RealtorItem :item="item" />
          </div>
        </div>
      </div>
    </section>
    <section class="comments">
      <div class="container">
        <div class="section_title">Отзывы</div>
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
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import "hooper/dist/hooper.css";
import { mapActions, mapGetters } from "vuex";
import RealtorItem from "../components/realtorItem.vue";
export default {
  computed: {
    ...mapGetters(["listRealtors"]),
  },
  async beforeMount() {
    await this.getListRealtors();
  },
  methods: {
    ...mapActions(["getListRealtors"]),
  },
  components: {
    RealtorItem,
    Hooper,
    Slide,
    HooperPagination,
  },
};
</script>

<style lang="scss">
.about_page {
  .page_title {
    height: 150px;
    padding: 0;
    background: url("../assets/img/title-bg-2.jpg") no-repeat;
    background-size: 100% auto;
    background-position-y: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Play;
    text-transform: uppercase;
    color: #fff;
    position: relative;
    h1 {
      font-size: 32px;
      z-index: 2;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(#000, 0.45);
      z-index: 0;
    }
  }
  .detail {
    &__item {
      .image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        img {
          height: 100%;
        }
      }
      .section_title {
        padding-bottom: 10px;
        margin-bottom: 20px;
        font-size: 24px;
      }
      .description {
        text-align: center;
      }
    }
  }
  .team {
    background: #f2f2f2;
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
}
</style>
