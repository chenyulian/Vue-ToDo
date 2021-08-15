<template>
    <div class="projects">
        <header>
            <h2>项目</h2>
            <el-button type="primary" round @click="openAddProjectDialog(undefined)">添加项目</el-button>
        </header>
                
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
            <el-carousel trigger="click" :autoplay="false" arrow="never"  @change="change" height="150px">
                <el-carousel-item :key="'-1'" style="background: #9b9cbc;">
                    <!-- <div class="progress">
                        <el-progress type="circle" :percentage="0" :width="64"></el-progress>
                    </div> -->
                    <div class="info">
                        <h3 class="small" :style="{color: getDark('#888aaf')}">收集箱</h3>
                        <div class="task-number" :style="{color: getDark('#888aaf')}"><span>{{taskList.length || 0}}</span>个任务</div>
                        <!-- <el-progress :percentage="finishRate" :color="getDark('#888aaf')"></el-progress> -->
                    </div>
                    <!-- <div class="more">-</div> -->
                </el-carousel-item>

                <el-carousel-item v-for="item in projectList" :key="item.id" :style="{backgroundColor:getLight(item.color)}">
                    <!-- <div class="progress">
                        <el-progress type="circle" :percentage="70" :width="64" :color="getDark(item.color)"></el-progress>
                    </div> -->
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
                <!-- <transition name="fade"> -->
                    <task-item :taskId="task.id" :showProjectName="false" v-if="showFinished?true:(task.status !== 2)"/>
                <!-- </transition> -->
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
import TaskDialog from "@/components/dialogs/TaskDialog.vue";
import TaskItem from "@/components/TaskItem.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";
import { openDialog } from "@/lib/openDialog";
import Utils from "@/lib/Utils";

    @Component({
            components: {TaskDialog,TaskItem,AddTaskButton}
        }
    )
    export default class Projects extends Vue {

        // projectList:Project[] = [];
        projectId = "-1";
        taskNumber = {};
        isAdding = false;
        showFinished = false;

        getLight = Utils.getLight;
        getDark = Utils.getDark;

        created():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchTaskList");
            // this.projectList = this.$store.state.projectList as Project[];
            // const taskList = this.$store.state.taskList as Task[];
            // for(let project of this.projectList) {
            //     let taskNumber = taskList.filter(i => i.project_id === project.id && i.status === 1).length;
            //     Object.defineProperty(this.taskNumber, project.id, {value: taskNumber});
            // }
            // Object.defineProperty(this.taskNumber, 
            //                     "-1", 
            //                     {value: taskList.filter(i => i.project_id === "-1" && i.status === 1).length} || 0);

        }

        get finishRate():number {
            let finished = this.taskList.filter(i => i.status === 2).length;
            let all = this.taskList.filter(i => i.status !== 0).length

            return all === 0 ? 0 : Number((finished / all * 100).toFixed());
        }

        get taskList():Task[] {
            const taskList = this.$store.state.taskList as Task[];
            return taskList.filter(i => i.project_id === this.projectId);
        }

        get projectList():Project[] {
            return this.$store.state.projectList as Project[];
        }

        // get progress(projectId:string):number {
            
        // }

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
    // margin-top: 24px;
    
    overflow: hidden;
    @media (max-width: 500px) {
        padding-top: 48px;
    }

    & > header {
        display: flex;
        justify-content: space-between;
    }
}
.filters {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    & > li {
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
    // align-items: center;
    align-items: start;
    padding-bottom: 12px;

    // & > div:not(&:last-child) {
    //     transform: translateY(24px);
    // }
    // & > div {
    //     // transform: translateY(-24px);
    // }

    & > .info {
        flex-grow: 1;
        padding-left: 16px;
    }
}
.task-list {
    overflow: auto;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>