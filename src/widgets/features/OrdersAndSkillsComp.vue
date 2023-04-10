<template>
  <div id="OrdersAndSkills">
    <div class="orderOrSkill">
      <h3>Заказы</h3>
      <span>
        <img src="@/assets/calendar_icon.svg" alt="Заказы">
        <p>{{ orderDescription }}</p>
      </span>
      <button>Посмотреть больше</button>
    </div>

    <div class="orderOrSkill">
      <h3>Мои навыки</h3>
      <span>
        <p v-for="skill of skills" :key="skill.id">
          {{ skill.title }}
        </p>
      </span>
      <button>Посмотреть больше</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';

  export default defineComponent({
    name: 'OrdersAndSkillsComp',
    data() {
      return {

      }
    },
    setup() {
      const orderDescription = ref('Создать UI/UX дизайн сайта');
      const skills = ref([
        {
          id: 0,
          title: 'CSS'
        },
        {
          id: 1,
          title: 'UI design'
        },
        {
          id: 2,
          title: 'Python'
        },
        {
          id: 3,
          title: 'C++'
        },
        {
          id: 4,
          title: 'Unity'
        },
      ]);

      return {
        orderDescription,
        skills
      }
    }
  })
</script>

<style lang="scss" scoped>
  #OrdersAndSkills {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 5% 7.5%;
    width: 85%;
    height: 200px;
    background-color: #ffffff;
    border: 1px solid #43455D;
    border-radius: 30px;
    .orderOrSkill {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 85%;
      height: 45%;
      h3 {
        width: 100%;
        color: #070928;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        text-align: left;
      }
      span { 
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        p {
          color: rgba(7, 9, 40, 0.75);
          font-size: 14px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
        }
      }
      button {
        background-color: transparent;
        border: none;
        color: #ff7d34;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        cursor: pointer;
        outline: none;
      }
    }
  }
</style>