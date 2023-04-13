<template>
  <header>
    <router-link to="/" class="routerLogo">
      <img src="@/assets/FireWork_logo.svg" alt="FireWork">
    </router-link>
    <div id="inputBlock">
      <img src="@/assets/search_icon.svg" alt="search">
      <input type="text" placeholder="Найти заказчика / исполнителя" v-model="searchValue">
    </div>
    <nav>
      <span id="links">
        <div class="linkBlock">
          <router-link to="/" class="routeImg">
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
          <router-link :to="`/chat:${userId}`" class="routeImg">
            <img src="@/assets/chat_icon.svg" alt="Сообщения">
          </router-link>
          <p>Сообщения</p>
        </div>
        <div class="linkBlock">
          <button class="routeImg" @click="changeNotifActive()">
            <img src="@/assets/notifications_icon.svg" alt="Уведомления">
          </button>
          <p>Уведомления</p>
          <ModalNotifComp v-if="isNotifActive"/>
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
      <button @click="exit()">
        <i class="fa-solid fa-power-off"></i>
      </button>
      <ExitModalComp v-if="isExitActive" @click="closeExit"/>
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
  import ExitModalComp from '@/widgets/shared/ExitModalComp.vue';
  import ModalNotifComp from '@/widgets/features/ModalNotifComp.vue';

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
      const isExitActive = ref(false);
      const isNotifActive = ref(false);
      const userId = ref(0);
      const isSignIn = ref(store.state.isSignIn);
      const isLoaded = ref(false);

      return {
        firstName,
        lastName,
        searchValue,
        isExitActive,
        isNotifActive,
        userId,
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
          this.userId = result.data.id;
          this.firstName = result.data.name;
          this.lastName = result.data.surname;
        } 
      },
      exit() {
        this.isExitActive = !this.isExitActive;
      },
      closeExit() {
        this.isExitActive = false;
      },
      changeNotifActive() {
        this.isNotifActive = !this.isNotifActive;
      }
    },
    mounted() {
      setInterval(() => {
        this.getInfoAboutUser();
      }, 500)
    },
    components: {
      ExitModalComp,
      ModalNotifComp
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
    .routerLogo {
      width: 10%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        color: #1e1e1e;
      }
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
          button {
            border: none;
            outline: none;
            cursor: pointer;
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
      position: relative;
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
        width: 50%;
        color: #070928;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        background-color: transparent;
        border: 0;
        cursor: pointer;
        i {
          color: #000000;
          font-size: 30px;  
          transition: 400ms ease;
        }
        i:hover {
          color: #ff7d34;
        }
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