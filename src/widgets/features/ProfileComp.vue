<template>
  <div id="Profile">
    <div id="Profile_bgImage"></div>
    <div id="Profile_mainInfo">
      <div id="Profile_mainInfo_ImgWrapper">
        <img :src="photo" alt="Профиль" v-if="isLoaded">
        <div v-if="!isLoaded"></div>
      </div>

      <p class="loadedProfileText" v-if="!isLoaded"></p>
      <input type="text" disabled v-if="!isProfile && isLoaded" v-model="targetUserName">
      <span v-if="isProfile && isLoaded">
        <input type="text" v-model="targetUserName" :disabled="!isEdit">
        <img src="@/assets/edit_icon.svg" alt="Редактировать" @click="edit()">
      </span>

      <p class="loadedProfileText" v-if="!isLoaded"></p>
      <input type="text" disabled v-if="!isProfile && isLoaded" v-model="targetDescription">
      <span v-if="isProfile && isLoaded">
        <input type="text" v-model="targetDescription" :disabled="!isEdit">
        <img src="@/assets/edit_icon.svg" alt="Редактировать" @click="edit()">
      </span>
    </div>

    <div class="rating" v-show="isCustomer">
      <p>Рейтинг заказчика</p>
      <p>{{ customerRating }}</p>
    </div>  
    <div class="rating" v-show="!isCustomer">
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
  import { ref } from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'ProfileComp',
    data() {
      return {

      }
    },
    setup() {
      const targetUserName = ref('' as string || undefined);
      const targetDescription = ref('' as string || undefined);
      const customerRating = ref('4.5/10');
      const executorRating = ref('нет заказов');
      const isEdit = ref(false);

      const edit = () => {
        isEdit.value = !isEdit.value;
      }

      return {
        targetUserName,
        targetDescription,
        customerRating,
        executorRating,
        isEdit,
        edit
      }
    },
    mounted() {
      if(this.isEdit) {
        setInterval(() => {
          this.targetUserName = this.userName;
          this.targetDescription = this.description || 'Я пельмешка';
        }, 15000);
      } else {
        setInterval(() => {
          this.targetUserName = this.userName;
          this.targetDescription = this.description || 'Я пельмешка';
        }, 500);
      }
    },
    props: {
      isLoaded: Boolean,
      isProfile: Boolean,
      photo: String,
      description: String,
      userName: String,
      isCustomer: Boolean,
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
    background-color: #ffffff;
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
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: #ffffff;
        border-radius: 50px;
        z-index: 4;
        input {
          display: none;
        }
        label {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90px;
          height: 90px;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 50px;
          cursor: pointer;
          z-index: 6;
          img {
            margin-top: -5%;
            margin-left: 7.5%;
            width: 50%;
            height: 50%;
            background-color: transparent;
            border-radius: 0;
          }
        }
        img {
          width: 90px;
          height: 90px;
          border-radius: 50px;
          z-index: 5;
        }
        div {
          width: 90px;
          height: 90px;
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 50px;
          z-index: 5;
        }
      }
      .loadedProfileText {
        width: 55%;
        height: 12.5px;
        background-color: #e0e0e0;
        border-radius: 2.5px;
      }
      .loadedProfileText:last-child {
        width: 70%;
      }
      input {
        width: 100%;
        background-color: transparent;
        border: none;
        color: #070928;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        text-align: center;
        outline: none;
      }
      input:last-child {
        color: rgba(7, 9, 40, 0.75);
        font-size: 14px;
      }
      span {
        display: flex;
        justify-content: flex-start;
        input {
          padding: 0 15% 0 20%;
          width: 50%;
          color: #070928;
          font-size: 16px;
          font-weight: 500;
          text-align: right;
        }
        img {
          margin-top: -5px;
          margin-left: -7.5%;
          cursor: pointer;
        }
      }
      span:last-child {
        input {
          padding: 0 5% 0 10%;
          width: 67.5%;
          color: rgba(7, 9, 40, 0.75);
          font-size: 14px;
        }
        img {
          margin-left: 0;
        }
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
        font-weight: 500;
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