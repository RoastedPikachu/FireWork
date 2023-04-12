<template>
  <HeaderComp/>
  <section>
    <aside>
      <ProfileComp :isProfile="false" />
      <OrdersAndSkillsComp :isProfile="false"/>
    </aside>

    <div id="AllInfo">

      <div id="AllInfo_Reviews">
        <h3>Отзывы</h3>
        <div v-for="review of reviews" :key="review.id">
          <span>
            <p>{{ review.description }}</p>
            <p>{{ review.author }}</p>
          </span>
          <p>{{ review.mark }}</p>
          <button>Читать подробнее</button>
        </div>
        <button>Показать все отзывы</button>
      </div> 

      <div id="AllInfo_GeneralInfo">
        <TopDataProfileComp :title="'Общая информация'" :isProfile="false"/>
        <textarea v-model="generalData" :disabled="!isEdit" v-if="isLoaded"></textarea>
        <span v-if="!isLoaded" class="loadedTextarea">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </span>
      </div> 

      <div id="AllInfo_Data">
        <TopDataProfileComp :title="'Данные'" :isProfile="false"/>
        <textarea v-model="dataAboutUser" :disabled="!isEdit" v-if="isLoaded"></textarea>
        <span v-if="!isLoaded" class="loadedTextarea">
          <p></p>
          <p></p>
        </span>
      </div>

      <div id="AllInfo_Portfolio" v-if="isExecutor">
        <TopDataProfileComp :title="'Портфолио'" :isProfile="false"/>
        <textarea v-model="portfolioData" :disabled="!isEdit" v-if="isLoaded"></textarea>
        <span v-if="!isLoaded" class="loadedTextarea">
          <p></p>
          <p></p>
          <p></p>
        </span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';
  import ProfileComp from '@/widgets/features/ProfileComp.vue';
  import OrdersAndSkillsComp from '@/widgets/features/OrdersAndSkillsComp.vue';
  import TopDataProfileComp from '@/widgets/miniShared/TopDataProfileComp.vue';

  export default defineComponent({
    name: 'OtherProfilePage',
    data() {
      return {

      }
    },
    setup() {
      const dataAboutUser = ref('');
      const portfolioData = ref('');
      const generalData = ref('');
      const reviews = ref([
        {
          id: 0,
          description: 'Сделал что-то круто и быстро',
          author: 'Виталий Печёнкин',
          mark: '5.2/10'
        },
        {
          id: 1,
          description: 'Сделал что-то круто и быстро',
          author: 'Виталий Печёнкин',
          mark: '5.2/10'
        },
        {
          id: 2,
          description: 'Сделал что-то круто и быстро',
          author: 'Виталий Печёнкин',
          mark: '5.2/10'
        },
        {
          id: 3,
          description: 'Сделал что-то круто и быстро',
          author: 'Виталий Печёнкин',
          mark: '5.2/10'
        },
      ]);
      const isExecutor = ref(false);
      const isEdit = ref(false);
      const isLoaded = ref(false);

      return {
        dataAboutUser,
        portfolioData,
        generalData,
        reviews,
        isExecutor,
        isEdit,
        isLoaded,
      }
    },
    methods: {
      async getInfoAboutUserById() {
        const url = new URL('http://62.109.10.224:500/api/account/get_user/');

        const id = window.location.pathname.slice(9);

        const result = await axios.post(url.toString(), {user_id: id}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        console.log(result);

        if(result.data.portfolio) {
          this.isLoaded = true;
          this.isExecutor = !result.data.is_customer;
          this.generalData = result.data.profile.description;
          this.portfolioData = result.data.portfolio.data;
        } 
      }
    },
    mounted() {
      setInterval(() => {
        this.getInfoAboutUserById();
      }, 5000)
    },
    components: {
      HeaderComp,
      ProfileComp,  
      OrdersAndSkillsComp,
      TopDataProfileComp
    }
  });
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 5% 0 7.5%;
    width: 87.5%;
    aside {
      width: 22.5%;
    }
    #AllInfo {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 76%;
      height: auto;
      min-height: 800px;
      #AllInfo_Data {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 1.5% 2.5%;
        width: 30%;
        height: 150px;
        background-color: #ffffff;
        border: 1px solid #43455D;
        border-radius: 30px;
        span {
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            color: #FF7D34;
            font-size: 16px;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
          }
          img {
            margin-top: -1%;
            margin-left: 2.5%;
            cursor: pointer;
          }
        }
        textarea {
          margin-top: 5%;
          width: 95%;
          height: 75%;
          background-color: transparent;
          border: none;
          color: #070928;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          resize: none;
          outline: none;
        }
        .loadedTextarea {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-top: 5%;
          width: 95%;
          height: 75%;
          p {
            width: 90%;
            height: 13.5px;
            background-color: #e0e0e0;
            border-radius: 2.5px;
          }
          p:last-child {
            margin-top: -40px;
            width: 70%;
          }
        }
      }
      #AllInfo_Portfolio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 1.5% 2.5%;
        width: 58%;
        height: 150px;
        background-color: #ffffff;
        border: 1px solid #43455D;
        border-radius: 30px;
        textarea {
          margin-top: 2.5%;
          width: 95%;
          height: 75%;
          background-color: transparent;
          border: none;
          color: #070928;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          resize: none;
          outline: none;
        }
        .loadedTextarea {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-top: 2.5%;
          width: 95%;
          height: 75%;
          p {
            width: 90%;
            height: 13.5px;
            background-color: #e0e0e0;
            border-radius: 2.5px;
          }
          p:nth-child(2) {
            margin-top: -25px;
            width: 90%;
          }
          p:last-child {
            margin-top: -35px;
            width: 75%;
          }
        }
      }
      #AllInfo_GeneralInfo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 1.5% 2.5%;
        width: 100%;
        height: 200px;
        background-color: #ffffff;
        border: 1px solid #43455D;
        border-radius: 30px;
        textarea {
          margin-top: 2.5%;
          width: 95%;
          height: 75%;
          background-color: transparent;
          border: none;
          color: #070928;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          resize: none;
          outline: none;
        }
        .loadedTextarea {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-top: 2.5%;
          width: 95%;
          height: 75%;
          p {
            width: 90%;
            height: 13.5px;
            background-color: #e0e0e0;
            border-radius: 2.5px;
          }
          p:nth-child(2) {
            margin-top: -25px;
            width: 90%;
          }
          p:nth-child(3) {
            margin-top: -35px;
            width: 85%;
          }
          p:last-child {
            margin-top: -45px;
            width: 70%;
          }
        }
      }
      #AllInfo_Reviews {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 1.5% 2.5%;
        width: 100%;
        height: 300px;
        background-color: #ffffff;
        border: 1px solid #43455D;
        border-radius: 30px;
        h3 {
          width: 100%;
          color: #FF7D34;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
        }
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          width: 100%;
          span {
            width: 70%;
            p {
              color: #070928;
              font-size: 14px;
            }
            p:last-child {
              margin-top: 7.5px;
              color: rgba(7, 9, 40, 0.75);
              font-size: 12px;
            }
          }
          p {
            color: rgba(7, 9, 40, 0.75);
            font-size: 12px;
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
          }
        }
        div {
          margin-top: 0px;
        }
        button {
          background-color: transparent;
          border: none;
          color: #ff7d34;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          cursor: pointer;
        }
      }
    }
  }
</style>