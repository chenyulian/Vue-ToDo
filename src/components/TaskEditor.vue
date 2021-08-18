<template>
<div class="task_editor" :class="isEditing===true?'isEditing':''">
    <div class="task_edit_container" :class="isEditing===true?'isEditing':''">
        <div class="content-container">
            <input type="text" v-model = "task_content" width="100%" @keyup.enter="saveTask" placeholder="请输入任务内容，例如：慢跑半小时">
        </div>
        
        <div class="task_meta">
            <div class="task_meta_main">
                <el-button plain size="mini" v-popover:date-popover icon="el-icon-date">{{dueDateString}}</el-button>
                <el-tooltip class="item" effect="dark" content="选择一个项目" placement="right">
                    <el-button plain size="mini" v-popover:section-popover>
                        <div v-if="project.color !== ''" 
                            style="width: 8px; height: 8px; border-radius: 6px; display:inline-block; margin-right: 8px;" 
                            :style="`backgroundColor:${project.color}`">
                        </div>
                        <i v-else class="el-icon-receiving"></i>
                        <span>{{project.name}}</span>
                    </el-button>
                </el-tooltip>
                <el-popover
                    placement="bottom"
                    trigger="click"
                    ref="date-popover"
                    v-model="visible">
                    <el-date-picker
                        v-model="dueDate"
                        type="date"
                        @change="visible = !visible"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-popover>
                <el-popover
                    placement="bottom"
                    trigger="click"
                    ref="section-popover"
                    v-model="moreVisible"
                    >
                    <ul class="projectList">
                        <li class="collectBox" @click="selectProject('-1')"><i class="el-icon-receiving"></i><span style="margin-left:4px;">收集箱</span></li>
                        <li v-for="item in projectList" :key="item.id" @click="selectProject(item.id)">
                            <div class="project_container">
                                <div :style="{backgroundColor:item.color}"></div>
                                <span>{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                </el-popover>
            </div>
           
           <div class="task_meta_quick_settings">
               <ul>
                   <li v-if="task_id">
                       <el-tooltip class="item" effect="dark" content="删除任务" placement="bottom">
                        <i class="el-icon-delete icon_delete" @click="deleteTask(task_id)"></i>
                       </el-tooltip>
                    </li>
               </ul>
           </div>
        </div>
        
    </div>
    <div class="buttons_container" style="margin-top: 4px;">
        <el-button type="primary" size="medium" class="add_button" @click="saveTask" :disabled="addButtonAvaliable">
            <i class="el-icon-circle-plus"
            ></i>
            <span>{{task_id !== undefined?'保存':'添加任务'}}</span>
            
        </el-button>

        <el-button type="text" size="medium" class="cancel_button"
            @click="cancel">
            取消
        </el-button>
    </div>
</div>
</template>

<script lang="ts">
    import Task from '@/lib/Task';
    import createId from '@/lib/createId';
    import Project from "@/lib/Project";
    import { Prop,Component } from "vue-property-decorator";
    import { mixins } from "vue-class-component";
    import ProjectHelper from "@/mixins/ProjectHelper";
    import Utils from "@/lib/Utils";

    @Component
    export default class TaskEditor extends mixins(ProjectHelper){
        task_content = "";
        dueDate = new Date();
        visible = false;
        moreVisible = false;
        isEditing = false;        
        projectName = "";
        projectColor = "";
        project!:Project;

        created():void {
            this.$store.commit("fetchProjectList");
            this.project = this.getProjectById(this.project_id);
            const task = (this.$store.state.taskList as Task[]).find(i => i.id === this.task_id);
            if(task !== undefined) {
                this.task_content = task.content;
                if(task.due_date) {
                    this.dueDate = new Date(task.due_date);
                }
            }
        }

        @Prop({type: String})
        project_id?:string;

        @Prop({type:String})
        task_id?:string;
        
        get dueDateString():string {   
            return Utils.formatDate(this.dueDate);
        }

        get addButtonAvaliable():boolean {
            return this.task_content.length <= 0;
        }

        get projectList(): Project[]{
            return (this.$store.state.projectList as Project[]).filter(i => i.status === 1);
        }

        saveTask():void {
            if(this.task_content === "") return;
            if(this.task_id === undefined) {
                const task = new Task();
                task.content = this.task_content;
                task.id = createId("task").toString();        
                task.project_id = this.project.id;
                task.due_date = this.dueDate===null?null:this.dueDate.toString();
                task.status = 1;
                // task.tags.push(this.selectedTagName);
                this.$store.commit('addTask', task);
            } else {
                const task = (this.$store.state.taskList as Task[]).find(i => i.id === this.task_id);
                if(task) {
                    task.content = this.task_content;
                    task.project_id = this.project.id;
                    task.due_date = this.dueDate===null?null:this.dueDate.toString();
                    this.$store.commit('updateTask', task);
                }
            }
            
            // 完成后不显示任务编辑
            this.isEditing = false;
            this.task_content = "";
            this.dueDate = new Date();
            this.$emit("finish");
        }

        selectProject(id: string):void {
            this.project = this.getProjectById(id);
            this.moreVisible = false;
            
        }


        deleteTask(taskId:string):void {
            this.$store.commit("deleteTask",taskId);
            this.$message({
                 message: '删除成功',
                 type: 'info',
                 showClose: true,
            });
        }

       cancel():void {        
           // 清空数据
        this.task_content = "";
        this.dueDate = new Date();
        this.project = this.getProjectById(this.project_id);
        this.$emit("cancel");
       }

    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';

.task_editor {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    // margin-top: 8px;
    background: white;
}

.task_edit_container {
    display: flex;
    flex-direction: column;
    min-height: 48px;
    border-radius: 5px;
    padding: 0 18px;
    font-size: 14px;
}

.content-container {
    display: flex;
    font-size: 18px;
    height: 36px;
    width: 100%;
    align-items: center;
    & input {
       height: 100%;
       width: 100%;
       color: $color-font-main;
       font-size: 14px;
       border:none;
       &::placeholder {
           color: $color-font-occupation;
       }
    }
    & .tag {
        margin-right: 6px;
    }
}

.add_button {
    margin-top: 4px;
    margin-left:18px;
    padding: 8px 10px;
}

.icon_delete,.icon_flag {
    color: $color-font-occupation;
    margin: 0;
    font-size: 16px;
    &:hover {
        cursor: pointer;
        color:$color-theme;
    }
    &:focus {
        color:$color-theme;
    }
}

.task_meta {
    display: flex;
    justify-content: space-between;
}
.task_meta_quick_settings {
    margin-top: 2px;
}
.task_meta_quick_settings > ul  {
    &>li{
        font-size: 20px;
        padding: 0;
    }
}

.projectList {
    padding: 8px;
    & > li {
        display: flex;
        flex-direction: column;
        & .project_container, &.collectBox {
            padding: 8px 16px;
            max-width: 256px;
            display: flex;
            align-items: center;
            &:hover{
                background:rgb(236,245,255);
                cursor: pointer;
            }
        }

         &.collectBox {
             flex-direction: row;
         }

    }
    & > li .project_container {
        justify-content: flex-start;
        & > div:first-child {
            min-width: 10px;
            height: 10px;
            border-radius: 8px;
        }
        & > span{
            line-height: 16px;
            margin-left: 6px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

</style>