<template>
  <div class="catalog_item">
    <figure class="image">
      <img v-if="item.images[0].src" :src="getImgUrl(item.images[0].src)" />
      <div class="description">
        <p>{{ item.description }}</p>
      </div>
    </figure>
    <div class="detail">
      <div class="name">{{ item.name }}</div>
      <div class="adres">{{ item.adres }}</div>
      <div class="price">
        {{ item.price }}<font-awesome-icon class="icon" icon="ruble-sign" />
      </div>
      <div class="space">
        <strong>Площадь: </strong>{{ item.totalSpace }} м<sup>2</sup>
      </div>
      <router-link class="btn_more" :to="`/catalogItem/${item.id}`"
        >Подробнее ></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    getImgUrl(image) {
      return require("../assets/img/" + image);
    },
  },
};
</script>

<style lang="scss">
.catalog_item {
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  .image {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 230px;
    margin: 0;
    img {
      width: 100%;
    }
    .description {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      background: rgba(#000, 0.7);
      padding: 20px 30px;
      opacity: 0;
      color: #fff;
      transition: 0.2s;
      p {
        max-height: 145px;
        overflow: hidden;
      }
    }
    &:hover {
      .description {
        opacity: 1;
      }
    }
  }
  .detail {
    background: #f2f2f2;
    padding: 12px;
    .name {
      font-size: 24px;
      font-weight: bold;
      font-family: Play;
      margin-bottom: 5px;
    }
    .adres {
      font-style: italic;
      font-size: 14px;
      height: 65px;
      overflow: hidden;
      max-height: 65px;
      margin-bottom: 5px;
    }
    .price {
      color: #29aae3;
      font-weight: bold;
      font-size: 18px;
      .icon {
        font-size: 16px;
        margin-left: 5px;
      }
    }
    .space {
      margin-bottom: 30px;
    }
    .btn_more {
      color: #29aae3;
      border: 2px solid #29aae3;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 40px;
      margin-left: auto;
      transition: 0.2s;
      &:hover {
        background: #29aae3;
        color: #fff;
      }
    }
  }
}
</style>
