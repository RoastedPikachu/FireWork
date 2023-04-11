<template>
  <section>
    <div id="Registration">
      <img src="@/assets/FireWork_logo.svg" alt="FireWork">
      <form>
        <ErrorComp :errorMessage="errorMessage" v-if="isError"/>
        <input type="text" placeholder="Имя" v-model="firstName">
        <input type="text" placeholder="Фамилия" v-model="lastName">
        <input type="text" placeholder="Отчество" v-model="additionalName">
        <input type="text" placeholder="Номер телефона" v-model="phoneNumber">
        <input type="text" placeholder="Почта" v-model="email">
        <input type="password" placeholder="Придумайте пароль" v-model="password">
        <input type="checkbox" id="WhoAmI_slide" v-model="isExecutor">
        <div>
          <div id="slider"></div>
          <label for="WhoAmI_slide">Я - заказчик</label>
          <label for="WhoAmI_slide">Я - исполнитель</label>
        </div>
        <SignInButtonComp text="Регистрация" @click="setRegistrationData()"/>
      </form>
      <router-link to="/signIn" class="routeText">Войти</router-link>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import ErrorComp from '@/widgets/shared/ErrorComp.vue';
  import SignInButtonComp from '@/widgets/shared/SignInButtonComp.vue';

  interface Payload {
    name: string,
    surname: string,
    last_name: string,
    phone: string,
    email: string,
    password: string,
    is_customer: boolean
  }

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
      const isExecutor = ref(false);
      const errorMessage = ref('');
      const isError = ref(false);

      return {
        firstName,
        lastName,
        additionalName,
        phoneNumber,
        email,
        password,
        isExecutor,
        errorMessage,
        isError
      }
    },
    methods: {
      async setRegistrationData() {
        const url = new URL('http://62.109.10.224:500/api/auth/register/');

        const payload:Payload = {
          name: this.firstName,
          surname: this.lastName,
          last_name: this.additionalName,
          phone: this.phoneNumber,
          email: this.email,
          password: this.password,
          is_customer: !this.isExecutor
        }

        console.log(this.isExecutor);

        const result = await axios.post(url.toString(), payload, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(result.data.error) {
          this.errorMessage = result.data.error;
          this.isError = true;
        } else if(result.data.status === 'success') {
          this.$router.push('/signIn');
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
      margin-top: 20px;
      color: #ff7d34;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      text-decoration: none;
    }
  }
</style>  