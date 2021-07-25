<template>
    <div v-if="visible">
        <div class="dialog-overlay" @click="$emit('update:visible', false)">
        </div>
        <div class="dialog-wrapper">
            <div class="operations">
                <div class="delete"></div>
                <div class="save-button"></div>
            </div>
           <input type="text" :value="task.task_content" placeholder="请输入任务内容">
           <el-button plain size="mini" v-popover:date-popover icon="el-icon-date">{{dateString}}</el-button>
           <el-popover
                placement="bottom"
                trigger="click"
                ref="date-popover"
                v-model="dateVisible">
                <el-date-picker
                    v-model="dueDate"
                    type="date"
                    @change="dateVisible = !dateVisible"
                    placeholder="选择日期">
                </el-date-picker>
            </el-popover>

            <el-tooltip class="item" effect="dark" content="选择一个项目" placement="right">
                <el-button plain size="mini" v-popover:section-popover>
                    <!-- <div v-if="projectColor !== ''" 
                        style="width: 8px; height: 8px; border-radius: 6px; display:inline-block; margin-right: 8px;" 
                        :style="`backgroundColor:${projectColor}`">
                    </div> -->
                    <i class="el-icon-receiving"></i>
                    <span>{{task.project_id}}</span>
                </el-button>
            </el-tooltip>

            <el-popover
                    placement="bottom"
                    trigger="click"
                    ref="section-popover"
                    v-model="moreVisible"
                    >
                    <ul class="projectList">
                        <li class="collectBox" @click="selectProject('-1')"><i class="el-icon-receiving"></i><span style="margin-left:4px;">收集箱</span></li>
                        <li v-for="project in projectList" :key="project.id" @click="selectProject(project.id)">
                            <div class="project_container">
                                <div :style="{backgroundColor:project.color}"></div>
                                <span>{{project.name}}</span>
                            </div>
                        </li>
                    </ul>
                </el-popover>
                <div class="tags"></div>
                <el-button @click="saveTask(task.id)">保存任务</el-button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Utils from "@/lib/Utils";
    import { Prop } from "vue-property-decorator";
    import Task from "@/lib/Task";
    import Project from "@/lib/Project";

    @Component
    export default class TaskDialog extends Vue {
        visible = true;
        dateVisible = false;

        @Prop({type: String})
        taskId?: string;

        task = new Task();

        dueDate = new Date();

        moreVisible = false;

        get projectList():Project[] {
            console.log(this.$store.state.projectList)
            return this.$store.state.projectList;
        }

        selectProject(id: string):void {
            console.log(id)
        }

       
        created():void {
         if(this.taskId !== undefined) {
             const taskList = this.$store.state.taskList as Task[];
             this.task = taskList.find(task => task.id === this.taskId) || new Task();
         }   
        }

        get dateString():string {
            return Utils.formatDate(this.dueDate);
        }

        saveTask(id:string): void {
            if(id === "") {
                console.log("新建任务")
            } else {
                console.log(id);
            }
            
        }
    }
</script>

<style lang="scss" scoped>
.dialog {
    &-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: fade_out(#585772, 0.5);
        z-index: 10;
    }

    &-wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60%;
        background: white;
        border-radius: 30px 30px 0 0;
        z-index: 11;

        padding: 12px 24px;
    }
}
</style>