<template>
  <section>
    <div id="SignIn">
      <img src="@/assets/FireWork_logo.svg" alt="FireWork">
      <form>
        <div id="SignIn_error" v-if="errorMessage">{{ errorMessage }}</div>
        <input type="email" placeholder="Электронная почта" v-model="email">
        <input type="password" placeholder="Пароль" v-model="password">
        <button>Войти</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';

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

      return {
        email, 
        password,
        errorMessage
      }
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
      height: 45%;
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
        #SignIn_error {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          background-color: #dcdcdc;
          border: 1px solid #43455d;
          border-radius: 10px;
          color: #df2c14;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
        }
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
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80%;
          height: 50px;
          background-color: #f8f8fa; 
          border: 1px solid #43455d;
          border-radius: 25px;
          color: #ff7d34;
          font-size: 18px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          cursor: pointer;
        }
      }
    }
  }
</style>