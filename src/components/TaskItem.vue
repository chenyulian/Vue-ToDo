<template>
    <div class="task_item" :class="{isEditing: isEditing}" @dblclick="isEditing = true">
        <task-editor :project_id="task.project_id" :block_id="task.block_id" :task_id="task.id" v-if="isEditing"
            @cancel = "isEditing = false" @finish="isEditing = false" />
        <div class="task-container" v-else>
            <div class="task">
                <div class="check-box" @click="finishTask(task.id)">
                    <Icon name="tick" class="tick" />
                </div>
                <div class="task-content">{{task.content}}</div>
                <div class="task-operation">
                    <i class="el-icon-edit-outline icon-edit" @click="isEditing = true"></i>
                    <!-- <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click"
                        ref="operation-popover">
                        <ul class="operation_list">
                                <li @click="isEditing = true">
                                <i class="el-icon-edit-outline"></i>
                                <div>修改任务</div> 
                            </li>
                            <li @click="deleteTask(task.id)">
                                <i class="el-icon-delete"></i>
                                <div>删除任务</div> 
                            </li>
                            
                        </ul>
                    </el-popover> -->
                </div>
            </div>
             
            <div class="task-info">
                <div class="task-due-date">
                    <i class="el-icon-date"></i>
                    {{taskDueDate}}
                </div>
                <div class="task-project" v-if="showProjectName">
                    <div class="colored-sign" :style="color && `background-color:${color};`"></div>
                    <span>{{taskProjectName}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Task from "@/lib/Task";
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import dayjs from "dayjs";
    import Project from "@/lib/Project";
    import Block from "@/lib/Block";
    import TaskEditor from "@/components/TaskEditor.vue";

    @Component({
        components: {TaskEditor}
    })
    export default class TaskItem extends Vue{
        
        // @Prop({required: true})
        // task!: Task;

        @Prop({type:String, required: true})
        taskId!: string;

        @Prop({type:Boolean, default:true})
        showProjectName!: boolean;

        isEditing = false;

        get task():Task {
            return (this.$store.state.taskList as Task[]).find(i => i.id === this.taskId) || new Task();
        }

        beforeCreate():void {
            this.$store.commit("fetchTaskList");
        }

        get taskProjectName():string {
            if(this.task.project_id === "-1") {
                return "收集箱";
            }
            const projectList = this.$store.state.projectList as Project[];
            const blockList = this.$store.state.blockList as Block[];
            const project = projectList.find(i => i.id === this.task.project_id);
            const block = blockList.find(i => i.id === this.task.block_id);
            if(project !== undefined && block !== undefined) {
                return project.name + " / " + block.name;
            } else if(project !== undefined) {
                return project.name;
            } else {
                return "收集箱";
            }
        }

        get color():string {
            if (this.task.project_id === '-1') return "";
            const projectList = this.$store.state.projectList as Project[];
            const project = projectList.find(i => i.id === this.task.project_id);
            if(project) {
                return project.color;
            }
            return "";
        }
        
        get taskDueDate():string {
            if(this.task.due_date === null) return "";

            if(dayjs(this.task.due_date).isSame(dayjs(new Date()),'day')){
                return "今天";
            }
            if(dayjs(this.task.due_date).isSame(dayjs(new Date()).add(1,'day'),'day')){
                return "明天";
            }
            if(dayjs(this.task.due_date).isSame(dayjs(new Date()).add(2,'day'),'day')){
                return "后天";
            }
            return dayjs(this.task.due_date).format("MM-DD");
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
@import "~@/assets/style/common.scss";

.task_item {
    
    border-bottom: 1px solid $color-border-1;

    @media (max-width: 500px) {
        border: 1px solid $color-border-1;
        border-radius: 4px;

        &:hover {
            background: #F6F8FC;
            cursor: pointer;
        }
    }

    &.isEditing {
        border: 1px solid $color-border-1;
        border-radius: 4px;
    }

    & .task-container {
        display: flex;
        flex-direction: column;
        padding: 4px;

        @media (max-width: 500px) {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            & > .task {
                 max-width: 60%;
            }

            & > .task-info {
                margin-top: 0 !important;
                margin-right: 4px;
                margin-left: 0;
                
                & > .task-project {
                    margin-left: 4px;
                }
            }

            & .task-operation {
                display: none !important;
            }

        }

        & > .task {
            display: flex;
            align-items: center;
        
            & .task-content {
                flex-grow: 1;
                margin-left: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            & .task-operation {
                color: $color-font-secondary;
                display: none;
                &:hover {
                    cursor: pointer;
                }

                & .icon-edit {
                    &:hover {
                        color: $color-theme;
                    }
                }
            }
        }

        & > .task-info {
            display: flex;
            justify-content: space-between ;
            align-items: center;
            flex-shrink: 0;
            margin-top: 8px;
            margin-left: 18px;
            font-size: 12px;
            color: $color-font-secondary;
        }

        &:hover {
            & .task-operation {
                display: block;
            }
        }
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
    & .tick {
        display: none;
    }
    &:hover {
        background-color: #808CCF;
        cursor: pointer;
        .tick {
            display: block;
        }
    }
}

.operation_list {
    & > li {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 16px;
        padding: 8px;
        & div {
            padding-left: 4px;
        }
        &:hover {
            background-color: $color-border-4;
            cursor: pointer;
        }
    }
}
</style>