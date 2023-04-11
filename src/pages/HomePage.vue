<template>
  <HeaderComp/>
  <section>
    <aside>
      <ProfileComp :isProfile="false"/>
      <OrdersAndSkillsComp :isProfile="false"/>
    </aside>
    <aside>

    </aside>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';
  import ProfileComp from '@/widgets/features/ProfileComp.vue';
  import OrdersAndSkillsComp from '@/widgets/features/OrdersAndSkillsComp.vue';

  export default defineComponent({
    name: 'HomePage',
    components: {
      HeaderComp,
      ProfileComp,
      OrdersAndSkillsComp
    }
  })

</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
    padding: 0 7.5%;
    width: 85%;
    aside {
      width: 21.5%;
    }
  }
</style>