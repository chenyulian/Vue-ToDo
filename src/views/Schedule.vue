<template>
    <div class="schedule">
        <div class="calender">
            <el-calendar v-model="currentDate">
                <div
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p :class="data.isSelected ? 'is-selected' : ''" @click="calendarOnClick(date,data)">
                    {{ data.day.split('-').slice(1).join('-') }} 
                    </p>
                    <div v-if="data.type === 'current-month'" class="hasTask" style="text-align:center;">
                        <i class="el-icon-more" 
                            :style="`visibility:${hasTasks(data.day)?'visible':'hidden'};`" 
                            :class="data.isSelected ? 'is-selected' : ''"></i>
                    </div>
                </div>
            </el-calendar>
            <div class="tasks">
                <el-timeline>
                    <el-timeline-item
                    v-for="(task, index) in taskListThisDay"
                    :key="index"
                    :timestamp="task.dueDate"
                    :hide-timestamp="true"
                    :type="task.status === 2 ? 'success':'primary'"
                    :color="task.status === 2?'':getProjectById(task.project_id).color"
                    :icon="task.status === 2 ? 'el-icon-check':''">
                    {{task.content}} - {{getProjectById(task.project_id).name}}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Task from "@/lib/Task";
    import Vue from "vue";
    import Component from "vue-class-component";
    import dayjs from "dayjs";
    import { Watch } from "vue-property-decorator";
    import Project from "@/lib/Project";
    
    @Component
    export default class Schedule extends Vue{

        currentDate = new Date();

        taskListThisMonth:Task[] = [];

        taskListThisDay:Task[] = [];
        
        @Watch("currentDate")
        currentDateChange():void {
            const taskList = this.$store.state.taskList as Task[];
            this.taskListThisMonth = taskList.filter((task)=>{
                if(task.due_date) return dayjs(task.due_date).isSame(this.currentDate,"month") && task.status > 0;
                return false;
            });
            this.taskListThisDay = taskList.filter((task)=>{
                if(task.due_date) return dayjs(task.due_date).isSame(dayjs(this.currentDate),"day") && task.status > 0;
                return false;
            });

        }

        created():void {
            this.$store.commit("fetchTaskList");
            const taskList = this.$store.state.taskList as Task[];
            this.taskListThisMonth = taskList.filter((task)=>{
                if(task.due_date) return dayjs(task.due_date).isSame(dayjs(),"month");
                return false;
            });
            this.taskListThisDay = taskList.filter((task)=>{
                if(task.due_date) return dayjs(task.due_date).isSame(dayjs(),"day");
                return false;
            });

        }

        calendarOnClick(date:Date):void {
            this.currentDate = date;
        }

        hasTasks(date:string):boolean {
           
            const result = this.taskListThisMonth.filter((task)=>{
                if(task.due_date) return dayjs(task.due_date).isSame(date,'day');
                return false;
            });
            if(result && result.length > 0) {
                return true;
            }
            return false;
        }

        getProjectById(id:string):Project{
            const projectList = this.$store.state.projectList as Project[];
            const project = projectList.find(i => i.id === id);
            const result = new Project();
            result.id = "-1";
            result.color = "";
            result.name = "收集箱"  
            if(project) return project;
            return result;
        }
    }

    
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.schedule {
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    &>div{
        padding: 64px;
    }
}

.calender {
    flex-grow: 1;
    display: flex;
    & .tasks {
        min-width: 180px;
    }
}

.tasks_overview {
   
    max-width: 320px;
}

::v-deep .el-calendar__title {
    font-weight: 500;
    font-size: 28px;
}
::v-deep .el-calendar-day {
    padding: 4px; 
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.el-calendar {
    width: 60%;
}

 .is-selected {
     color:$color-theme;
     font-weight: 700;
  }
</style>