<template>
  <HeaderComp/>
  <section>
    <aside>
      <SortingComp/>
    </aside>
    <div id="Customers">
      <div class="customer" v-for="customer of customers" :key="customer.id">
        <div>
          <img src="">
          <span>
            <p>{{ customer.name }} {{ customer.surname }}</p>
            <p>{{ customer.company }}</p>
          </span>
        </div>
        <router-link :to="`/customers/customer:${customer.id}`" class="routerButton">Подробнее о заказчике</router-link>
        <div>
          <p>Рейтинг: {{ customer.rating.score }}/10</p>
          <p>Оплата: {{ customer.price }}$</p>
          <p>Требуется: </p> <p v-for="skill of Object.values(customer.skills)" :key="skill.id">{{ skill.title }}</p>
        </div>
        <button>
          <p>Предложить задачу</p>
          <img src="@/assets/arrow_icon.svg" alt="Стрелочка"> 
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';
  import SortingComp from '@/widgets/shared/SortingComp.vue';

  interface Skill {
    id: number,
    title: string,
  }

  interface Customer {
    id: number,
    email: string,
    is_customer: boolean,
    last_name: string,
    name: string,
    notify: any,
    phone: string,
    portfolio: any,
    profile: any,
    rating: {
      score: number
    },
    skills: Skill[],
    surname: string
  }

  export default defineComponent({
    name: 'CustomersPage',
    data() {
      return {

      }
    },
    setup() {
      const customers = ref([] as Customer[]);
      const isLoaded = ref(false);

      return {
        customers,
        isLoaded
      }
    },
    methods: {
      async getAllExecutors() {
        const url = new URL('http://62.109.10.224:500/api/account/GetCustomers/');

        const result = await axios.get(url.toString(), {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(Object.values(result.data).length) {
          this.isLoaded = true;
          this.customers = Object.values(result.data);
        }
      }
    },
    mounted() {
      this.getAllExecutors();
    },
    components: {
      HeaderComp,
      SortingComp
    }
  })
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 25% 0 7.5%;
    width: 67.5%;
    aside {
      width: 32%;
      height: 600px;
    }
    #Customers {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 66%;
      min-height: 850px;
      height: auto;
      .customer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        padding: 2.5% 0;
        width: 100%;
        height: 170px;
        background-color: #ffffff;
        border: 1px solid #43455d;
        border-radius: 30px;
        div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: 50%;
          height: 35%;
          img {
            width: 50px;
            height: 80%;
            background-color: rgba(7, 9, 40, 0.75);
            border-radius: 50px;
          }
          span {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            margin-left: 10px;
            width: 60%;
            height: 100%;
            p {
              width: 100%;
              color: rgba(7, 9, 40, 0.75);
              font-size: 14px;
              font-weight: 400;
              font-family: 'Roboto', sans-serif;
            }
          }
          p {
            width: 100%;
            color: rgba(7, 9, 40, 0.75);
            font-size: 14px;
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
          }
          p:nth-child(3) {
            width: 25%;
          }
          p:last-child {
            width: 72.5%;
          }
        }
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40%;
          height: 50px;
          background-color: #f8f8fa;
          border: 1px solid #43455d;
          border-radius: 25px;
          color: rgba(7, 9, 40, 0.75);
          font-size: 12px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          cursor: pointer;
          img {
            width: 7.5%;
            margin-left: 10px;
          }
        }
        .routerButton {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40%;
          height: 50px;
          background-color: #f8f8fa;
          border: 1px solid #43455d;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          color: #ff7d34;
          text-decoration: none;
        }
      }
    }
  }
</style>