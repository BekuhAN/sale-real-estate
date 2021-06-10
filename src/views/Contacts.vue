<template>
  <main class="contacts_page">
    <section class="page_title"><h1>Контакты</h1></section>
    <section class="contacts_page__info">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="section_title">Напишите нам</div>
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
                type="email"
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
          </div>
          <div class="col-6 contacts">
            <div class="contacts__item">
              <font-awesome-icon class="icon" icon="map-marker-alt" /> г.
              Краснодар, улица Володи Головатого, 288
            </div>
            <div class="contacts__item">
              <font-awesome-icon
                class="icon"
                icon="envelope"
              />support@yoursite.ru
            </div>
            <div class="contacts__item">
              <font-awesome-icon class="icon" icon="phone-alt" />+7 (861)
              345-67-00
            </div>
            <div class="contacts__item">
              <font-awesome-icon class="icon" icon="clock" />
              <div><strong>Понедельник-Пятница: </strong>9:00 до 17:00</div>
              <div><strong>Суббота: </strong>10:00 до 15:00</div>
              <div><strong>Воскресенье: </strong>Выходной</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="map">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab2d055875d3c66533573a6d497c72b1f717c05f731790f116b4ad0a4222f2852&amp;source=constructor"
        width="100%"
        height="400"
        frameborder="0"
      ></iframe>
    </section>
  </main>
</template>

<script>
import { TheMask } from "vue-the-mask";
// import emailjs from "emailjs-com";
export default {
  data() {
    return {
      isSuccess: false,
      isError: false,
    };
  },
  methods: {
    // sendEmail(e) {
    //   const self = this;
    //   emailjs
    //     .sendForm(
    //       "service_q45rr4l",
    //       "template_pekw17p",
    //       e.target,
    //       "user_pIL4lQ3MMryXAHq5HwLIL"
    //     )
    //     .then(
    //       (result) => {
    //         self.isSuccess = true;
    //         e.target.reset();
    //         console.log("SUCCESS!", result.status, result.text);
    //       },
    //       (error) => {
    //         self.isError = true;
    //         e.target.reset();
    //         console.log("FAILED...", error);
    //       }
    //     );
    // },
  },
  components: {
    TheMask,
  },
};
</script>

<style lang="scss">
.contacts_page {
  .page_title {
    height: 150px;
    padding: 0;
    background: url("../assets/img/title-bg-1.jpg") no-repeat;
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
  .map {
    padding: 0;
  }
  .contacts {
    background: #f2f2f2;
    padding: 30px;
    &__item {
      padding-left: 50px;
      margin-bottom: 30px;
      font-size: 18px;
      position: relative;
      .icon {
        position: absolute;
        left: 0;
        top: 5px;
        font-size: 20px;
        color: #29aae3;
      }
    }
  }
  .contact__form {
    padding-right: 15px;
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
}
</style>
