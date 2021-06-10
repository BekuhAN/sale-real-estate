import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listMenu: [],
    listCatalog: [],
    listRealtors: [],
    listCategories: [],
  },
  getters: {
    listMenu(state) {
      return state.listMenu;
    },
    listCatalog(state) {
      return state.listCatalog;
    },
    listRealtors(state) {
      return state.listRealtors;
    },
    listCategories(state) {
      return state.listCategories;
    },
  },
  mutations: {
    updateListMenu(state, payload) {
      state.listMenu = payload;
    },
    updateListCatalog(state, payload) {
      state.listCatalog = payload;
    },
    updateListRealtors(state, payload) {
      state.listRealtors = payload;
    },
    updateListCategories(state, payload) {
      state.listCategories = payload;
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
        .get("http://localhost:3000/catalog?_expand=realtor", { params })
        .then((resp) => commit("updateListCatalog", resp.data));
    },
    getListRealtors({ commit }) {
      axios
        .get("http://localhost:3000/realtors")
        .then((resp) => commit("updateListRealtors", resp.data));
    },
    getListCategories({ commit }) {
      axios
        .get("http://localhost:3000/categories?_embed=catalog")
        .then((resp) => commit("updateListCategories", resp.data));
    },
  },
});
