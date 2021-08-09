<template>
    <div class="calendar">
        <section class="header">
            {{ selectedData.year }}年{{ selectedData.month }}月{{ selectedData.day }}日
        </section>
        <ul class="week-area" style="z-index:10">
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
            <div class="banner-area" 
                style="overflow-y:hidden"
                :style="{height: `${(dataArray.length / 7) * itemHeight}px`, transitionDuration:`${heightDuration}s`}"
                >
                <ul class="data-area" 
                  :style="{ 
                          transform: `translateY(${offsetY}px)`,
                          
                          transitionDuration:`${heightDuration}s`,
                          transitionProperty: `all`,}
                          "
                v-for="(carouselItem, carouselIndex) in carouselData" :key="carouselIndex">
                    <li class="data-item" v-for="(item, index) in carouselItem" :key="index">
                        <span class="calendar-item data-font" :class="{'selected': item.isSelected, 'other-item': item.type !== 'normal' && !isWeekView}"
                            @click="checkoutDate(item)">{{item.day}}</span>
                    </li>
                </ul>
            </div>
        </section>
        
        <button @click="checkoutDate(getPrevMonth(selectedData))">prev</button> 
        <button @click="checkoutDate(getNextMonth(selectedData))">next</button>
        {{transitionIndex}}
        {{needAnimation}}
        <!-- <button @click="isWeekView = !isWeekView">toggleWeekView</button> -->
        <!-- {{selectedData.year}} - {{selectedData.month}} - {{selectedData.day}}
        {{getPrevMonth(selectedData)}} -->
        {{currentWeekOfYear}}
        {{isWeekView}}
        {{selectedData}}
        datalength:{{dataArray.length}}
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Watch } from "vue-property-decorator";
    import dayjs, { Dayjs } from "dayjs";

    var weekOfYear = require('dayjs/plugin/weekOfYear');
    // dayjs.extend(weekOfYear);
    dayjs.extend(weekOfYear);

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
        needHeightAnimation = false; 
        isTouching = false;
        currentWeekOfYear = 0;
        move = {
            x: 0,
            y: 0
        }
        isWeekView = false;
        prevWeekData:CalendarItem[] = [];
        nextWeekData:CalendarItem[] = [];
        itemHeight = 40;
        offsetY = 0; // y轴偏移量

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
            if(this.needAnimation) return this.translateDuration;
            return 0;
        }

        get heightDuration():number {
            if(this.needHeightAnimation) return this.translateDuration;
            return 0;
        }

        created():void {
         this.getCurrentDay();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.currentWeekOfYear = dayjs(new Date()).week();
        this.dataArray = this.getMonthData(this.selectedData);
        }

        getMonthData(data: CalendarItem): CalendarItem[] {
            const {month, year, day} = data;
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
            // if (selectData.type !== 'normal') return; // 非有效日期不可点选

            if(this.isWeekView) {
                console.log('is week view');
                this.selectedData = selectData;
                 const oldSelectIndex = this.dataArray.findIndex(item => item.isSelected);
                const newSelectIndex = this.dataArray.findIndex(item => item.day === selectData.day);

                if (this.dataArray[oldSelectIndex]) this.$set(this.dataArray[oldSelectIndex], 'isSelected', false)
                if (this.dataArray[newSelectIndex]) this.$set(this.dataArray[newSelectIndex], 'isSelected', true)

            } else {
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

                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                this.currentWeekOfYear = dayjs(new Date(this.selectedData.year, this.selectedData.month - 1, this.selectedData.day)).week();
            }
            
            

           
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

        // 获取本周数据
        dealWeekData():void {
            const currentDay = new Date(this.selectedData.year, this.selectedData.month - 1, this.selectedData.day);
            // 本周的开始（周日）
            const thisWeekStart = dayjs(currentDay).add(-currentDay.getDay(), 'day');
            this.dataArray = this.getWeekDataArray(thisWeekStart);
        }

        @Watch("dataArray",{deep: true})
        changeCarouselData():void {
            let prev:CalendarItem[] = [];
            let next:CalendarItem[] = [];
            if(!this.isWeekView) {
                prev = this.getMonthData(this.getPrevMonth(this.selectedData));
                next = this.getMonthData(this.getNextMonth(this.selectedData));
            } else {
                prev = this.prevWeekData;
                next = this.nextWeekData;
            }
           
            setTimeout(()=>{
                // 重置Index
                this.needAnimation = false;
                this.transitionIndex = 1;
                this.carouselData = [prev, this.dataArray, next];
            }, this.translateDuration * 1000);
           
        }

        @Watch("isWeekView")
        changeView():void {
            if(this.isWeekView) {
                const currentDay = new Date(this.selectedData.year, this.selectedData.month - 1, this.selectedData.day);
                const thisWeekStart = dayjs(currentDay).add(-currentDay.getDay(), 'day');
                this.dealWeekData();
                
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const x = dayjs(thisWeekStart).week(this.currentWeekOfYear - 1);
                this.prevWeekData = this.getWeekDataArray(x);
                
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const y = dayjs(thisWeekStart).week(this.currentWeekOfYear + 1);
                this.nextWeekData = this.getWeekDataArray(y);
            } else {
                this.dealMonthData();
            }
              
        }

        getWeekDataArray(day: Dayjs) : CalendarItem[] {
            let result:CalendarItem[] = [];
             for(let i = 0; i < 7; i ++) {
                let temp = dayjs(day).add(i, 'day');                
                result[i] = {
                    year: temp.get('year'),
                    month: temp.get('month') + 1,
                    day: temp.get('date'),
                    isSelected: temp.get('date') === this.selectedData.day
                }
            }
            return result;
        }

        touchStartPositionX = 0;
        touchStartPositionY = 0;
        // touch事件
        touchStart(event:TouchEvent):void {
            this.isTouching = true;
            this.touchStartPositionX = event.touches[0].clientX;
            this.touchStartPositionY = event.touches[0].clientY;
        }

        touchMove(event:TouchEvent):void {
            const moveX = event.touches[0].clientX;
            const moveY = event.touches[0].clientY;
            this.move.x = (moveX - this.touchStartPositionX) / (this.$refs.calendar as Element).clientWidth;
            this.move.y = (moveY - this.touchStartPositionY) / (this.$refs.calendar as Element).clientHeight;
           
        }

        touchEnd():void {
            this.isTouching = false;
            const currentDay = new Date(this.selectedData.year, this.selectedData.month - 1, this.selectedData.day);
            const thisWeekStart = dayjs(currentDay).add(-currentDay.getDay(), 'day');
       
            if(Math.abs(this.move.x) >= Math.abs(this.move.y)) {
                 if (Math.abs(this.move.x) > 0.3) {
                if (this.move.x < 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    let next = dayjs(thisWeekStart).week(this.currentWeekOfYear + 1);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    this.currentWeekOfYear += 1;
                    
                    console.log('current week')
                    console.log(this.currentWeekOfYear);
                    
                    console.log('next');
                    console.log(next);
                    
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    this.selectedData = this.isWeekView? {year: next.get('year'), month: next.get('month') + 1, day: next.get('date'), isSelected: true} : this.getNextMonth(this.selectedData);
                    // this.selectedData = this.getNextMonth(this.selectedData);
                    this.needAnimation = true;
                    this.transitionIndex += 1;
                    if(this.isWeekView) {
                        this.dealWeekData();
                    } else {
                        this.dealMonthData();
                    }
                    
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    let pre = dayjs(thisWeekStart).week(this.currentWeekOfYear - 1);
                    this.currentWeekOfYear -= 1;
                    this.selectedData = this.isWeekView? {year: pre.get('year'), month: pre.get('month') + 1, day: pre.get('date'), isSelected: true} : this.getPrevMonth(this.selectedData);
                    this.needAnimation = true;
                    this.transitionIndex -= 1;
                    if(this.isWeekView) {
                        this.dealWeekData();
                    } else {
                        this.dealMonthData();
                    }
                }
            }
            } else {
                if(Math.abs(this.move.y) > 0.3) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                   const monthStartWeek = dayjs(new Date(this.selectedData.year, this.selectedData.month - 1, 1)).week();
                   console.log(monthStartWeek);
                   const offsetAbs = (this.currentWeekOfYear - monthStartWeek) * this.itemHeight;
                   
                    if(this.move.y > 0) {
                            this.needHeightAnimation = true;
                            this.isWeekView = false;
                    } else {
                            this.needHeightAnimation = true;
                            this.isWeekView = true;
                            this.offsetY = -offsetAbs;
                            
                            setTimeout(() => {
                                this.needHeightAnimation = false;
                                this.offsetY = 0;
                            }, 300);
            
                    }
                }
            }
            
           
            this.move.x = 0;
            this.move.y = 0;
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