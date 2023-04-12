<template>
  <div class="myMessage">
    <p>{{ targetMessage }}</p>
    <img :src="photo">
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';

  export default defineComponent({
    name: 'MyMessageComp',
    setup() {
      const targetMessage = ref('' as string || undefined);

      return {
        targetMessage
      }
    },
    mounted() {
      this.targetMessage = this.message;
      if(this.targetMessage != undefined) {
        this.targetMessage = this.targetMessage.slice(0, 25) + ' ' + this.targetMessage.slice(26, 52) + ' ' + this.targetMessage.slice(53);
      }
    },
    props: {
      message: String,
      photo: String
    }
  })
</script>

<style lang="scss">
  .myMessage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    margin-left: 60%;
    width: 320px;
    height: 60px;
    img {
      width: 50px;
      height: 50px;
      background-color: #e0e0e0;
      border-radius: 50%;
    }
    p {
      padding: 20px 20px;
      width: 220px;
      min-height: 20px;
      height: auto;
      background-color: #F8F8FA;
      border: 1px solid #43455D;
      border-radius: 25px;
      color: #000000;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      outline: none;
    }
  }
  .myMessage:first-child {
    margin-top: 0px;
  }
</style>