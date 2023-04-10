<template>
  <div id="SignIn_error">{{ errorMessage }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ErrorComp',
    data() {
      return {

      }
    },
    props: {
      errorMessage: String
    }
  })
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #dcdcdc;
    border: 1px solid #43455d;
    border-radius: 10px;
    color: #df2c14;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
  }
</style>