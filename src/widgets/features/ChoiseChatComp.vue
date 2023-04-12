<template>
  <div id="Choise">
    <h2>Выбрать чат</h2>
    <div id="Choise_chats_wrapper">
      <ItemBrieflyInfoComp v-for="user of users" :key="user.id" :name="user.name" :surname="user.surname" :order="user.order" :isChat="true" :isCustomerChat="user.isCustomer" v-show="isLoaded"/>
      <div id="LoadedChats" v-for="loadedUser of loadedUsers" :key="loadedUser.id">
        <div></div>
        <span>
          <p></p>
          <p></p>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';

  // interface User {

  // }

  export default defineComponent({
    name: 'ChoiseChatComp',
    data() {
      return {

      }
    },
    setup() {
      const users = ref([]);
      const loadedUsers = ref([
        {
          id: 0
        },
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
      ]);
      const isLoaded = ref(false);

      return {
        users,
        loadedUsers,
        isLoaded
      }
    },
    methods: {
      async getAllChats() {
        const url = new URL('http://62.109.10.224:500/api/chat/all/');

        const token = document.cookie.slice(261);

        const result = await axios.post(url.toString(), {token: token}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(result) {
          this.isLoaded = true;
        }
      }
    },
    mounted() {
      setInterval(() => {  
        this.getAllChats();
      }, 10000);
    }
  })
</script>

<style lang="scss" scoped>
  #Choise {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 340px;
    background-color: #ffffff;
    border: 1px solid #43455D;
    border-radius: 30px;
    h2 {
      margin-top: 15px;
      height: 20px;
      color: #070928;
      font-size: 20px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
    }
    #Choise_chats_wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      height: 280px;
      overflow: scroll;
      #LoadedChats {
        display: flex;
        align-items: center;
        width: 100%;
        height: 70px;
        div {
          width: 50px;
          height: 70%;
          background-color: #e0e0e0;
          border-radius: 50%;
        }
        span {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          width: 80%;
          height: 40px;
          p {
            margin-left: 10px;
            width: 70%;
            height: 12.5px;
            background-color: #e0e0e0;
            border-radius: 2.5px;
          }
          p:last-child {
            width: 50%;
          }
        }
      }
    }
  }
</style>