<template>
  <div>
    <img :src="photo" v-if="isLoaded">
    <div v-if="!isLoaded" class="loadedInfoImg"></div>
    <span v-if="isLoaded">
      <p>{{ name || 'Аноним' }} {{ surname }}</p>
      <p v-if="isExecutor || isCustomer" class="work">{{ work || replaceText }}</p>
      <p class="order" v-if="isChat">{{ order || 'Сделай что-нибудь' }}</p>
    </span>
    <span v-if="!isLoaded" class="loadedInfo">
      <p></p>
      <p></p>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ChoiseChatComp',
    data() {
      return {
        replaceText: ''
      }
    },
    mounted() {
      if(this.isCustomer) {
        this.replaceText = 'Работает с утками';
      } else if(this.isExecutor) {
        this.replaceText = 'Кормит IT уточек';
      }
    },
    props: {
      photo: String,
      name: String,
      surname: String,
      work: String,
      order: String,
      isExecutor: Boolean,
      isCustomer: Boolean,
      isChat: Boolean,
      isCustomerChat: Boolean,
      isLoaded: Boolean
    }
  })
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    height: 50px;
    img {
      width: 45px;
      height: 85%;
      border-radius: 50%;
    }
    .loadedInfoImg {
      width: 50px;
      height: 50px;
      background-color: #e0e0e0;
      border-radius: 50%;
    }
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 80%;
      height: 40px;
      color: #000000;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      p {
        margin-left: 10px;
        width: 100%;
      }
      p:last-child {
        font-size: 14px;
        font-weight: 400;
      }
    }
    .loadedInfo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 50%;
      height: 45px;
      p {
        height: 12.5px;
        background-color: #e0e0e0;
        border-radius: 2.5px;
      }
      p:first-child {
        width: 60%;
      }
      p:last-child {
        width: 45%;
      }
    }
  }
</style>