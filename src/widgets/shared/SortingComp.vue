<template>
  <div id="Sorting">
    <h2>Рейтинг</h2>
    <div id="RatingChoise">
      <div @click="setNeededRating($event)" :class="{ active: isChoosen1 }">
        <p class="one">1-4</p>
      </div>
      <div @click="setNeededRating($event)" :class="{ active: isChoosen2 }">
        <p class="two">4-7</p>
      </div>
      <div @click="setNeededRating($event)" :class="{ active: isChoosen3 }">
        <p class="three">7-9</p>
      </div>
      <div @click="setNeededRating($event)" :class="{ active: isChoosen4 }">
        <p class="four">9-10</p>
      </div>
    </div>
    <span id="SortingCheckbox">
      <input type="checkbox" id="Rating" v-model="isRatingCheck">
      <label>Сортировать по рейтингу</label>
    </span>
    <div id="Price">
      <h5>Цена:</h5>
      <span>
        <p>от</p>
        <input type="text" v-model="lowPrice" maxlength="6">
        <p>$</p>
      </span>
      <span>
        <p>до</p>
        <input type="text" v-model="topPrice" maxlength="6">
        <p>$</p>
      </span>
    </div>
    <button>Сортировка</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';

  export default defineComponent({
    name: 'SortingComp',
    data() {
      return {

      }
    },
    setup() {
      const isRatingCheck = ref(false);
      const isChoosen1 = ref(false);
      const isChoosen2 = ref(false);
      const isChoosen3 = ref(false);
      const isChoosen4 = ref(false);
      const lowChoosenRating = ref(0);
      const topChoosenRating = ref(0);
      const lowPrice = ref('');
      const topPrice = ref('');

      const setNeededRating = (event:any) => {
        let target = event.target;

        if(target.tagName === 'P') {
          target = target.parentElement;
        }

        if(target.children[0].classList.contains('one')) {
          isChoosen1.value = !isChoosen1.value;
          lowChoosenRating.value = 1;
          topChoosenRating.value = 4;
        } else if(target.children[0].classList.contains('two')) {
          isChoosen2.value = !isChoosen2.value;
          lowChoosenRating.value = 4;
          topChoosenRating.value = 7;
        } else if(target.children[0].classList.contains('three')) {
          isChoosen3.value = !isChoosen3.value;
          lowChoosenRating.value = 7;
          topChoosenRating.value = 9;
        } else {
          isChoosen4.value = !isChoosen4.value;
          lowChoosenRating.value = 9;
          topChoosenRating.value = 10;
        }
      }

      return {
        isRatingCheck,
        isChoosen1,
        isChoosen2,
        isChoosen3,
        isChoosen4,
        lowChoosenRating,
        topChoosenRating,
        lowPrice,
        topPrice,
        setNeededRating
      }
    }
  })
</script>

<style lang="scss" scoped>
  #Sorting {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 320px;
    background-color: #ffffff;
    border: 1px solid #43455D;
    border-radius: 30px;
    h2 {
      width: 100%;
      color: rgba(7, 9, 40, 0.75);
      font-size: 16px;
      font-weight: 400;
      font-family: 'Roboto', sans-serif;
      text-align: center;
    }
    #RatingChoise {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      height: 40px;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 100%;
        background-color: #F8F8FA;
        border: 1px solid #43455D;
        border-radius: 25px;
        transition: 400ms ease;
        cursor: pointer;
        p {
          color: rgba(7, 9, 40, 0.75);
          font-size: 16px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          transition: 400ms ease;
        }
      }
      .active {
        background-color: #ff7d34;
      }
    }
    #SortingCheckbox {
      input {
        outline: none;
        cursor: pointer;
      }
      label {
        margin-left: 10px;
        color: rgba(7, 9, 40, 0.75);
        font-size: 16px;
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
      }
    }
    #Price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      h5 {
        color: rgba(7, 9, 40, 0.75);
        font-size: 16px;
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
      }
      span {
        display: flex;
        justify-content: space-between;
        width: 30%;
        p {
          color: rgba(7, 9, 40, 0.75);
          font-size: 16px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
        }
        input {
          width: 50%;
          border-width: 0 0 1px 0;
          outline: none;
        }
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      height: 50px;
      background-color: #F8F8FA;
      border: 1px solid #43455D;
      border-radius: 25px;
      color: #ff7d34;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      cursor: pointer;
    }
  }
</style>