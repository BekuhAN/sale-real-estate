import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
  faRubleSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faVk,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faRubleSign,
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
  faVk,
  faFacebookF,
  faTwitter,
  faInstagram,
  faClock
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.filter("filterPrice", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
