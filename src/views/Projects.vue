<template>
    <div class="projects">
        <header>
            <h2>项目</h2>
            <el-button type="primary" round @click="openAddProjectDialog(undefined)">添加项目</el-button>
        </header>
        
        <div class="block">
            <el-carousel trigger="click" :autoplay="false" arrow="never"  @change="change" height="150px">
                <el-carousel-item :key="'-1'" style="background: #9b9cbc;">
                    <div class="info">
                        <h3 class="small" :style="{color: getDark('#888aaf')}">收集箱</h3>
                        <div class="task-number" :style="{color: getDark('#888aaf')}"><span>{{taskList.length || 0}}</span>个任务</div>
                    </div>
                </el-carousel-item>

                <el-carousel-item v-for="item in projectList" :key="item.id" :style="{backgroundColor:getLight(item.color)}">
                    <div class="info">
                        <h3 class="small" :style="{color: getDark(item.color)}">{{ item.name }}</h3>
                        <div class="task-number" :style="{color: getDark(item.color)}"><span>{{taskList.length || 0}}</span>个任务</div>
                        <el-progress :percentage="finishRate" :color="getDark(item.color)"></el-progress>
                    </div>
                    <div class="more"><i class="el-icon-more icon-more" :style="{color: getDark(item.color)}" @click="openAddProjectDialog(item.id)"></i></div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
            <h2>任务</h2>
            <el-button size="small" type="text" @click="showFinished = !showFinished">
                <span v-if="showFinished">隐藏</span>
                <span v-else>显示</span>已完成
            </el-button>
        </div>
        
        <ul class="task-list">
            <li v-for="task in taskList" :key="task.id" >
                <task-item :taskId="task.id" :showProjectName="false" class="task-item" v-if="showFinished?true:(task.status !== 2)" />
            </li>
        </ul>
        <div class="add_task">
            <task-editor class="editor" :project_id="projectId"
             v-if="isAdding" @cancel="isAdding = false" @finish="isAdding = false"  />
            <add-task-button v-else @click="isAdding = true"/>
        </div>
    </div>
</template>

<script lang="ts">
import Project from "@/lib/Project";
import Task from "@/lib/Task";
import Vue from "vue";
import Component from "vue-class-component";
import TaskItem from "@/components/TaskItem.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";
import { openDialog } from "@/lib/openDialog";
import Utils from "@/lib/Utils";

    @Component({
            components: {TaskItem,AddTaskButton}
        }
    )
    export default class Projects extends Vue {

        projectId = "-1";
        taskNumber = {};
        isAdding = false;
        showFinished = false;

        getLight = Utils.getLight;
        getDark = Utils.getDark;

        created():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchTaskList");
        }

        get finishRate():number {
            let finished = this.taskList.filter(i => i.status === 2).length;
            let all = this.taskList.filter(i => i.status !== 0).length

            return all === 0 ? 0 : Number((finished / all * 100).toFixed());
        }

        get taskList():Task[] {
            const taskList = this.$store.state.taskList as Task[];
            return taskList.filter(i => i.project_id === this.projectId && i.status !== 0);
        }

        get projectList():Project[] {
            return (this.$store.state.projectList as Project[]).filter(i => i.status !== 0);
        }

        change(index: number):void {
            console.log(index);
            if(index === 0) {
                this.projectId = "-1";
            } else {
                this.projectId = this.projectList[index - 1].id;
            }
        }

        deleteTask(id:string):void {
            this.$store.commit("deleteTask",id);
            this.$message({
                 message: '删除成功',
                 type: 'info',
                 showClose: true,
            });
        }

        finishTask(id:string):void {
            this.$store.commit("finishTask",id);
            this.$message({
                 message: '任务已完成',
                 type: 'success',
                 showClose: true,
            });
        }

        openAddProjectDialog(id: string|undefined):void {
            openDialog({id});
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';

.projects {
    display: flex;
    flex-direction: column;
    padding-top: 100px;
    padding-left: 24px;
    padding-right: 24px;
    max-width: 746px;
    margin-left: auto;
    margin-right: auto;
    
    overflow: hidden;
    @media (max-width: 500px) {
        padding-top: 48px;
    }

    & > header {
        display: flex;
        justify-content: space-between;
    }
}

.el-carousel__item h3 {
    color: white;
    font-weight: 600;
    font-size: 32px;
    letter-spacing: 0.1em;
    margin: 0;
}

.el-carousel__item {
    border-radius: 16px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding-bottom: 12px;

    & > .info {
        flex-grow: 1;
        padding-left: 16px;
    }
}
.task-list {
    overflow: auto;
    & > li > .task-item {
        margin-bottom: 4px;
    }
}

.check-box {
    width: 18px;
    height: 18px;
    border: 1px solid $color-theme;
    background-color: white;
    border-radius: 9px;
    position: relative;
    flex-shrink: 0;
    &:hover {
        background-color: $color-theme;
        cursor: pointer;
        .tick {
            display: block;
        }
    }
}

.tick {
    display: none;
}

.add_task {
    margin-top: 8px;
}

.editor {
    border: 1px solid $color-border-1;
    border-radius: 4px;
}

.block {
    margin-top: 12px;
}

.el-carousel__item {
    padding: 16px;
}

div.task-number {
    font-size: 14px;
    margin-bottom: 16px;
}

.icon-more {
    transform: rotate(90deg);
    font-size: 24px;

    &:hover {
        cursor: pointer;
    }
}
</style>