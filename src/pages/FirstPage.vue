<template>
  <HeaderComp/>
  <main>
    <div id="Greetings">
      <h2>Сделаем всё, чтобы</h2>
      <h2><img src="@/assets/FireWork_logo.svg" alt="Логотип"><strong>ВАШИ</strong> дедлайны не сгорели!</h2>
    </div>
    <div id="Description">
      <p>FireWork - новый сервис для фрилансеров и заказчиков. Мы создали удобный и безопасный маркетплейс, где заказчики 
        могут найти опытных исполнителей для решения любых задач, а исполнители могут предложить свои услуги заказчикам.
      </p>
      <p>Наша система оценки заказчика позволяет исполнителям оставлять отзывы о своих заказчиках. Это не только
        помогает заказчикам получать качественные услуги, но и поддерживает мотивацию наших исполнителей. Качество
        работы наших исполнителей и удовлетворённость наших заказчиков - наш главный приоритет.
      </p>
      <p>Мы создали FireWork для того, чтобы помочь фрилансерам и заказчикам в решении их задач на удалённой основе. 
        Наша команда постоянно работает над улучшением сервиса и предоставлением наиболее выгодных условий для наших
        пользователей. Присоединяйтесь к нам и получите надёжную и безопасную платформу для работы и бизнеса!
      </p>
      <p>Прямо сейчас вы можете сделать заказ или предложить свои услуги нажав на логотип ниже</p>
      <router-link to="/home" class="routeImg">
        <img src="@/assets/FireWork_logo.svg" alt="Логотип">
      </router-link>
    </div>
    <div id="Advantages">
      <h3>Удобство использования</h3>
      <h3>Защита заказчиков и исполнителей</h3>
      <h3>Приятный дизайн</h3>
    </div>
    <footer>
      <p>Telegram - <a href="">@firework_support</a></p>
    </footer>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';

  export default defineComponent({
    name: 'ChatPage',
    components: {
      HeaderComp
    }
  })
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 5% 0 7.5%;
    width: 87.5%;
    height: 1400px;
    #Greetings {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 700px;
      background-image: url('@/assets/main_bg.jpg');
      h2 {
        position: relative;
        margin-top: 17.5%;
        margin-left: 10%;
        width: 90%;
        color: #000000;
        font-size: 66px;
        font-weight: 700;
        font-family: 'Roboto', sans-serif;
        strong {
          color: #e23b0e;
        }
        img {
          position: absolute;
          margin-top: -1%;
          margin-left: -8.5%;
          width: 10%;
        }
      }
      h2:last-child {
        margin-top: -15%;
        margin-left: 15%;
      }
    }
    #Description {
      padding-top: 50px;
      width: 100%;
      height: 750px;
      background-color: #ffffff;
      p {
        margin-top: 20px;
        margin-left: 10%;
        width: 80%;
        color: #000000;
        font-size: 28px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        text-align: center;
      }
      .routeImg {
        position: relative;
        margin-top: 30px;
        margin-left: 41.5%;
        width: 15%;
        height: 20%;
        img {
          width: 15%;
          height: 20%;
        }
      }
    }
    #Advantages {
      padding-top: 50px;
      width: 100%;
      height: 400px;
      background-color: #ffffff;
      h3 {
        color: #000000;
        font-size: 40px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
      }
      h3:first-child {
        margin-left: 10%;
      }
      h3:nth-child(2) {
        margin-top: 5%;
        margin-left: 22.5%;
      }
      h3:last-child {
        margin-top: 5%;
        margin-left: 62.5%;
      }
    }
    footer {
      width: 100%;
      height: 450px;
      background-image: url('@/assets/footer_bg.jpg');
      p {
        margin-top: 15%;
        margin-left: 60%;
        color: #000000;
        font-size: 32px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        a {
          color: #000000;
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
  }
</style>