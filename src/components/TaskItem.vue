<template>
    <div class="task_item" :class="{isEditing: isEditing}" @dblclick="isEditing = task.status===2?false:true">
        <task-editor :project_id="task.project_id" :task_id="task.id" v-if="isEditing"
            @cancel = "isEditing = false" @finish="isEditing = false" />
        <div class="task-container" v-else>
            <div class="task" :class="{'finished': task.status === 2}">
                <div class="check-box" @click="finishTask(task.id)">
                    <Icon name="tick" class="tick" />
                </div>
                <div class="task-content" :class="{'overdue-text':isOverdue}">{{task.content}}</div>
                <div class="task-operation">
                    <i v-if="task.status === 1" class="el-icon-edit-outline icon-edit" @click="isEditing = true"></i>
                    <i v-else class="el-icon-delete icon-delete" v-popover:popover></i>
                     <el-popover
                        placement="top"
                        width="160"
                        ref="popover"
                        v-model="popoverVisible"
                        >
                        <p style="">确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteTask(taskId)">确定</el-button>
                        </div>
                    </el-popover>
                </div>
            </div>
             
            <div class="task-info">
                <div class="task-due-date" :class="{'overdue-text':isOverdue}">
                    <i class="el-icon-date"></i>
                    {{taskDueDate}}
                </div>
                <div class="task-project" v-if="showProjectName" style="display:flex; align-items: center">
                    <el-tag type="danger" size="small" v-if="isOverdue" class="overdue-tag">已过期</el-tag>
                    <div class="colored-sign" v-if="task.project_id !== '-1'" :style="color && `background-color:${color};`"></div>
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
    import TaskEditor from "@/components/TaskEditor.vue";
    import Utils from "@/lib/Utils";

    @Component({
        components: {TaskEditor}
    })
    export default class TaskItem extends Vue{

        @Prop({type:String, required: true})
        taskId!: string;

        @Prop({type:Boolean, default:true})
        showProjectName!: boolean;

        isEditing = false;

        popoverVisible = false;

        get task():Task {
            return (this.$store.state.taskList as Task[]).find(i => i.id === this.taskId) || new Task();
        }

        beforeCreate():void {
            this.$store.commit("fetchTaskList");
            this.$store.commit("fetchProjectList");
        }

        get isOverdue():boolean {            
            if (this.task.due_date !== null) {
                if(dayjs(this.task.due_date).isBefore(dayjs(new Date()), 'day') && this.task.status === 1) {
                    return true;
                }
            }

            return false;
        }
        get taskProjectName():string {
            if(this.task.project_id === "-1") {
                return "收集箱";
            }
            const projectList = this.$store.state.projectList as Project[];
            const project = projectList.find(i => i.id === this.task.project_id);
            if(project !== undefined) {
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
            return Utils.formatDate(new Date(this.task.due_date || new Date()));
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
            if(this.task.status === 2) {
                return;
            }
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

        & .icon-delete:hover {
            cursor: pointer;
            color: $color-theme;
        }

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
                // width: 100%;
                & .icon-edit {
                     display: none !important;        
                }             
                
                & .icon-delete {
                   margin-left: 12px;
                }
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
                // display: none;
                &:hover {
                    cursor: pointer;
                }

                & .icon-edit {
                    &:hover {
                        color: $color-theme;
                    }
                }
            }

            &.finished {
                & .check-box {
                    background-color: $color-font-occupation;
                    border-color: $color-font-occupation;
                    & > .tick {
                        display: block;
                    }
                    &:hover {
                        cursor: default;
                    }
                }

                & .task-content {
                    color: $color-font-occupation;
                    font-style: italic;
                    text-decoration: line-through;
                }

                & .task-operation {
                    & .icon-edit {
                        display: none;
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

.colored-sign {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    margin-right: 4px;
}

.overdue-tag {
    display: block;
    margin-right: 4px;
    @media (max-width: 500px) {
        display: none;
    }
}

.overdue-text {
    color: #F56C6C;
}
</style>