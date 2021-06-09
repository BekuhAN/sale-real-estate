import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listMenu: [],
    listCatalog: [],
  },
  getters: {
    listMenu(state) {
      return state.listMenu;
    },
    listCatalog(state) {
      return state.listCatalog;
    },
  },
  mutations: {
    updateListMenu(state, payload) {
      state.listMenu = payload;
    },
    updateListCatalog(state, payload) {
      state.listCatalog = payload;
    },
  },
  actions: {
    getListMenu({ commit }) {
      axios
        .get("http://localhost:3000/menu")
        .then((resp) => commit("updateListMenu", resp.data));
    },
    getListCatalog({ commit }, params) {
      axios
        .get("http://localhost:3000/catalog", { params })
        .then((resp) => commit("updateListCatalog", resp.data));
    },
  },
});
