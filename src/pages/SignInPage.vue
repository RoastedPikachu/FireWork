<template>
  <section>
    <div id="SignIn">
      <img src="@/assets/FireWork_logo.svg" alt="FireWork">
      <form>
        <ErrorComp :errorMessage="errorMessage" v-if="isError"/>
        <input type="email" placeholder="Электронная почта" v-model="email">
        <input type="password" placeholder="Пароль" v-model="password">
        <SignInButtonComp text="Войти" @click="getToken()"/>
      </form>
      <router-link to="/registration" class="routeText">Регистрация</router-link>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import store from '@/store/index';
  import ErrorComp from '@/widgets/shared/ErrorComp.vue';
  import SignInButtonComp from '@/widgets/shared/SignInButtonComp.vue';

  interface Payload {
    email: string,
    password: string
  }

  export default defineComponent({
    name: 'SignInPage',
    data() {
      return {

      }
    },
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const isError = ref(false);

      return {
        email, 
        password,
        errorMessage,
        isError
      }
    },
    methods: {
      async getToken() {
        let url = new URL('http://62.109.10.224:500/api/auth/login/');

        const payload:Payload = {
          email: this.email,
          password: this.password
        }

        const result = await axios.post(url.toString(), payload, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        const token = result.data.token;

        if(result.data.error) {
          this.errorMessage = result.data.error;
          this.isError = true;
        } else if(result.data.token) {
          document.cookie = `token=${token}; path=/; max-age=2592000; secure=true`;
          store.dispatch('changeSignInStatus');
          this.$router.push('/');
        }
      }
    },
    components: {
      ErrorComp,
      SignInButtonComp
    }
  })
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 99vh;
    background-image: url('@/assets/signIn_bg.jpg');
    #SignIn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 2.5%;
      width: 22.5%;
      height: 47.5%;
      background-color: #ffffff;
      border: 1px solid #43455D;
      border-radius: 30px;
      img {
        width: 30%;
        height: 30%;
      }
      form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: 70%;
        input {
          padding-left: 5%;
          width: 95%;
          height: 45px;
          background-color: #f8f8fa;
          border: 1px solid #43455d;
          border-radius: 25px;
          color: rgba(7, 9, 40, 0.75);
          font-size: 16px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          outline: none;
        }
      }
    }
    .routeText {
      margin-top: 5px;
      color: #ff7d34;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      text-decoration: none;
    }
  }
</style>