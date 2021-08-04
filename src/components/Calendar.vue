<template>
    <div class="calendar">
        <section class="header">
            {{ selectedData.year }}年{{ selectedData.month }}月{{ selectedData.day }}日
        </section>
        <ul class="week-area">
            <li class="week-item" v-for="(item, index) in weekArray" :key="index">
                <span class="calendar-item week-font">{{item}}</span>
            </li>
        </ul>
        <section ref="calendar"
            :style="{transform: `translateX(-${(transitionIndex - move.x) * 100}%)`, 
                          transitionDuration:`${duration}s`}"
                          @touchstart="touchStart"
                          @touchmove.stop.prevent="touchMove"
                          @touchend="touchEnd" >
            <div class="banner-area">
                <ul class="data-area" 
                v-for="(carouselItem, carouselIndex) in carouselData" :key="carouselIndex">
                    <li class="data-item" v-for="(item, index) in carouselItem" :key="index">
                        <span class="calendar-item data-font" :class="{'selected': item.isSelected, 'other-item': item.type !== 'normal'}"
                            @click="checkoutDate(item)">{{item.day}}</span>
                    </li>
                </ul>
            </div>
        </section>
        
        <button @click="checkoutDate(getPrevMonth(selectedData))">prev</button> 
        <button @click="checkoutDate(getNextMonth(selectedData))">next</button>
        {{transitionIndex}}
        {{needAnimation}}

        <!-- {{selectedData.year}} - {{selectedData.month}} - {{selectedData.day}}
        {{getPrevMonth(selectedData)}} -->
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Watch } from "vue-property-decorator";

    type CalendarItem = {
        year: number,
        month: number,
        day: number,
        type?: string,
        isSelected?:boolean
    }

    @Component
    export default class Calender extends Vue{
        weekArray = ['日','一','二','三','四','五','六'];
        dataArray:CalendarItem[] = [];
        selectedData!:CalendarItem;
        carouselData:CalendarItem[][] = [];
        translateDuration = 0.3;
        transitionIndex = 1;
        needAnimation = true; //左右滑动时是否需要动画
        isTouching = false;
        move = {
            x: 0,
            y: 0
        }

        getCurrentDay():void {
            let now = new Date();
            this.selectedData = {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                day: now.getDate(),
                isSelected: true,
                type: 'normal'
            }
        }

        get duration():number {
            if(this. needAnimation) return this.translateDuration;
            return 0;
        }

        created():void {
         this.getCurrentDay();
        //  console.log(this.selectedData)  
         this.dataArray = this.getMonthData(this.selectedData);
        }

        getMonthData(data: CalendarItem): CalendarItem[] {
            // console.log('getMonthData')
            const {month, year, day} = data;
            // console.log(month, year, day);
            let dataArray:CalendarItem[] = [];
            // 每月的天数
            let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
            // 闰年处理
            if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ) {
                daysInMonth[1] = 29;
            }
            const monthStartWeekday = new Date(year, month - 1, 1).getDay();
            const monthEndWeekday = new Date(year, month, 1).getDay() || 7;
            const prevInfo = this.getPrevMonth(data);
            const nextInfo = this.getNextMonth(data);

            // 数据填充
            for(let i = 0; i < monthStartWeekday; i ++) {
                let preObj = {
                    type: 'pre',
                    day: daysInMonth[prevInfo.month - 1] - (monthStartWeekday - i - 1),
                    month: prevInfo.month,
                    year: prevInfo.year,
                    isSelected: false
                }

                dataArray.push(preObj);
            }

            for(let i = 0; i < daysInMonth[month - 1]; i ++) {
                let itemObj = {
                    type: 'normal',
                    day: i + 1,
                    month: month,
                    year: year,
                    isSelected: Number(day) === i + 1
                }
                dataArray.push(itemObj);
            }

            for(let i = 0; i < 7 - monthEndWeekday; i ++) {
                let nextObj = {
                    type: 'next',
                    day: i + 1,
                    month: nextInfo.month,
                    year: nextInfo.year,
                    isSelected: false
                }

                dataArray.push(nextObj);
            }

           return dataArray;
        }

        checkoutDate(selectData:CalendarItem):void {
            // console.log('checkoutDate')
            // console.log(selectData.month, selectData.day)
            // if (selectData.type !== 'normal') return; // 非有效日期不可点选

            if(selectData.type === 'pre') {
                // console.log(selectData);
                // this.selectedData = selectData;
                this.selectedData = this.getPrevMonth(this.selectedData, selectData.day);
                this.needAnimation = true;
                this.transitionIndex -= 1;
                this.dealMonthData();
                
            }

            if(selectData.type === 'next') {
                // console.log(selectData);
                this.selectedData = this.getNextMonth(this.selectedData, selectData.day);
                this.needAnimation = true;
                this.transitionIndex += 1;
                this.dealMonthData();
                
            }
            this.selectedData.day = selectData.day; // 对选中日期赋值
            const oldSelectIndex = this.dataArray.findIndex(item => item.isSelected && item.type === 'normal')
            const newSelectIndex = this.dataArray.findIndex(item => item.day === selectData.day && item.type === 'normal')

            if (this.dataArray[oldSelectIndex]) this.$set(this.dataArray[oldSelectIndex], 'isSelected', false)
            if (this.dataArray[newSelectIndex]) this.$set(this.dataArray[newSelectIndex], 'isSelected', true)
        }

        getPrevMonth(item: CalendarItem, appointDay=1):CalendarItem {
            let {year, month} = item;
            // console.log(year, month)
            if(month === 1) {
                year -= 1;
                month = 12;
            } else {
                month -= 1
            }

            // this.selectedData = {year, month, day:appointDay, type:'normal', isSelected:true};
            // this.getMonthData(this.selectedData);
            return {year, month, day:appointDay,type:'pre'};
        }

        getNextMonth(item: CalendarItem, appointDay=1):CalendarItem {
            let {year, month} = item;
            // console.log(year, month)
            if(month === 12) {
                year += 1;
                month = 1;
            } else {
                month += 1
            }
            return {year, month, day:appointDay,type:"next"};
        }

        dealMonthData():void { 
            this.dataArray = this.getMonthData(this.selectedData);
        }

        @Watch("dataArray",{deep: true})
        changeCarouselData():void {
            const prev = this.getMonthData(this.getPrevMonth(this.selectedData));
            const next = this.getMonthData(this.getNextMonth(this.selectedData));
            setTimeout(()=>{
                // 重置Index
                this.needAnimation = false;
                this.transitionIndex = 1;
                this.carouselData = [prev, this.dataArray, next];
            }, this.translateDuration * 1000);
           
        }

        touchStartPositionX = 0;
        // touch事件
        touchStart(event:TouchEvent):void {
            console.log('touch start');
            this.isTouching = true;
            this.touchStartPositionX = event.touches[0].clientX;
            // console.log(event.touches[0].clientX, event.touches[0].clientY);
        }

        touchMove(event:TouchEvent):void {
            console.log('touch move');
            // console.log(event.touches[0].clientX)
            const moveX = event.touches[0].clientX;
            
            this.move.x = (moveX - this.touchStartPositionX) / (this.$refs.calendar as Element).clientWidth;
            // console.log(this.move.x);
            // console.log(event)
        }

        touchEnd():void {
            this.isTouching = false;
            if (Math.abs(this.move.x) > 0.3) {
                if (this.move.x < 0) {
                    this.selectedData = this.getNextMonth(this.selectedData);
                    this.needAnimation = true;
                    this.transitionIndex += 1;
                    this.dealMonthData();
                } else {
                    this.selectedData = this.getPrevMonth(this.selectedData);
                    this.needAnimation = true;
                    this.transitionIndex -= 1;
                    this.dealMonthData();
                }
            }
            this.move.x = 0;
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.calendar {
    overflow-x: hidden;
}

.header {
  padding: 0 5px;
  font-size: 18px;
  font-weight: 500;
  color: #2b4450;
  line-height: 44px;
  margin: 0 calc((14.285% - 40px) / 2 + 6px);
}

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
  text-align: center;
  line-height: 40px;

  &:hover {
      cursor: pointer;
  }
  &.selected {
      background: $color-theme;
      color:#fff;
      border-radius: 50%;
  }
  &.other-item {
      color: #ccc;
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
    // border: 1px solid red;
}
.data-font {
  color: #2b4450;
  font-size: 18px;
  font-weight: 400;
}

.banner-area {
    width: 300%;
    display: flex;
}
</style>