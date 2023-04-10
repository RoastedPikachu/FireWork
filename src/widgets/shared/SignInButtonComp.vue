<template>
  <button>{{ text }}</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SignInButtonComp',
    data() {
      return {

      }
    },
    props: {
      text: String
    }
  })
</script>

<style lang="scss" scoped>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 50px;
    background-color: #f8f8fa; 
    border: 1px solid #43455d;
    border-radius: 25px;
    color: #ff7d34;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
  }
</style>