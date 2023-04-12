<template>
  <div class="message">
    <img :src="photo">
    <p>{{ targetMessage }}</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';

  export default defineComponent({
    name: 'MessageComp',
    setup() {
      const targetMessage = ref('' as string || undefined);

      return {
        targetMessage
      }
    },
    mounted() {
      this.targetMessage = this.message;
      if(this.targetMessage != undefined) {
        this.targetMessage = this.targetMessage.slice(0, 27) + ' ' + this.targetMessage.slice(28, 54) + ' ' + this.targetMessage.slice(55);
      }
    },
    props: {
      message: String,
      photo: String
    }
  })
</script>

<style lang="scss">
  .message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
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
    }
  }
  .message:first-child {
    margin-top: 0px;
  }
</style>