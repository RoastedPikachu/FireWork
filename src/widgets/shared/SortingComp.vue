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
      <label>Отфильтровать по рейтингу</label>
    </span>
    <div id="Skills">
      <h5>Навыки:</h5>
      <button @click="setPython()" :class="{pyActive: isPython}">Python</button>
      <button @click="setJS()" :class="{jsActive: isJS}">JavaScript</button>
    </div>
    <button @click="sort()">Фильтр</button>
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
      const topChoosenRating = ref(10);
      const isPython = ref(true);
      const isJS = ref(true);

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
        isPython,
        isJS,
        setNeededRating
      }
    },
    methods: {
      sort() {
        if(this.isRatingCheck) {
          let sortingParams = {
            isPython: this.isPython,
            isJS: this.isJS,
            lowRating: this.lowChoosenRating,
            topRating: this.topChoosenRating
          }

          this.$emit('sort', sortingParams);
        } else {
          let sortingParams = {
            isPython: this.isPython,
            isJS: this.isJS,
          }

          this.$emit('sort', sortingParams);
        }
      },
      setPython() {
        this.isPython = !this.isPython;
      },
      setJS() {
        this.isJS = !this.isJS;
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
    #Skills {
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
      button {
        width: 70px;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
      .jsActive {
        color: #ff7d34;
      }
      .pyActive {
        color: #ff7d34;
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
      color: rgba(7, 9, 40, 0.75);
      font-size: 16px;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      cursor: pointer;
    }
  }
</style>