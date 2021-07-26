<template>
    <div class="today">
        <h2 class="title">{{todayString}}</h2>
        <div class="task_list">
            <ul>
                <li v-for="task in task_list" :key="task.id">
                    <TaskItem :taskId = "task.id" v-if="!isEditing" @edit="editTask(task.id)" />
                    <!-- <hr /> -->
                </li>
            </ul>
        </div>
        <div class="add_task">
            <task-editor class="editor"
             v-if="isAdding" @cancel="isAdding = false" @finish="isAdding = false"  />
            <add-task-button v-else @click="isAdding = true"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TaskItem from "@/components/TaskItem.vue";
    import AddTaskButton from "@/components/AddTaskButton.vue";
    import dayjs from 'dayjs';
    import Task from '@/lib/Task';

    @Component({
        components: {TaskItem,AddTaskButton}
    })
    export default class Today extends Vue{
        todayString = dayjs(new Date()).format("YYYY年MM月DD日");

        isEditing = false;
        editingTaskId = "-1";
        isAdding = false;

        get task_list():Task[] {
            const task_list = (this.$store.state.taskList || []) as Task[];
            return task_list.filter((task)=>{
                if(task.due_date !== null) {
                    if(dayjs(task.due_date).isSame(dayjs(new Date()),"day") && task.status === 1) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            });
        }

        created():void {
            this.$store.commit("fetchTaskList");
            this.$store.commit("fetchBlockList");
        }

        editTask(taskId:string):void {
            this.editingTaskId = taskId;
            this.isEditing = true;
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';

// .task_list > ul > li hr {
//     border:0;
//     background-color: $color-border-3;;
//     height:1px;
// }

.task_list > ul  {
    margin-bottom: 12px;
    &>li {
        padding: 4px 0;
    }
}

.add_task {
    margin-top: 8px;
}

.editor {
    border: 1px solid $color-border-1;
    border-radius: 4px;
}
</style>