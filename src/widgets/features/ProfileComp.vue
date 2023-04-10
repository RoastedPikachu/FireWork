<template>
  <div id="Profile">
    <div id="Profile_bgImage"></div>
    <div id="Profile_mainInfo">
      <div id="Profile_mainInfo_ImgWrapper">
        <img src="" alt="Профиль">
      </div>
      <p>{{ firstName }} {{ lastName }}</p>
      <p>{{ description }}</p>
    </div>

    <div class="rating" v-show="isCustomer">
      <p>Рейтинг заказчика</p>
      <p>{{ customerRating }}</p>
    </div>  
    <div class="rating" v-show="isExecutor">
      <p>Рейтинг исполнителя</p>
      <p>{{ executorRating }}</p>
    </div>

    <span id="Profile_historyOfOrders">
      <router-link to="/" class="routeImg">
        <img src="@/assets/history_icon.svg" alt="История заказов">
      </router-link>
      <p>История заказов</p>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';

  export default defineComponent({
    name: 'ProfileComp',
    data() {
      return {

      }
    },
    setup() {
      const firstName = ref('John');
      const lastName = ref('Wikk');
      const description = ref('I love big cocks');
      const isCustomer = ref(false);
      const isExecutor = ref(true);
      const customerRating = ref('4.5/10');
      const executorRating = ref('нет заказов');

      return {
        firstName,
        lastName,
        description,
        isCustomer,
        isExecutor,
        customerRating,
        executorRating
      }
    }
  })
</script>

<style lang="scss" scoped>
  #Profile {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 350px;
    border: 1px solid #43455d;
    border-radius: 30px;
    #Profile_bgImage {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100px;
      background-color: #ff7d34;
      border: 1px solid #43455D;
      border-width: 0 1px 1px;
      border-radius: 28px 28px 0 0;
    }
    #Profile_mainInfo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 60%;
      height: 150px;
      z-index: 10;
      #Profile_mainInfo_ImgWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: #ffffff;
        border-radius: 50px;
        img {
          width: 90px;
          height: 90px;
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 50px;
        }
      }
      p {
        width: 100%;
        font-family: 'Roboto', sans-serif;
        text-align: center;
      }
      p:first-child {
        color: #070928;
        font-size: 16px;
      }
      p:last-child {
        color: rgba(7, 9, 40, 0.75);
        font-size: 14px;
      }
    }
    .rating {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 65%;
      p {
        font-family: 'Roboto', sans-serif;
      }
      p:first-child {
        width: 50%;
        color: #070928;
        font-size: 16px;
        text-align: center;
      }
      p:last-child {
        margin-top: 10px;
        width: 100%;
        color: rgba(7, 9, 40, 0.75);
        font-size: 14px;
        text-align: center;
      }
    }
    #Profile_historyOfOrders {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 37.5%;
      height: 40px;
      .routeImg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;
        background-color: #ff7d34;
        border-radius: 15px;
        img {
          width: 65%;
          height: 65%;
        }
      }
      p {
        margin-left: 10%;
        width: 40%;
        color: rgba(7, 9, 40, 0.75);
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
      }
    }
  }
</style>