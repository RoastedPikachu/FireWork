<template>
  <span>
    <h3>{{ title }}</h3>
    <img src="@/assets/edit_icon.svg" alt="Редактировать" v-if="isProfile"> 
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TopDataProfileComp',
    props: {
      isProfile: Boolean,
      title: String
    }
  })
</script>

<style lang="scss" scoped>
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
      margin-top: -5px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>