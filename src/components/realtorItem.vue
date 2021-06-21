<template>
  <div class="realtor_item">
    <figure class="image">
      <img v-if="item.image" :src="getImgUrl(item.image)" />
    </figure>
    <div class="detail">
      <div class="name">{{ item.name }}</div>
      <div class="company"><strong>Компания:</strong> МойДом</div>
      <div class="email">
        <font-awesome-icon class="icon" icon="envelope" />{{ item.email }}
      </div>
      <div class="phone">
        <font-awesome-icon class="icon" icon="phone-alt" />{{ item.phone }}
      </div>
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
.realtor_item {
  width: 100%;
  margin-bottom: 30px;
  .image {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 300px;
    margin: 0;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0;
      transition: 0.2s;
    }
    &:hover {
      &::before {
        opacity: 0.3;
      }
    }
    img {
      width: 100%;
    }
  }
  .detail {
    background: #fff;
    padding: 12px;
    height: 100%;
    .name {
      font-size: 24px;
      font-weight: bold;
      font-family: Play;
      margin-bottom: 5px;
    }
    .description {
      height: 72px;
      overflow: hidden;
      max-height: 72px;
      margin-bottom: 10px;
    }
    .company {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .email {
      font-size: 14px;
      margin-bottom: 10px;
      .icon {
        margin-right: 10px;
        color: #29aae3;
        font-size: 16px;
      }
    }
    .phone {
      font-size: 14px;
      .icon {
        margin-right: 10px;
        color: #29aae3;
        font-size: 16px;
      }
    }
  }
}
</style>
