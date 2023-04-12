<template>
  <HeaderComp/>
  <section>
    <aside>
      <ChoiseChatComp/>
    </aside>
    <div id="Chat"> 
      <div id="Chat_OrderBlock">
        <ItemBrieflyInfoComp :name="name" :surname="surname" :work="company" :isCustomer="true" :isLoaded="isLoaded"/>
        <p v-if="isLoaded">ТЗ: {{ description || 'Вам что-то необходимо сделать' }}</p>
        <p class="loadedDesc" v-if="!isLoaded">ТЗ: <i>dsgbudzysyvbsbdvbsbvhsbvbsbvdhsbvs vb sbvbsvbsbvsbvsbyvbdsbvsdybidsbvsdvbgsbvsbdhvbsvbsviiiiiii</i> <i>dsbvsdvbgsbvsbdhvbsvbsvbhssdngsdugsduydsgbsdbgsbgjhbsdgsdbgbsugbsbgbsdgsbs</i></p>
      </div>
      <div id="Chat_Messages">
        <MessageComp v-for="message of messages" :key="message.id" :message="message.text"/>
        <MyMessageComp v-for="myMessage of myMessages" :key="myMessage.id" :message="myMessage.text"/>
      </div>
      <div id="Chat_SendMessage">
        <input type="text" v-model="mess" :placeholder="errMess">
        <button type="button" @click="sendMessage()">
          <img src="@/assets/arrow_icon.svg">
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
  import ChoiseChatComp from '@/widgets/features/ChoiseChatComp.vue';
  import ItemBrieflyInfoComp from '@/widgets/shared/ItemBrieflyInfoComp.vue';
  import MessageComp from '@/widgets/shared/MessageComp.vue';
  import MyMessageComp from '@/widgets/shared/MyMessageComp.vue';

  interface Message {
    id: number,
    from: string,
    text: string,
    time: string,
    viewed: boolean,
  }

  export default defineComponent({
    name: 'ChatPage',
    data() {
      return {

      }
    },
    setup() {
      const isLoaded = ref(false);
      const messages = ref([] as Message[]);
      const myMessages = ref([] as Message[]);
      const user = ref('');
      const chatId = ref(0);
      const mess = ref('');
      const errMess = ref('');
      const index = ref(0);
      
      return {
        isLoaded,
        messages,
        myMessages,
        user,
        chatId,
        mess,
        errMess,
        index,
      }
    },
    methods: {
      async sendMessage() {
        if(this.mess.length > 2) {
          this.myMessages.push({
            id: this.index,
            from: this.user,
            text: this.mess,
            time: '',
            viewed: false
          })

          const url = new URL('http://62.109.10.224:500/api/chat/CreateMessage/');

          const payload = {
            chat_id: this.chatId,
            msg: this.mess,
            token: document.cookie.slice(261)
          }

          this.mess = '';
          this.index++;

          const result = await axios.post(url.toString(), payload, {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
          });
        } else {
          this.errMess = 'Слишком мало символов';
        }
      },

      async getAllMessages() {
        const url = new URL('http://62.109.10.224:500/api/chat/get_chat/');

        const payload = {
          token: document.cookie.slice(261),
          chat_id: 4,
        }

        const result = await axios.post(url.toString(), payload, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        })

        let messArr:Message[] = Object.values(result.data);

        if(result) {
          this.myMessages = messArr.filter(item => item.from == 'me');
          this.messages = messArr.filter(item => item.from != 'me');
          this.isLoaded = true;
        }
      },

      async getInfoAboutUser() {
        const url = new URL('http://62.109.10.224:500/api/account/data/');

        const token = document.cookie.slice(261);

        const result = await axios.post(url.toString(), {token: token}, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });

        if(result.data.portfolio) {
          this.user = `${result.data.name} ${result.data.surname}`;
        } 
      }
    },
    mounted() {
      setInterval(() => {
        this.getAllMessages();
      }, 10000);
    },
    components: {
      HeaderComp,
      ChoiseChatComp,
      ItemBrieflyInfoComp,
      MessageComp,
      MyMessageComp
    }
  })
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 5% 0 7.5%;
    width: 87.5%;
    aside {
      width: 22%;
      height: 600px;
    }
    #Chat {
      width: 76%;
      height: 750px;
      background-color: #ffffff;
      border: 1px solid #43455D;
      border-radius: 30px;
      #Chat_OrderBlock {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-left: 3.5%;
        width: 96.5%;
        height: 150px;
        border: 1px solid #43455d;
        border-width: 0 1px 1px 1px;
        border-radius: 30px;
        p {
          width: 100%;
          height: 50px;
          color: rgba(7, 9, 40, 0.75);
          font-size: 16px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
        }
        .loadedDesc {
          margin-left: 1.5%;
          width: 90%;
          p {
            width: 15%;
            color: rgba(7, 9, 40, 0.75);
            font-size: 16px;
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
            border-radius: 2.5px;
          }
          i {
            width: 85%;
            height: 12.5px;
            color: #e0e0e0;
            background-color: #e0e0e0;
            border-radius: 2.5px;
            cursor: default;
          }
          i:last-child {
            line-height: 30px;
          }
        }
      }
      #Chat_Messages {
        padding-top: 20px;
        margin-left: 5%;
        width: 90%;
        height: 500px;
        overflow: scroll;
      }
      #Chat_SendMessage {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 2.5%;
        padding: 0 2.5%;
        width: 90%;
        height: 50px;
        background-color: #f8f8f8;
        border: 1px solid #43455d;
        border-radius: 25px;
        input {
          padding-left: 2.5%;
          width: 75%;
          height: 75%;
          border: none;
          border-radius: 10px;
          color: #000000;
          font-size: 16px;
          font-weight: 500; 
          font-family: 'Roboto', sans-serif;
          outline: none;
        }
        button {
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
</style>