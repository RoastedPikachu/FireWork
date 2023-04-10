<template>
  <HeaderComp/>
  <section>
    <aside>
      <ProfileComp/>
    </aside>
    <aside>

    </aside>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderComp from '@/widgets/shared/HeaderComp.vue';
  import ProfileComp from '@/widgets/features/ProfileComp.vue';

  export default defineComponent({
    name: 'HomePage',
    components: {
      HeaderComp,
      ProfileComp
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
    width: 90%;
    aside {
      width: 22.5%;
    }
  }
</style>