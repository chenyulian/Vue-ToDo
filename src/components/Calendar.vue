<template>
    <div class="calendar">
        <ul class="week-area">
            <li class="week-item" v-for="(item, index) in weekArray" :key="index">
                <span class="calendar-item week-font">{{item}}</span>
            </li>
        </ul>
        <ul class="data-area">
            <li class="data-item" v-for="(item, index) in dataArray" :key="index">
                <span class="calendar-item data-font">{{item}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Calender extends Vue{
        weekArray = ['日','一','二','三','四','五','六'];
        dataArray = Array(40).fill(0, 0, 40); 

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.calendar {
    overflow-x: hidden;
}

// header {
//   padding: 0 5px;
//   font-size: 18px;
//   font-weight: 500;
//   color: #2b4450;
//   line-height: 44px;
//   margin: 0 calc((14.285% - 40px) / 2 + 6px);
// }

.week-area {
    display: flex;
    width: 100%;
}

.week-item, .data-item {
    // 1 / 7 = 14.285%
    flex: 0 0 14.285%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.calendar-item {
  display: block;
  width: 40px;
  height: 40px;
//   border: 1px solid red;
  text-align: center;
  line-height: 40px;

  &.selected {
      background: $color-theme;
      color:#fff;
      border-radius: 50%;
  }
}

.week-item {
    height: 45px;
}
.week-font {
  font-size: 15px;
  color: #2b4450;
  font-weight: 500;
}

.data-area {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
}
.data-font {
  color: #2b4450;
  font-size: 18px;
  font-weight: 400;
}
</style>