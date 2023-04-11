<template>
  <header>
    <img src="@/assets/FireWork_logo.svg" alt="FireWork">
    <div id="inputBlock">
      <img src="@/assets/search_icon.svg" alt="search">
      <input type="text" placeholder="Найти заказчика / исполнителя" v-model="searchValue">
    </div>
    <nav>
      <span id="links">
        <div class="linkBlock">
          <router-link to="/home" class="routeImg">
            <img src="@/assets/home_icon.svg" alt="Домой">
          </router-link>
          <p>Домой</p>
        </div>
        <div class="linkBlock">
          <router-link to="/executors" class="routeImg">
            <img src="@/assets/executors_icon.svg " alt="Исполнители">
          </router-link>
          <p>Исполнители</p>
        </div>
        <div class="linkBlock">
          <router-link to="/customers" class="routeImg">
            <img src="@/assets/customer_icon.svg" alt="Заказчики">
          </router-link>
          <p>&nbsp;Заказы</p>
        </div>
        <div class="linkBlock">
          <router-link to="/chat" class="routeImg">
            <img src="@/assets/chat_icon.svg" alt="Сообщения">
          </router-link>
          <p>Сообщения</p>
        </div>
        <div class="linkBlock">
          <router-link to="/" class="routeImg">
            <img src="@/assets/notifications_icon.svg" alt="Уведомления">
          </router-link>
          <p>Уведомления</p>
        </div>
      </span>
    </nav>
    <hr>
    <span id="Profile" v-if="isSignIn">
      <router-link to="/myProfile" class="routeProfile">
        <img src="" alt="">
      </router-link>
      <p v-if="isLoaded">{{ firstName }} {{ lastName }}</p>
      <p class="loadedName" v-if="!isLoaded"></p>
    </span>
    <span id="Buttons" v-if="!isSignIn">
      <router-link to="/signIn" class="routeText">Вход</router-link>
      <p>/</p>
      <router-link to="/registration" class="routeText">Регистрация</router-link>
    </span>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import store from '@/store/index';

  export default defineComponent({
    name: 'HeaderComp', 
    data() {
      return {

      }
    }, 
    setup() {
      const firstName = ref('');
      const lastName = ref('');
      const searchValue = ref('');
      const isSignIn = ref(store.state.isSignIn);
      const isLoaded = ref(false);

      return {
        firstName,
        lastName,
        searchValue,
        isSignIn,
        isLoaded
      }
    },
    methods: {
      async getInfoAboutUser() {
        const url = new URL('http://62.109.10.224:500/api/account/data/');

        const token = document.cookie.slice(261);

        const result = await axios.post(url.toString(), {token: token}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(result.data.portfolio) {
          this.isLoaded = true;
          this.firstName = result.data.name;
          this.lastName = result.data.surname;
        } 
      }
    },
    mounted() {
      setInterval(() => {
        this.getInfoAboutUser();
      }, 10000)
    }
  })
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    height: 95px;
    background-color: #ffffff;
    img {
      width: 10%;
      height: 100%;
      color: #1e1e1e;
    }
    #inputBlock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 32.5%;
      height: 50px;
      background-color: #F8F8FA;
      border-radius: 20px;
      img {
        margin-left: 5%;
        width: 5%;
        height: 40%;
      }
      input {
        padding-left: 5%;
        width: 90%;
        height: 100%;
        background-color: #F8F8FA;
        border: none;
        border-radius: 0 20px 20px 0;
        color: #070928;
        font-family: 'Roboto', sans-serif;
        outline: none;
      }
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 35%;
      height: 100%;
      #links {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50%; 
        .linkBlock {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 20%;
          height: 60%;
          .routeImg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 45px;
            height: 45px;
            background-color: #ff7d34;
            border-radius: 15px;
            outline: none;
            img {
              width: 50%;
              height: 50%;
            }
          }
          p {
            margin-top: 5px;
            width: 100%;
            color: #070928;
            font-size: 12px;
            font-weight: 400; 
            font-family: 'Roboto', sans-serif;
            text-align: center;
          }
        }
      }
    }
    hr {
      width: 50px;
      height: 2px;
      background-color: rgba(0, 0, 0, 0.25);
      border: none;
      border-radius: 5px;
      transform: rotate(90deg)
    }
    #Profile {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 20%;
      height: 45px;
      .routeProfile {
        width: 45px;
        height: 45px;
        img {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 50px;
        }
      }
      p {
        margin-left: 10px;
        width: 82.5%;
        color: #070928;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
      }
      .loadedName {
        margin-left: 10px;
        width: 45%;
        height: 17.5px;
        background-color: #e0e0e0;
        border-radius: 2.5px;
      }
    }
    #Buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 18.5%;
      height: 45px;
      font-size: 26px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      .routeText {
        color: #070928;
        text-decoration: none;
      }
      p {
        color: #070928;
      }
    }
  }
</style>