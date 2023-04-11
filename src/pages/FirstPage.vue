<template>
  <HeaderComp/>
  <section>

  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';

  export default defineComponent({
    name: 'ChatPage',
    components: {
      HeaderComp
    }
  })
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 5% 0 7.5%;
    width: 87.5%;
    height: 1400px;
  }
</style>