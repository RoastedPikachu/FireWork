<template>
  <HeaderComp/>
  <div id="darkBg" v-if="isAddingActive"></div>
  <section>
    <aside>
      <SortingComp @sort="sort"/>
    </aside>
    <div id="Customers">
      <div id="Customers_AddOrder" v-if="isCustomer">
        <button @click="() => isAddingActive = !isAddingActive">Добавить заказ</button>
        <div id="Customers_AddingOrder" v-if="isAddingActive">
          <div id="Name">
            <h4>Название:</h4>
            <input type="text" v-model="orderName">
          </div>
          <div id="Desc">
            <h4>Описание заказа:</h4>
            <textarea v-model="orderDesc"></textarea>
          </div>
          <div id="Skills">
            <h4>Необходимые для заказа скиллы (выберите от 1 до 4 пунктов):</h4>
            <input type="text" v-for="orderSkill of orderSkills" :key="orderSkill.id" v-model="orderSkill.title">
          </div>
          <div id="Other">
            <span>
              <p>Цена:</p>
              <input type="text" v-model="orderPrice">
            </span>
            <span>
              <p>Срок:</p>
              <input type="text" v-model="orderDeadline">
            </span>
            <span>
              <p>Место:</p>
              <input type="text" v-model="orderPlace">
            </span>
          </div>
          <button @click="addOrder()">Опубликовать</button>
        </div>
      </div>
      <div class="customer" v-for="customer of customers" :key="customer.id">
        <ItemBrieflyInfoComp :name="customer.name" :surname="customer.surname" :work="customer.work" :isCustomer="true" :isLoaded="isLoaded" :photo="photo"/>
        <router-link :to="`/profile:${customer.id}`" class="routerButton">Подробнее о заказчике</router-link>
        <div>
          <p>Рейтинг: {{ customer.rating.score }}/10</p>
          <p>Оплата: 100$</p>
          <p>Требуется: </p> <p v-for="skill of Object.values(customer.skills)" :key="skill.id">{{ skill.title }}</p>
        </div>
        <button @click="sendMessage(customer.id)">
          <p>Предложить услуги</p>  
          <img src="@/assets/arrow_icon.svg" alt="Стрелочка"> 
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';
  import SortingComp from '@/widgets/shared/SortingComp.vue';
  import ItemBrieflyInfoComp from '@/widgets/shared/ItemBrieflyInfoComp.vue';

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
      const photo = ref('');
      const orderName = ref('');
      const orderDesc = ref('');
      const orderSkills = ref([
        {
          id: 0,
          title: ''
        },
        {
          id: 0,
          title: ''
        },
        {
          id: 0,
          title: ''
        },
        {
          id: 0,
          title: ''
        },
      ] as Skill[]);
      const orderPrice = ref('');
      const orderDeadline = ref('');
      const orderPlace = ref('');
      const isCustomer = ref(false);
      const isAddingActive = ref(false);
      const isLoaded = ref(false);

      return {
        customers,
        photo,
        orderName,
        orderDesc,
        orderSkills,
        orderPrice,
        orderDeadline,
        orderPlace,
        isCustomer,
        isAddingActive,
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
          this.photo = result.data[0].photo;
          this.customers = Object.values(result.data);
        }
      },
      sort(sortingParams:any) {
        if(sortingParams.topRating) {
          let skill = '';
          if(sortingParams.isPython && !sortingParams.isJS) {
            skill = 'Python'
            this.customers = this.customers.filter(item => item.skills[0]?.title == skill);
          } else if(sortingParams.isJS && !sortingParams.isPython) {
            skill = 'JavaScript'
            this.customers = this.customers.filter(item => item.skills[0]?.title == skill);
          } 
          this.customers = this.customers.filter(item => (item.rating.score > sortingParams.lowRating && item.rating.score <= sortingParams.topRating));
        } else {
          let skill = '';
          if(sortingParams.isPython && !sortingParams.isJS) {
            skill = 'Python'
            this.customers = this.customers.filter(item => item.skills[0]?.title == skill);
          } else if(sortingParams.isJS && !sortingParams.isPython) {
            skill = 'JavaScript'
            this.customers = this.customers.filter(item => item.skills[0]?.title == skill);
          }
        }
      },
      async sendMessage(id:number) {
        const url = new URL('http://62.109.10.224:500/api/account/newNotify/');

        const payload = {
          title: 'Ваш заказ готовы принять',
          to_user: id
        }

        const result = await axios.post(url.toString(), payload, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        console.log(result);
      },
      async addOrder() {
        const url = new URL('http://62.109.10.224:500/api/task/create/');

        let payload = {
          title: this.orderName,
          description: this.orderDesc,
          price: this.orderPrice,
          deadlines: this.orderDeadline,
          place: this.orderPlace,
          category: [],
          token: document.cookie.slice(261)
        }

        const result = await axios.post(url.toString(), payload, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        })

        console.log(result);
        this.orderName = '';
        this.orderDesc = '';
        this.orderPrice = '';
        this.orderDeadline = '';
        this.orderPlace = '';
        this.orderSkills = [];
      },
      async getInfoAboutUser() {
        const url = new URL('http://62.109.10.224:500/api/account/data/');

        const token = document.cookie.slice(261);

        const result = await axios.post(url.toString(), {token: token}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(result.data.portfolio) {
          this.isCustomer = result.data.is_customer;
        } 
      }
    },
    mounted() {
      this.getInfoAboutUser();
      this.getAllExecutors(); 
    },
    components: {
      HeaderComp,
      SortingComp,
      ItemBrieflyInfoComp
    }
  })
</script>

<style lang="scss" scoped>
  #darkBg {
    position: absolute;
    width: 100%;
    height: 110vh;
    background-color: rgba(0,0,0,0.2);
    z-index: 15;
  }
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
      width: 66%;
      min-height: 850px;
      height: auto;
      #Customers_AddOrder {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
        background-color: #ffffff;
        border: 1px solid #43455d;
        border-radius: 25px;
        button {
          width: 50%;
          height: 70%;
          background-color: #ff7d34;
          border: none;
          border-radius: 20px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          cursor: pointer;
        }
        #Customers_AddingOrder {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          top: 0%;
          width: 100%;
          height: 600px;
          background-color: #ffffff;
          border: 1px solid #43455d;
          border-radius: 25px;
          z-index: 16;
          #Name {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 85%;
            height: 70px;
            h4 {
              margin-left: 1.5%;
              color: rgba(7, 9, 40, 0.75);
              font-size: 16px;
              font-weight: 400;
              font-family: 'Roboto', sans-serif;
            }
            input {
              padding: 0 2.5%;
              width: 100%;
              height: 40px;
              background-color: #F8F8FA;
              border: 1px solid #43455d;
              border-radius: 25px;
              color: rgba(7, 9, 40, 0.75);
              font-size: 14px;
              font-weight: 500;
              font-family: 'Roboto', sans-serif;
              outline: none;
            }
          }
          #Desc {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 85%;
            height: 210px;
            h4 {
              margin-left: 1.5%;
              color: rgba(7, 9, 40, 0.75);
              font-size: 16px;
              font-weight: 400;
              font-family: 'Roboto', sans-serif;
            }
            textarea {
              padding: 2.5% 2.5%;
              width: 100%;
              height: 150px;
              background-color: #F8F8FA;
              border: 1px solid #43455d;
              border-radius: 25px;
              color: rgba(7, 9, 40, 0.75);
              font-size: 14px;
              font-weight: 500;
              font-family: 'Roboto', sans-serif;
              resize: none;
              outline: none;
            }
          }
          #Skills {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            width: 85%;
            height: 75px;
            h4 {
              margin-left: 1.5%;
              width: 98.5%;
              color: rgba(7, 9, 40, 0.75);
              font-size: 16px;
              font-weight: 400;
              font-family: 'Roboto', sans-serif;
              text-align: left;
            }
            input {
              padding: 0 2.5%;
              width: 17.5%;
              height: 45px;
              background-color: #F8F8FA;
              border: 1px solid #43455d;
              border-radius: 25px;
              color: rgba(7, 9, 40, 0.75);
              font-size: 14px;
              font-weight: 500;
              font-family: 'Roboto', sans-serif;
              outline: none;
            }
          }
          #Other {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 85%;
            height: 65px;
            span {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-left: 30px;
              width: 30%;
              height: 65px;
              p {
                color: rgba(7, 9, 40, 0.75);
                font-size: 16px;
                font-weight: 400;
                font-family: 'Roboto', sans-serif;
              }
              input {
                padding: 0 5%;
                width: 55%;
                height: 35px;
                background-color: #F8F8FA;
                border: 1px solid #43455d;
                border-radius: 25px;
                color: rgba(7, 9, 40, 0.75);
                font-size: 14px;
                font-weight: 500;
                font-family: 'Roboto', sans-serif;
                outline: none;
              }
            }
            span:first-child {
              margin-left: 0px;
            }
          }
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -2.5%;
            width: 40%;
            height: 50px;
            background-color: #F8F8FA;
            border: 1px solid #43455d;
            border-radius: 25px;
            color: #ff7d34;
            font-size: 16px;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
            outline: none;
            cursor: pointer;
          }
        }
      }
      .customer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20px;
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
          outline: none;
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
      .customer:first-child {
        margin-top: 0px;
      }
    }
  }
</style>