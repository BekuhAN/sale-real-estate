import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listMenu: [],
  },
  getters: {
    listMenu(state) {
      return state.listMenu;
    },
  },
  mutations: {
    updateListMenu(state, payload) {
      state.listMenu = payload;
    },
  },
  actions: {
    getListMenu({ commit }) {
      axios
        .get("http://localhost:3000/menu")
        .then((resp) => commit("updateListMenu", resp.data));
    },
  },
});
