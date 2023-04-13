<template>
  <div id="Notifications">
    <div id="Notification_wrapper">
      <div v-for="notif of notifications" :key="notif.id">{{ notif.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import store from '@/store/index';
  import axios from 'axios';

  interface Notif {
    id: number,
    title: string,
  }

  export default defineComponent({
    name: 'ModalNotifComp',
    setup() {
      const notifications = ref([
        {
          id: 0,
          title: ''
        },
        {
          id: 1,
          title: ''
        },
      ] as Notif[]);
      const targetId = ref(0);

      return {
        notifications,
        targetId,
      }
    },
    methods: {
      async getInfoAboutUser() {
        const url = new URL('http://62.109.10.224:500/api/account/data/');

        const token = document.cookie.slice(261);

        const result = await axios.post(url.toString(), {token: token}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        console.log(result);

        if(result.data.portfolio) {
          // if(this.targetId == result.data.id) {
          //   setInterval(() => {
          //     this.notifications = store.state.notifications;
          //   }, 500);
          // } 
          this.notifications = Object.values(result.data.notify);
        } 
      }
    },
    mounted() {
      setInterval(() => {
        this.getInfoAboutUser();
      }, 500);
      // setInterval(() => {
      //   this.targetId = store.state.targetId;
      // }, 500);
    }
  })
</script>

<style lang="scss" scoped>
  #Notifications {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 20px;
    width: 320px;
    height: 230px;
    background-color: #ffffff;
    border: 1px solid #43455d;
    border-radius: 30px;
    z-index: 10;
    #Notification_wrapper {
      margin-top: 10px;
      width: 90%;
      height: 210px;
      overflow: scroll;
      div {
        margin-top: 15px;
        padding: 5.5% 5%;
        width: 85%;
        height: 20px;
        background-color: #F8F8FA;
        border: 1px solid #43455d;
        border-radius: 25px;
        color: #000000;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        cursor: pointer;
      }
      div:first-child {
        margin-top: 0;
      }
    }
  }
</style>