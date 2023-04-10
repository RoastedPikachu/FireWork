<template>
  <section>
    <div id="Registration">
      <img src="@/assets/FireWork_logo.svg" alt="FireWork">
      <form>
        <input type="text" placeholder="Введите фамилию" v-model="lastName">
        <input type="text" placeholder="Введите имя" v-model="firstName">
        <input type="text" placeholder="Введите отчество" v-model="additionalName">
        <input type="text" placeholder="Введите номер телефона" v-model="phoneNumber">
        <input type="text" placeholder="Введите почту" v-model="email">
        <input type="password" placeholder="Придумайте пароль" v-model="password">
        <input type="checkbox" id="WhoAmI_slide">
        <div>
          <div id="slider"></div>
          <label for="WhoAmI_slide">Я - заказчик</label>
          <label for="WhoAmI_slide">Я - исполнитель</label>
        </div>
        <SignInButtonComp text="Регистрация"/>
      </form>
      <router-link to="/signIn" class="routeText">Войти</router-link>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import SignInButtonComp from '@/widgets/shared/SignInButtonComp.vue';

  export default defineComponent({
    name: 'SettingsPage',
    data() {
      return {

      }
    },
    setup() {
      const firstName = ref('');
      const lastName = ref('');
      const additionalName = ref('');
      const phoneNumber = ref('');
      const email = ref('');
      const password = ref('');

      return {
        firstName,
        lastName,
        additionalName,
        phoneNumber,
        email,
        password
      }
    },
    components: {
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
    #Registration {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 2.5%;
      width: 22.5%;
      height: 80%;
      background-color: #ffffff;
      border: 1px solid #43455D;
      border-radius: 30px;
      img {
        margin-top: -40px;
        width: 30%;
        height: 27.5%;
      }
      form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: -30px;
        width: 100%;
        height: 80%;
        input {
          padding-left: 5%;
          width: 95%;
          height: 40px;
          background-color: #f8f8fa;
          border: 1px solid #43455d;
          border-radius: 25px;
          color: rgba(7, 9, 40, 0.75);
          font-size: 16px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          outline: none;
        }
        #WhoAmI_slide {
          display: none;
        }
        #WhoAmI_slide:checked + div {
          #slider {
            transform: translateX(161px);
          }
          label {
            color: #000000;
          }
          label:last-child {
            color: #ffffff;
          }
        }
        div {
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 45px;
          background-color: #f8f8fa;
          border: 1px solid #43455d;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Roboto', sans-serif;
          #slider {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            background-color: #e4440c;
            border: none;
            border-radius: 23px;
            transition: 400ms ease;
            z-index: 5;
          }
          label {
            width: 80%;
            color: #ffffff;
            text-align: center;
            transition: 400ms ease;
            cursor: pointer;
            z-index: 6;
          }
          label:last-child {
            color: #000000;
          }
        }
      }
    }
    .routeText {
      margin-top: 15px;
      color: #ff7d34;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      text-decoration: none;
    }
  }
</style>  