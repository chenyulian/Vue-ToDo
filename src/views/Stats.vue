<template>
    <div class="stats">
        <div class="data" v-if="hasData">
            <Chart :option="option" />
            <div class="infos">
                <ul class="yesterday-info">
                    <li>
                        <div><span>{{taskNumYesterday}}</span>项</div>
                        <div class="desc">
                            昨日完成待办
                        </div> 
                    </li>
                    <li>
                       <div><span>{{taskRateYesterday}}</span>%</div>
                        <div class="desc">
                            昨日完成率
                        </div> 
                    </li>
                </ul>
                <div class="week-info">
                    <el-progress type="circle" :percentage="taskRateThisWeek" :width="90" color="#808CCF"></el-progress>
                    <div style="margin-left: 16px;">
                        <div style="font-size: 20px;">
                            <span>{{finishedTaskNumThisWeek}}</span>/<span>{{taskThisWeek.length}}</span>
                            <span class="desc" style="margin-left: 4px;">项待办</span>
                        </div>
                        <span class="desc">本周完成情况</span>
                    </div> 

                </div>
            </div>
        </div>
        <div class="empty" v-else>
            <Icon name="empty" class="icon-empty" />
            <div class="text">暂时没有已完成待办</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Chart from "@/components/Chart.vue"
import Task from "@/lib/Task";
import dayjs from "dayjs";
import Project from "@/lib/Project";

    type Series = {
        value: number,
        name: string,
        itemStyle: {color: string}
    }
    @Component(
        {components: {Chart}
    })
    export default class Stats extends Vue{
        
        beforeCreate():void {
            this.$store.commit("fetchTaskList");
            this.$store.commit("fetchProjectList")
        }

        get hasData():boolean {
            const task_list = this.$store.state.taskList as Task[];
            if(task_list === undefined || task_list.length === 0) return false;
            return task_list.filter(i => i.status === 2).length > 0;
        }

        // 昨日完成待办
        get taskNumYesterday():number {
            const task_list = this.$store.state.taskList as Task[];            
            if(task_list && task_list.length > 0) {
                return task_list.filter((i)=>{                    
                    return i.finishTime && dayjs(i.finishTime).isSame(dayjs(new Date()).add(-1, 'day'), 'day') && i.status !== 0;
                }).length;
            } else {
                return 0;
            }
        }

        // 昨日完成率
        get taskRateYesterday():string {
            const task_list = this.$store.state.taskList as Task[];
            let taskNum = task_list.filter((i)=>{
                    if(i.due_date === null) return false;
                    return dayjs(new Date(i.due_date)).isSame(dayjs(new Date()).add(-1,'day'), 'day') && i.status !== 0;
                }).length;
            let finishNum = task_list.filter((i)=>{
                    if(i.due_date === null) return false;
                    return i.finishTime 
                            && dayjs(i.finishTime).isSame(dayjs(new Date()).add(-1, 'day'), 'day') 
                            && dayjs(new Date(i.due_date)).isSame(dayjs(new Date()).add(-1, 'day'), 'day')
                            && i.status === 2;
            }).length;
            if (taskNum === 0) return '0';
            return ((finishNum / taskNum) * 100).toFixed(0);
        }

        get taskThisWeek():Task[] {
            const task_list = this.$store.state.taskList as Task[];
            const currentDay = new Date();
            const thisWeekStart = dayjs(currentDay).add(-(currentDay.getDay() - 1), 'day');
            const thisWeekEnd = thisWeekStart.add(7, 'day');
            
            if(task_list && task_list.length > 0) {                
                 return task_list.filter((i)=>{
                    if (i.status === 0) return false;
                    if (i.due_date === null) return false;
                    if (dayjs(new Date(i.due_date)).isAfter(thisWeekStart.add(-1, 'day'), 'day') && dayjs(i.due_date).isBefore(thisWeekEnd))
                        return true;
                });
            } else {
                return [];
            }
            
        }

        get finishedTaskNumThisWeek():number {
            
            return this.taskThisWeek.filter((i)=>{
                return i.status === 2;
            }).length;
        }

        get taskRateThisWeek():number {
            if (this.taskThisWeek.length === 0) {
                return 0;
            } else {
                return Number((this.finishedTaskNumThisWeek / this.taskThisWeek.length * 100).toFixed(0));
            }
        }

        get allFinishedTask():Task[] {
            const task_list = this.$store.state.taskList as Task[];
            return task_list.filter(i => i.status === 2);
        }

        get projectNameList():string[] {
            const projectList = this.$store.state.projectList as Project[];
            const taskList = this.$store.state.taskList as Task[];
            const taskNum = taskList.filter(i => i.status === 2 && i.project_id === '-1').length;            
            let result = [];
            if(taskNum > 0) {
                result.push('收集箱');
            }
            for(let p of projectList) {
                let num = taskList.filter(item => item.project_id === p.id && item.status === 2).length;
                if(num !== 0) {
                    result.push(p.name);
                } 
            }   
            
            return result;
        }

        

        get projectDataList():Series[] {
            const projectList = this.$store.state.projectList as Project[];
            const taskList = this.$store.state.taskList as Task[];

            const taskNum = taskList.filter(i => i.status === 2 && i.project_id === '-1').length;
            let result = [];
            if(taskNum > 0) {
                result.push({value: taskNum, name: '收集箱', itemStyle: {color: '#808CCF'}});
            }

            for(let p of projectList) {
                let num = taskList.filter(item => item.project_id === p.id && item.status === 2).length;
                if(num !== 0) {
                    result.push({ value: num, name: p.name, itemStyle: {color: p.color}});
                } 
            }

            return result;
        }

        option = {
            baseOption: {
                title : {
                text: '项目情况概览',
                subtext: '各项目已完成待办占总完成待办比',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: this.projectNameList
            },
            toolbox: {
                show : true,
                feature : {

                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                }
            },
            calculable : true,
            series : [
                {
                    name:'完成待办占比',
                    type:'pie',
                    roseType : 'area',
                    data: this.projectDataList,
                }
            ],
            },
            media: [
                {
                    option: {
                        legend: {
                            right: 'center',
                            bottom: 0,
                            orient: 'horizontal'
                        },
                        series: [
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    },   
                },
                {
                    query: {
                        minAspectRatio: 1
                    },
                    option: {
                        legend: {
                            right: 'center',
                            bottom: 0,
                            orient: 'horizontal'
                        },
                        series: [
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        maxAspectRatio: 1
                    },
                    option: {
                        legend: {
                            right: 'center',
                            bottom: 0,
                            orient: 'horizontal'
                        },
                        series: [
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        maxWidth: 500
                    },
                    option: {
                        legend: {
                            right: 10,
                            top: '15%',
                            orient: 'vertical'
                        },
                        series: [
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    }
                }
            ]
        }

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
$item-margin: 16px;
$item-radius: 12px;
.stats {
    & > .empty {
        text-align: center;
        & > .icon-empty {
            width: 700px;
            height: 400px;
            padding-top: 24px;
        }
        @media (max-width:500px) {
             & > .icon-empty {
                width: 320px;
                height: 200px;
             }
        }
        & > .text {
            color: $color-font-secondary;
        }

    }

    & > .data {
        width: 100%;
        height: 100%;
    }

    .infos {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 24px;

        @media(max-width: 500px) {
            flex-direction: column;
            padding-top: 0;
            // align-items: start;
        }

    }

    .yesterday-info {
        display: flex;
        margin-right: $item-margin;
        & > li {
            border: 1px solid $color-border-1;
            border-radius: $item-radius;
            width: 150px;
            height: 150px;
            margin-left: 20px;
            &:hover {
                background:rgb(242, 246, 250);
            }
            & span {
                font-size: 50px;
                line-height: 50px;
                font-weight: 800;
                color: $color-font-normal;
            }
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

        }

        @media(max-width: 500px) {
            & > li {
                width:100px;
                height: 100px;

                & span {
                    font-size: 40px;
                    line-height: 40px;
                }
            }
        }
    }

    .week-info {
        display: flex;
        height: 150px;
        border: 1px solid $color-border-1;
        display: flex;
        align-items: center;
        border-radius: $item-radius;
        padding: 0 16px;
       
        @media (max-width: 500px) {
            height: 120px;
            width: 220px;
            margin-top: 16px;
        }

        &:hover {
            background:rgb(242, 246, 250);
        }
    }

    .desc {
        font-size: 12px;
        color: $color-font-secondary;
        padding-top: 8px;
    }
}
</style>