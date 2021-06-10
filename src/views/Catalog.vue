<template>
  <main class="catalog">
    <section class="page_title"><h1>Каталог</h1></section>
    <div class="container">
      <div class="row">
        <div class="col-3 category_list">
          <div class="category_list__title">Категории</div>
          <ul class="category_list__list">
            <li class="category_list__list__item" @click="selectedCategory([])">
              <router-link
                to="/catalog?_limit=8&_page=1&all=true"
                :class="{ active: !$route.query.categoryId }"
                >Все</router-link
              >
            </li>
            <li
              class="category_list__list__item"
              v-for="cat of listCategories"
              :key="cat.id"
              @click="selectedCategory(cat.catalog)"
            >
              <router-link
                :to="{
                  path: '/catalog',
                  query: {
                    categoryId: cat.id,
                    _page: 1,
                    _limit: 8,
                  },
                }"
                :class="{
                  'router-link-exact-active': cat.id == selectedIdCategory,
                }"
              >
                {{ cat.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-9 catalog_list">
          <div class="col-12 filter_catalog">
            Сортировка
            <select
              v-model="sortSelected"
              @change="sorting"
              class="filter_catalog__list"
            >
              <option selected value="">По умолчанию</option>
              <option value="price_asc">По цене: возрастанию</option>
              <option value="price_desc">По цене: убыванию</option>
            </select>
          </div>
          <div class="col-12 row">
            <div
              class="col-6"
              v-for="(item, index) in listCatalog"
              :key="index"
            >
              <CatalogItem :item="item" />
            </div>
          </div>
          <div class="pagination">
            <router-link
              :to="{ path: '/catalog', query: { _page: index } }"
              class="page"
              :class="{ active: isActive(index) }"
              v-for="index in selectCategory"
              :key="index"
            >
              {{ index }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CatalogItem from "../components/catalogItem.vue";
import axios from "axios";
export default {
  data() {
    return {
      params: {
        _limit: 8,
        _page: 1,
      },
      sortSelected: "",
      activeCategory: [],
      selectedIdCategory: null,
      isVisible: true,
      list: [],
    };
  },
  components: {
    CatalogItem,
  },
  computed: {
    ...mapGetters(["listCatalog", "listCategories"]),
    selectCategory() {
      if (!this.activeCategory.length) {
        return Math.ceil(this.list.length / 8);
      } else {
        return Math.ceil(this.activeCategory.length / 8);
      }
    },
  },
  methods: {
    ...mapActions(["getListCatalog", "getListCategories"]),
    fetchData() {
      const { all } = this.$route.query;
      if (all) {
        this.params = Object.assign({}, { ...this.$route.query });
      } else {
        this.params = Object.assign({}, this.params, { ...this.$route.query });
      }
      this.getListCatalog(this.params);
      this.getListCategories();
    },
    sorting() {
      if (this.sortSelected) {
        this.params._sort = this.sortSelected.split("_")[0];
        this.params._order = this.sortSelected.split("_")[1];
      } else {
        this.params._sort = "";
        this.params._order = "";
      }
      this.getListCatalog(this.params);
    },
    selectedCategory(cat) {
      this.activeCategory = cat;
      this.selectedIdCategory = cat.categoryId;
    },
    isActive(index) {
      return this.$route.query._page == index;
    },
  },
  async beforeMount() {
    await axios
      .get("http://localhost:3000/catalog")
      .then((resp) => (this.list = this.countProducts = resp.data));
    await this.fetchData();
    this.selectedIdCategory = this.$route.query.categoryId;
  },
  watch: {
    $route: "fetchData",
  },
};
</script>

<style lang="scss">
.catalog {
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
    h1 {
      font-size: 32px;
      z-index: 2;
    }
  }
  .container {
    padding: 50px 0;
  }
  .category_list {
    &__title {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 20px;
      background: #29aae3;
      font-family: Play;
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    &__list {
      padding: 0 10px;
      margin: 0;
      background: #f2f2f2;
      &__item {
        padding: 15px 0;
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        a {
          text-decoration: none;
          width: 100%;
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
        .router-link-exact-active,
        .active {
          position: relative;
          padding-left: 30px;
          &::before {
            display: block;
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 2px;
            background: #29aae3;
            width: 25px;
            transition: 0.2s;
          }
        }
      }
    }
  }
  .catalog_list {
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      .page {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #29aae3;
        height: 40px;
        width: 40px;
        margin: 0px 5px;
        transition: 0.2s;
        text-decoration: none;
        &.active,
        &:hover {
          background: #29aae3;
          color: #fff;
        }
      }
    }
  }
  .filter_catalog {
    padding-bottom: 25px;
    font-family: Play;
    &__list {
      height: 25px;
      padding-left: 10px;
      font-family: Play;
      border: 1px solid #29aae3;
    }
  }
}
</style>
