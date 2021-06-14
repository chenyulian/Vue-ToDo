<template>
    <div class="projectPage">
        <h2>{{project.name}}</h2>
        <ul>
           <li v-for="(item, key) in tasks" :key="key">
                <div class="title">{{item[0]}}</div>
                <div class="task_list">
                    <ul>
                        <li v-for="task in item[1]" :key="task.id">
                            <TaskListItem :task = "task" />
                            <hr />
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <task-editor />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Project from "@/lib/Project";
    import Task from "@/lib/Task";
    import TaskListItem from "@/components/TaskListItem.vue";

    @Component({
        components: {TaskListItem}
    })
    export default class ProjectPage extends Vue{
        
        
        get projectId():string{
            return this.$route.params.id;
        }

        get project():Project {
            return this.$store.state.projectList.find((item:Project)=>{
                return item.id === this.projectId;
            });
        }

        get tasks():Map<string,Task[]> {
            const taskList = this.$store.state.taskList as Task[];
            const tasks = taskList.filter((t:Task)=>{
                return t.project === this.project.name && t.status === 1;
            });
            
            let map:Map<string,Task[]> = new Map();
            
            tasks.forEach((task)=>{
                const blockKey = task.block === null ? "":task.block;
                const list = map.get(blockKey)===undefined?[]:map.get(blockKey) as Task[];
                map.set(blockKey,map.get(blockKey)===undefined?[task]:[...list, task]);
            })

            return map;
        }

        beforeCreate():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchTaskList");
        }

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.projectPage {
    padding-left: 24px;
    padding-right: 24px;
    max-width: 746px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
}

.task_list > ul > li hr {
    border:0;
    background-color: $color-border-3;;
    height:1px;
}

</style>