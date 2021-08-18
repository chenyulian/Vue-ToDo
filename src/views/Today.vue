<template>
    <div class="today">
        <div style="display:flex; justify-content: space-between">
             <h2 class="title">{{todayString}}</h2>
            <el-button size="small" type="text" @click="showFinished = !showFinished">
                <span v-if="showFinished">隐藏</span>
                <span v-else>显示</span>已完成
            </el-button>
        </div>
       
        <div class="task_list">
            <ul>
                <li v-for="task in overdue_list" :key="task.id">
                    <TaskItem :taskId = "task.id" @edit="editTask(task.id)" />
                </li>
                <li v-for="task in task_list" :key="task.id">
                    <TaskItem :taskId = "task.id" @edit="editTask(task.id)" v-if="showFinished?true:(task.status !== 2)" />
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

        showFinished = false;

        get task_list():Task[] {
            const task_list = (this.$store.state.taskList || []) as Task[];
            return task_list.filter((task)=>{
                if(task.due_date !== null) {
                    if(dayjs(task.due_date).isSame(dayjs(new Date()),"day") && task.status !== 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            });
        }

        get overdue_list():Task[] {
            const task_list = (this.$store.state.taskList || []) as Task[];
            return task_list.filter((task)=>{
                if(task.due_date !== null) {
                    if(dayjs(task.due_date).isBefore(dayjs(new Date()),"day") && task.status === 1) {
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
        }

        editTask(taskId:string):void {
            this.editingTaskId = taskId;
            this.isEditing = true;
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';

.today {
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
}
// .task_list > ul > li hr {
//     border:0;
//     background-color: $color-border-3;;
//     height:1px;
// }

.task_list > ul  {
    margin-bottom: 12px;
    &>li {
        &:not(:last-child) {
            margin-bottom: 4px;
        }
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