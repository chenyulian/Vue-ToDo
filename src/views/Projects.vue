<template>
    <div class="projects">
        <h2>项目</h2>
        <!-- <ul class="filters">
            <li class="selected">全部</li>
            <li>进行中</li>
            <li>已完成</li>
        </ul> -->
        <ul class="project-list">
            <li>
                <div class="project_left">
                    <div class="name"><strong>收集箱</strong></div>
                    <div class="info">还剩<span>{{taskNumber["-1"]}}</span>个任务</div>
                </div>
                <div class="progress">占位222</div>
                <div><Icon name="more" class="more" /></div>
            </li>
            <li v-for="project in projectList" :key="project.id" :style="{backgroundColor: project.color}">
                <div class="project_left">
                    <div class="name"><strong>{{project.name}}</strong></div>
                    <div class="info">还剩<span>{{taskNumber[project.id]}}</span>个任务</div>
                </div>
                <div class="progress">占位222</div>
                <div @click="$router.push(`/projects/${project.id}`)"><Icon name="more" class="more" /></div>
            </li>
        </ul>
        <div class="button-container">
            <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </div>
    </div>
    
</template>

<script lang="ts">
import Project from "@/lib/Project";
import Task from "@/lib/Task";
import Vue from "vue";
import Component from "vue-class-component";

    @Component
    export default class Projects extends Vue {

        projectList:Project[] = [];
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
            background:  #686A9A;
            border-radius: 16px;
            color: white;
            height: 96px;
            margin-bottom: 24px;
            padding: 4px 16px;
            display: flex;

            // & > div {
            //     border: 1px solid red;
            // }
            & > div:first-child {
                flex-grow: 1;
            }

            & .progress {
                padding: 4px;
                margin-right: 4px;
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
    }
    .button-container {
        position: absolute;
        right: 24px;
        bottom: 72px;
        & > button {
            background: #686A9A;
        }
    }
</style>