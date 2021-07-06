<template>
    <div class="task_list_item">
        <task-editor :project_id="task.project_id" :block_id="task.block_id" :task_id="task.id" v-if="isEditing"
            @cancel = "isEditing = false" @finish="isEditing = false" />
        <div class="task_info" v-else>
            <div class="check_box_circle" @click="finishTask(task.id)">
                <Icon name="tick" class="tick" />
            </div>
            <div class="task">
                <div class="task_container">
                    <div class="task_content">{{task.content}}</div>
                    <div class="task_operation">
                        <i class="el-icon-more" v-popover:operation-popover></i>
                        <el-popover
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
                        </el-popover>
                    </div>
                </div>
                <div class="task_meta">
                    <div class="task_due_date">
                        <i class="el-icon-date"></i>
                        {{taskDueDate}}
                    </div>
                    <div class="task_project">
                        <div class="colored_sign" :style="color && `background-color:${color};`"></div>
                        <span>{{taskProjectName}}</span>
                    </div>
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
    export default class TaskListItem extends Vue{
        
        @Prop({required: true})
        task!: Task;

        isEditing = false;

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
        }

        finishTask(id:string):void {
            this.$store.commit("finishTask",id);
        }

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.task_list_item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.task_info {
    display: flex;
    padding: 8px;
}

.task {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
     padding-left: 8px;
    & .task_container {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        height: 18px;
        & .task_content {
            font-size: 14px;
            color: #4a4754;
        }

        & .task_operation {
            display: none;
        }
    }

    & >.task_meta {
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
        & .task_project {
            font-size: 10px;
            color: $color-font-secondary;
            display: flex;
            align-items: center;
            & .colored_sign {
                width: 8px;
                height: 8px;
                border-radius: 6px;
                margin-right: 4px;
            }
        }

        & .task_due_date {
            font-size: 12px;
            color: $color-font-secondary;
        }
    }

    &:hover {
        & .task_operation {
            display: block;
            color: $color-font-secondary;
        }
    }
    
    & > hr {
        border:0;
        background-color:#e8e8ea;
        height:1px;
    }
}

.check_box_circle {
    width: 18px;
    height: 18px;
    border: 1px solid #409EFF;
    background-color: white;
    border-radius: 9px;
    position: relative;
    // margin: 4px;
    &:hover {
        background-color: #409EFF;
        .tick {
            display: block;
        }
    }
}

.tick {
    position: absolute;
    width: 12px;
    height: 12px;
    left: calc(50% - 12px/2 - 0.5px);
    top: calc(50% - 12px/2);
    display: none;
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