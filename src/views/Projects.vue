<template>
    <div class="projects">
        <h2>项目</h2>
        <!-- <ul class="filters">
            <li class="selected">全部</li>
            <li>进行中</li>
            <li>已完成</li>
        </ul> -->
        <!-- <ul class="project-list">
            <li>
                <div class="project_left">
                    <div class="name"><strong>收集箱</strong></div>
                    <div class="info">还剩<span>{{taskNumber["-1"]}}</span>个任务</div>
                </div>
                <div class="progress">占位222</div>
                <div><Icon name="more" class="more" /></div>
            </li> -->
            <!-- <li v-for="project in projectList" :key="project.id" :style="{backgroundColor: project.color}">
                <div class="project_left">
                    <div class="name"><strong>{{project.name}}</strong></div>
                    <div class="info">还剩<span>{{taskNumber[project.id]}}</span>个任务</div>
                </div>
                <div class="progress">占位222</div>
                <div @click="$router.push(`/projects/${project.id}`)"><Icon name="more" class="more" /></div>
            </li> -->
        <!-- </ul> -->
        <!-- <div class="button-container">
            <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </div> -->
        
        <div class="block">
            <el-carousel trigger="click" :autoplay="false" indicator-position="none" arrow="always"  @change="change" height="150px">
                <el-carousel-item :key="'-1'" style="background-color: #808CCF;">
                    <h3 class="small">收集箱</h3>
                    <div class="info"><span>2</span>个任务</div>
                </el-carousel-item>

                <el-carousel-item v-for="item in projectList" :key="item.id"   :style="{backgroundColor:item.color}">
                    <h3 class="small">{{ item.name }}</h3>
                    <div class="info"><span>2</span>个任务</div>
                    <div class="progress">
                        
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <h2>任务</h2>
        <ul class="task-list">
            <!-- <li v-for="task in taskList" :key="task.id">
                <div class="check-box" @click="finishTask(task.id)">
                    <Icon name="tick" class="tick" />
                </div>
                <div class="task-content">{{task.content}}</div>
                <div class="operations">
                    <Icon name="edit" class="operate" @click="editTask(task.id)" />
                    <Icon name="del" class="operate" @click="deleteTask(task.id)" />
                </div>
            </li> -->
            <li v-for="task in taskList" :key="task.id">
                <task-item :taskId="task.id" :showProjectName="false"/>
            </li>
        </ul>

        <!-- <task-dialog /> -->
    </div>
</template>

<script lang="ts">
import Project from "@/lib/Project";
import Task from "@/lib/Task";
import Vue from "vue";
import Component from "vue-class-component";
import TaskDialog from "@/components/dialogs/TaskDialog.vue";
import TaskItem from "@/components/TaskItem.vue";
    @Component({
            components: {TaskDialog,TaskItem}
        }
    )
    export default class Projects extends Vue {

        projectList:Project[] = [];
        // taskList: Task[] = []; 
        projectId = "-1";
        taskNumber = {}

        created():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchTaskList");
            this.projectList = this.$store.state.projectList as Project[];
            const taskList = this.$store.state.taskList as Task[];
            for(let project of this.projectList) {
                let taskNumber = taskList.filter(i => i.project_id === project.id && i.status === 1).length;
                Object.defineProperty(this.taskNumber, project.id, {value: taskNumber});
            }
            Object.defineProperty(this.taskNumber, 
                                "-1", 
                                {value: taskList.filter(i => i.project_id === "-1" && i.status === 1).length} || 0);

            // console.log(this.taskList)
        }

        get taskList():Task[] {
            const taskList = this.$store.state.taskList as Task[];
            return taskList.filter(i => i.project_id === this.projectId && i.status === 1);
        }

        change(index: number):void {
            console.log(index);
            if(index === 0) {
                this.projectId = "-1";
            } else {
                this.projectId = this.projectList[index - 1].id;
            }
        }

        editTask(id:string):void {
            console.log(id)
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
    }
</script>

<style lang="scss" scoped>
.projects {
    display: flex;
    flex-direction: column;
}
.filters {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    // padding: 0 36px;
    margin-top: 16px;
    & > li {
        // border: 1px solid red;
        // padding: 0 18px;
        // height: 100%; 
        // line-height: 48px;
        height: 48px;
        width: 86px;
        text-align: center;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        &.selected {
            background: #e4e8f4;
            color: #37429B;
            font-weight: 600;
        }
    }
}

 .project-list {
        
        margin-top: 16px;
        flex-grow: 1;
        overflow: auto;
        & > li {
            background:  white;
            border-radius: 16px;
            color: #37429B;
            border: 1px solid #eee;
            height: 96px;
            margin-bottom: 24px;
            padding: 4px 16px;
            display: flex;

            & > div:first-child {
                flex-grow: 1;
            }

            & .more {
                width: 1.5em;
                height: 1.5em;
            }

            & .project_left {
                .name {
                    font-size: 20px;
                    max-width: 50vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .info {
                    font-size: 12px;
                    margin-top: 10px;
                }
            }

            align-items: center;
        }

        @media (max-width: 500px) {
            // display: flex;
            // overflow: auto;
            & > li {
                background: #37429B;
                color: white;
                height: 150px;
                & .progress {
                    padding: 4px;
                    margin-right: 4px;
                }
            }
        }
}
.button-container {
    position: absolute;
    right: 24px;
    bottom: 72px;
    & > button {
        background: #686A9A;
    }
}

.el-carousel__item h3 {
    color: white;
    // font-size: 18px;
    // opacity: 0.75;
    // line-height: 150px;
    font-weight: 600;
    letter-spacing: 0.1em;
    margin: 0;
}

.el-carousel__item {
    // border: 1px solid red;
    border-radius: 16px;
    padding: 10px;
}
.task-list {
    overflow: auto;
    margin-bottom: 12px;
    & > li {
        // border: 1px solid #E3E6F4;
        padding: 4px 0;
        // border-radius: 6px;
        // display: flex;
        // align-items: center;
        // &:not(&:first-child) {
        //     margin-top: 6px;
        // }
        // &:hover {
        //     background: #F6F8FC;
        // }   

        // & .task-content {
        //     flex-grow: 1;
        //     white-space: nowrap;
        //     overflow: hidden;
        //     text-overflow: ellipsis;
        //     padding-left: 8px;
        //     padding-right: 8px;
        // }

        // & .operations {
        //     flex-shrink: 0;
        //     & > .operate {
        //         margin-right: 8px;
        //         &:hover {
        //             cursor: pointer;
        //         }
        //     }
        // }
    }
}

.check-box {
    width: 18px;
    height: 18px;
    border: 1px solid #808CCF;
    background-color: white;
    border-radius: 9px;
    position: relative;
    flex-shrink: 0;
    // margin: 4px;
    &:hover {
        background-color: #808CCF;
        cursor: pointer;
        .tick {
            display: block;
        }
    }
}

.tick {
    display: none;
}
</style>