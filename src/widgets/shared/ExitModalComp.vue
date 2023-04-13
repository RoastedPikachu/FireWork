<template>
  <div id="Exit">
    <h2>Вы уверены, что хотите выйти из аккаунта?</h2>
    <span>
      <button @click="closeExit()">Отмена</button>
      <button @click="exit()">Выйти</button>
    </span>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import store from '@/store/index';

  export default defineComponent({
    name: 'ExitModalComp',
    setup() {
    
      return {
    
      }
    },
    methods: {
      closeExit() {
        this.$emit('closeExit');
      },
      exit() {
        store.dispatch('changeSignInStatus');
        location.reload();
      }
    }
  })
</script>

<style lang="scss" scoped>
  #Exit {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    top: 0;
    width: 280px;
    height: 200px;
    background-color: #ffffff;
    border: 1px solid #43455d;
    border-radius: 30px;
    h2 {
      margin-top: 20px;
      width: 80%;
      color: #070928;
      font-size: 22px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      text-align: center;
    }
    span {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      button {
        width: 100px;
        height: 35px;
        background-color: #F8F8FA;
        border: 1px solid #43455d;
        border-radius: 25px;
        color: #ff7d34;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        outline: none;
        cursor: pointer;
      }
    }
  }
</style>