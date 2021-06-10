<template>
  <main class="single_page">
    <section class="page_title">
      <h1>{{ item.name }}</h1>
      <div class="page_title__adres">
        <font-awesome-icon class="icon" icon="map-marker-alt" />{{ item.adres }}
      </div>
    </section>
    <section class="single_page__item">
      <div class="container">
        <div class="row">
          <div class="col-9 single_page__item__content">
            <div class="item_slider">
              <hooper
                class="main_carousel"
                group="group1"
                :infiniteScroll="true"
              >
                <slide
                  class="full_image"
                  v-for="(img, index) in item.images"
                  :key="index"
                  ><img :src="getImgUrl(img.src)" alt=""
                /></slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
                <hooper-pagination
                  slot="hooper-addons"
                  mode="fraction"
                ></hooper-pagination>
              </hooper>

              <hooper
                group="group1"
                :itemsToShow="3"
                :infiniteScroll="true"
                :centerMode="true"
                class="sub_carousel"
              >
                <slide
                  class="mini_image"
                  v-for="(img, index) in item.images"
                  :key="index"
                >
                  <div class="wrapper">
                    <img :src="getImgUrl(img.src)" alt="" /></div
                ></slide>
              </hooper>
            </div>
            <div class="item_info">
              <div class="item_info__item" v-if="item.totalSpace">
                <div class="value">{{ item.totalSpace }} м<sup>2</sup></div>
                <div class="title">Общая</div>
              </div>
              <div class="item_info__item" v-if="item.liveSpace">
                <div class="value">{{ item.liveSpace }} м<sup>2</sup></div>
                <div class="title">Жилая</div>
              </div>
              <div class="item_info__item" v-if="item.floor">
                <div class="value">{{ item.floor }}</div>
                <div class="title" v-if="item.categoryId == 3">Этажей</div>
                <div class="title" v-else>Этаж</div>
              </div>
              <div class="item_info__item" v-if="item.deadline">
                <div class="value">{{ item.deadline }}</div>
                <div class="title" v-if="item.categoryId == 1">Дата сдачи</div>
                <div class="title" v-else>Построен</div>
              </div>
            </div>
            <div class="item_detail">
              <div class="title">Доп. параметры</div>
              <ul class="list">
                <li v-for="(item, index) in item.detail" :key="index">
                  <strong> {{ item.title }}: </strong> {{ item.value }}
                </li>
              </ul>
            </div>
            <div class="item_description">
              <div class="title">Информация</div>
              <div class="text">{{ item.description }}</div>
            </div>
          </div>
          <div class="col-3 single_page__item__sidebar">
            <div class="brief_info">
              <div class="price">
                {{ item.price | filterPrice }}
                <font-awesome-icon class="icon" icon="ruble-sign" />
              </div>
              <div class="phone">{{ item.realtor.phone }}</div>
            </div>
            <div class="title">Написать сообщение</div>
            <form class="contact__form" @submit.prevent="sendEmail">
              <input
                name="user_name"
                type="text"
                class="contact__form__item"
                placeholder="Ваше имя*"
                required
              />
              <the-mask
                :mask="['+7 (###) ###-####']"
                required
                placeholder="Ваш номер*"
                class="contact__form__item"
                type="phone"
                name="user_phone"
              />
              <input
                name="user_email"
                type="email"
                class="contact__form__item"
                placeholder="Ваша почта*"
                required
              />
              <input
                name="user_theme"
                type="text"
                class="contact__form__item"
                placeholder="Тема"
              />
              <textarea
                name="user_message"
                class="contact__form__item"
                placeholder="Сообщение"
              ></textarea>
              <input
                class="contact__form__send"
                type="submit"
                value="Отправить"
              />
            </form>
            <div class="reiltor">
              <RealtorItem :item="item.realtor" />
            </div>
          </div>
        </div>
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
import { mapGetters, mapActions } from "vuex";
import RealtorItem from "../components/realtorItem.vue";
import axios from "axios";
import { TheMask } from "vue-the-mask";
import emailjs from "emailjs-com";
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
    getImgUrl(image) {
      return require("../assets/img/" + image);
    },
    sendEmail(e) {
      emailjs
        .sendForm(
          "service_q45rr4l",
          "template_pekw17p",
          e.target,
          "user_pIL4lQ3MMryXAHq5HwLIL"
        )
        .then(
          (result) => {
            e.target.reset();
            alert("Отправлено!");
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            e.target.reset();
            alert("Что-то пошло не так!");
            console.log("FAILED...", error);
          }
        );
    },
  },
  components: {
    RealtorItem,
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
    TheMask,
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
  .single_page__item {
    &__content {
      .item_slider {
        .main_carousel {
          padding: 0;
          height: 550px;
          border: 1px solid #f2f2f2;
          .full_image {
            height: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            img {
              height: 100%;
            }
          }
          .hooper-next,
          .hooper-prev {
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
          .hooper-prev {
            left: 30px;
          }
          .hooper-next {
            right: 30px;
          }
          .hooper-pagination {
            color: #fff;
          }
        }
        .sub_carousel {
          height: 160px;
          margin-top: 30px;
          padding: 0;
          .mini_image {
            position: relative;
            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #fff;
              opacity: 0.7;
            }
            &.is-current {
              &::before {
                opacity: 0;
              }
            }
            .wrapper {
              border: 1px solid #f2f2f2;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              margin: 0px 10px;
              height: 100%;
              img {
                height: 100%;
              }
            }
          }
        }
      }
      .item_description,
      .item_detail,
      .item_info {
        background: #f2f2f2;
        margin-top: 30px;
        padding: 15px;
        .title {
          text-transform: uppercase;
          font-family: Play;
          font-size: 22px;
          font-weight: bold;
          border-bottom: 2px solid #fff;
          text-align: center;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
      }
      .item_info {
        display: flex;
        align-items: flex-end;
        &__item {
          margin-right: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .value {
            font-weight: bold;
            font-size: 22px;
          }
          .title {
            font-family: Roboto;
            font-weight: normal;
            border: none;
            color: #999;
            font-size: 16px;
            margin: 0;
          }
        }
      }
      .item_detail {
        .list {
          list-style: none;
          padding: 0;
          columns: 2;
          column-width: 50%;
        }
      }
    }
    &__sidebar {
      .brief_info {
        border-bottom: 2px solid #29aae3;
        margin-bottom: 20px;
        padding-bottom: 10px;
        .price {
          background: #29aae3;
          color: #fff;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 5px;
          .icon {
            font-size: 16px;
            margin-left: 10px;
          }
        }
        .phone {
          background: #f2f2f2;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 5px;
        }
      }
      .title {
        font-size: 22px;
        text-transform: uppercase;
        font-family: Play;
        margin-bottom: 10px;
      }
      .contact__form {
        border-bottom: 2px solid #29aae3;
        margin-bottom: 20px;
        padding-bottom: 10px;
        &__item {
          display: block;
          padding: 10px 20px;
          margin-bottom: 5px;
          width: 100%;
          border-radius: 0;
          border: 1px solid #c3c3c5;
          font-style: italic;
          font-family: Roboto;
          color: #000;
          min-width: 100%;
          max-width: 100%;
          max-height: 250px;
          &:focus {
            outline-color: #29aae3;
            background: rgba(#29aae3, 0.2);
          }
        }
        textarea {
          height: 100px;
        }
        &__send {
          background: #fff;
          border: 2px solid #29aae3;
          display: block;
          width: 120px;
          height: 40px;
          margin-left: auto;
          text-transform: uppercase;
          font-weight: bold;
          color: #29aae3;
          transition: 0.2s;
          &:hover {
            background: #29aae3;
            color: #fff;
          }
        }
      }
      .realtor {
        &_item {
          .image {
            height: 240px;
          }
        }
      }
    }
  }
}
</style>
