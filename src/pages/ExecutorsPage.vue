<template>
  <HeaderComp/>
  <section>
    <aside>
      <SortingComp @sort="sort"/>
    </aside>
    <div id="Executors">
      <div id="Executors_AddResume" v-if="isExecutor">
        <button @click="() => isAddingActive = !isAddingActive">Добавить своё резюме</button>
        <div v-if="isAddingActive">

        </div>
      </div>
      <div class="executor" v-for="executor of executors" :key="executor.id">
        <ItemBrieflyInfoComp :name="executor.name" :surname="executor.surname" :work="executor.work" :isExecutor="true" :isLoaded="isLoaded" :photo="photo"/>
        <router-link :to="`/profile:${executor.id}`" class="routerButton">Подробнее об исполнителе</router-link>
        <div>
          <p>Рейтинг: {{ executor.rating.score }}/10</p>
          <p>Средняя цена работы: {{ executor.averagePrice || 100 }}$</p>
          <p>Умеет: </p> <p v-for="skill of Object.values(executor.skills)" :key="skill.id">{{ skill.title }}</p>
        </div>
        <button @click="sendMessage(executor.id)">
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
  import ItemBrieflyInfoComp from '@/widgets/shared/ItemBrieflyInfoComp.vue';

  export default defineComponent({
    name: 'ExecutorsPage',
    data() {
      return {

      }
    },
    setup() {
      const executors = ref([
        {
          id: 0,
          name: '',
          surname: '',
          work: '',
          rating: {
            score: 0,
          },
          averagePrice: 0,
          skills: [
            {
              id: 0,
              title: ''
            }
          ]
        }
      ]);
      const isAddingActive = ref(false);
      const photo = ref('');
      const isExecutor = ref(false);
      const isLoaded = ref(false);

      return {
        executors,
        isAddingActive,
        photo,
        isExecutor,
        isLoaded
      }
    },
    methods: {
      async getAllExecutors() {
        const url = new URL('http://62.109.10.224:500/api/account/GetWorkers/');

        const result = await axios.get(url.toString(), {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(Object.values(result.data).length) {
          this.isLoaded = true;
          this.photo = result.data[0].photo;
          this.executors = Object.values(result.data);
        }
      },
      sort(sortingParams:any) {
        if(sortingParams.topRating) {
          let skill = '';
          if(sortingParams.isPython && !sortingParams.isJS) {
            skill = 'Python'
            this.executors = this.executors.filter(item => item.skills[0]?.title == skill);
          } else if(sortingParams.isJS && !sortingParams.isPython) {
            skill = 'JavaScript'
            this.executors = this.executors.filter(item => item.skills[0]?.title == skill);
          } 
          this.executors = this.executors.filter(item => (item.rating.score > sortingParams.lowRating && item.rating.score <= sortingParams.topRating));
        } else {
          let skill = '';
          if(sortingParams.isPython && !sortingParams.isJS) {
            skill = 'Python'
            this.executors = this.executors.filter(item => item.skills[0]?.title == skill);
          } else if(sortingParams.isJS && !sortingParams.isPython) {
            skill = 'JavaScript'
            this.executors = this.executors.filter(item => item.skills[0]?.title == skill);
          }
        }
      },
      async getInfoAboutUser() {
        const url = new URL('http://62.109.10.224:500/api/account/data/');

        const token = document.cookie.slice(261);

        const result = await axios.post(url.toString(), {token: token}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(result.data.portfolio) {
          this.isExecutor = !result.data.is_customer;
        } 
      },
      async sendMessage(id:number) {
        const url = new URL('http://62.109.10.224:500/api/account/newNotify/');

        const payload = {
          title: 'Вам готовы предложить задачу',
          user_id: id
        }

        const result = await axios.post(url.toString(), payload, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        console.log(result);
      },
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
    #Executors {
      width: 66%;
      min-height: 850px;
      height: auto;
      #Executors_AddResume {
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
      }
      .executor {
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
            width: 17.5%;
          }
          p:last-child {
            width: 80%;
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
      .executor:first-child {
        margin-top: 0px;
      }
    }
  }
</style>