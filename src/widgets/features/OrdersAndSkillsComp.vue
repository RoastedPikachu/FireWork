<template>
  <div id="OrdersAndSkills">
    <div class="orderOrSkill">
      <h3>Выполненные заказы</h3>
      <span v-if="isLoaded">
        <img src="@/assets/calendar_icon.svg" alt="Заказы">
        <p class="desc">{{ orderDescription }}</p>
      </span>
      <span v-if="!isLoaded">
        <img src="@/assets/calendar_icon.svg" alt="Заказы">
        <p class="loadedOrder desc"></p>
      </span>
      <button>Посмотреть больше</button>
    </div>

    <div class="orderOrSkill">
      <h3>{{ heading }}</h3>
      <img class="editImg" src="@/assets/edit_icon.svg" alt="Редактировать" @click="edit()" v-if="isProfile">
      <span v-if="isLoaded && !isProfile">
        <p v-for="targetSkill of targetSkills" :key="targetSkill.id">{{ targetSkill.title }}</p>
      </span>
      <span v-if="isLoaded && isProfile">
        <input type="text" v-for="targetSkill of targetSkills" :key="targetSkill.id" v-model="targetSkill.title" :disabled="!isEdit">
      </span>
      <span v-if="!isLoaded">
        <p v-for="loadedSkill of loadedSkills" :key="loadedSkill.id" class="loadedSkill"></p>
      </span>
      <button>Посмотреть больше</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';

  interface Skill {
    id: number,
    title: string
  }

  export default defineComponent({
    name: 'OrdersAndSkillsComp',
    data() {
      return {

      }
    },
    setup() {
      const orderDescription = ref('Создать UI/UX дизайн сайта');
      const loadedSkills = ref([
        {
          id: 0,
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ])
      const isEdit = ref(false);
      const targetSkills = ref([] as Skill[]);

      const edit = () => {
        isEdit.value = !isEdit.value;
      }

      return {
        orderDescription,
        loadedSkills,
        isEdit,
        targetSkills,
        edit
      }
    },
    mounted() {
      if(this.isEdit) {
        setInterval(() => {
          if(this.skills) {
            this.targetSkills = this.skills as [];
          }
        }, 500);
      } else {
        setInterval(() => {
          if(this.skills) {
            this.targetSkills = this.skills as [];
          }
        }, 15000);
      }
    },
    props: {
      heading: String,
      isProfile: Boolean,
      skills: Array,
      isLoaded: Boolean
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
      width: 90%;
      height: 45%;
      h3 {
        width: 80%;
        color: #070928;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        text-align: left;
      }
      .editImg {
        margin-left: 10px;
        cursor: pointer;
      }
      span { 
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        min-height: 35px;
        height: auto;
        p {
          color: rgba(7, 9, 40, 0.75);
          font-size: 14px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
        }
        .desc {
          margin-left: 10px;
        }
        input {
          margin-left: 10px;
          width: 45px;
          background-color: transparent;
          border: none;
          color: rgba(7, 9, 40, 0.75);
          font-size: 14px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          text-align: center;
          outline: none;
        }
        input:first-child {
          margin-left: 0;
        }
        input:nth-child(5) {
          margin-left: 0;
        }
        input:nth-child(9) {
          margin-left: 0;
        }
        .loadedSkill {
          margin-left: 10px;
          width: 40px;
          height: 12.5px;
          background-color: #e0e0e0;
          border-radius: 2.5px;
        }
        .loadedSkill:first-child {
          margin-left: 0;
        }
        .loadedSkill:nth-child(5) {
          margin-left: 0;
        }
        .loadedSkill:nth-child(9) {
          margin-left: 0;
        }
        .loadedOrder {
          width: 85%;
          height: 13.5px;
          background-color: #e0e0e0;
          border-radius: 2.5px;
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