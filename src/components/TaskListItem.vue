<template>
    <div class="task_list_item">
        <div class="check_box_circle">
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
                            <li>
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
                <div class="task_project">{{taskProject}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Task from "@/lib/Task";
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";

    @Component
    export default class TaskListItem extends Vue{
        
        @Prop({required: true})
        task!: Task;

        get taskProject():string {
            if(this.task.block !== null) {
                return this.task.project + "/" + this.task.block;
            }else {
                return this.task.project;
            }
        }
        
        get taskDueDate():string {
            console.log(this.task.dueDate);
            return this.task.dueDate === null?'':this.task.dueDate;
        }

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.task_list_item {
    display: flex;
    width: 100%;
    // height: 56px;
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
            // line-height: 20px;
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
        // text-align: center;
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