<template>
  <header>
    <h1>FireWork</h1>
    <nav>
      <router-link to="/">
        Заказчику
      </router-link>
      <router-link to="/">
        Исполнителю
      </router-link>
      <button>
        Вход
      </button>
      <button>
        Регистрация
      </button>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HeaderComp'
  })
</script>

<style lang="scss" scoped>

</style>