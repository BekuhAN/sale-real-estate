<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-4 footer__contacts">
          <div class="logo"><img src="../assets/logo-white.png" /></div>
          <div class="footer__contacts__item">
            <font-awesome-icon class="icon" icon="map-marker-alt" /> г.
            Краснодар, улица Володи Головатого, 288
          </div>
          <div class="footer__contacts__item">
            <font-awesome-icon
              class="icon"
              icon="envelope"
            />support@yoursite.ru
          </div>
          <div class="footer__contacts__item">
            <font-awesome-icon class="icon" icon="phone-alt" />+7 (861)
            345-67-00
          </div>
        </div>
        <div class="col-4">
          <div class="footer__title">Меню</div>
          <ul class="footer__menu">
            <li
              class="footer__menu__item"
              v-for="(item, index) in listMenu"
              :key="index"
            >
              <router-link class="footer__menu__item__link" :to="item.link">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <div class="footer__title">Присоеденяйтесь</div>
          <div class="footer__social">
            <a class="footer__social__item" href="https://vk.com"
              ><font-awesome-icon class="icon" :icon="['fab', 'vk']"
            /></a>
            <a class="footer__social__item" href="http://facebook.com"
              ><font-awesome-icon class="icon" :icon="['fab', 'facebook-f']"
            /></a>
            <a class="footer__social__item" href="https://twitter.com"
              ><font-awesome-icon class="icon" :icon="['fab', 'twitter']"
            /></a>
            <a class="footer__social__item" href="http://instagram.com"
              ><font-awesome-icon class="icon" :icon="['fab', 'instagram']"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
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
footer {
  padding: 50px 0;
  background: #333;
  color: #fff;
  .footer__contacts {
    .logo {
      margin-bottom: 20px;
    }
    &__item {
      position: relative;
      padding-left: 30px;
      margin-bottom: 20px;
      .icon {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #29aae3;
        font-size: 18px;
      }
    }
  }
  .footer__title {
    text-transform: uppercase;
    font-family: Play;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 30px;
  }
  .footer__menu {
    list-style: none;
    padding: 0;
    &__item {
      &__link {
        text-decoration: none;
        padding: 10px 0;
        display: block;
        border-bottom: 1px solid #555;
        position: relative;
        transition: 0.2s;
        &:hover {
          padding-left: 30px;
          &::before {
            width: 25px;
          }
        }
        &::before {
          display: block;
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 2px;
          background: #29aae3;
          width: 0;
          transition: 0.2s;
        }
      }
    }
  }
  .footer__social {
    display: flex;
    &__item {
      background: #fff;
      display: block;
      height: 48px;
      width: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      margin-right: 20px;
      transition: 0.2s;
      position: relative;
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        border-radius: 50%;
        transition: 0.2s;
        border: 1px solid #fff;
      }
      &:hover {
        background: #29aae3;
        &::before {
          border: 1px solid #29aae3;
          transform: translate(-50%, -50%) scale(1.3);
        }
      }
    }
  }
}
</style>
