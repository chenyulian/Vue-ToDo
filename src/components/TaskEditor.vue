<template>
<div class="task_editor" :class="isEditing===true?'isEditing':''">
    <div class="task_edit_container" :class="isEditing===true?'isEditing':''">
        <div class="content-container">
            <el-tag 
                v-if="selectedTagName!==''" 
                type="primary" size="mini" 
                class="tag" 
                closable
                disable-transitions
                @close="closeTag">{{selectedTagName}}</el-tag>
            <input type="text" v-model = "task_content" width="100%" @keyup.enter="saveTask" placeholder="请输入任务内容，例如：慢跑半小时">
        </div>
        
        <div class="task_meta">
            <div class="task_meta_main">
                <el-button plain size="mini" v-popover:date-popover icon="el-icon-date">{{dueDateString}}</el-button>
                <el-tooltip class="item" effect="dark" content="选择一个项目" placement="right">
                    <el-button plain size="mini" v-popover:section-popover>
                        <div v-if="projectColor !== ''" 
                            style="width: 8px; height: 8px; border-radius: 6px; display:inline-block; margin-right: 8px;" 
                            :style="`backgroundColor:${projectColor}`">
                        </div>
                        <i v-else class="el-icon-receiving"></i>
                        <span>{{projectFullName}}</span>
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
                        <li class="collectBox" @click="selectProject({id: '-1'})"><i class="el-icon-receiving"></i><span style="margin-left:4px;">收集箱</span></li>
                        <li v-for="item in projectList" :key="item.project.id" @click="selectProject(item.project)">
                            <div class="project_container">
                                <div :style="{backgroundColor:item.project.color}"></div>
                                <span>{{item.project.name}}</span>
                            </div>
                            <ul v-if="item.blocks" class="blockList">
                                <li v-for="block in item.blocks" :key="block.id" @click.stop="selectBlock(block, item.project.id, item.project.color)">
                                    {{block.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-popover>
            </div>
           
           <div class="task_meta_quick_settings">
               <ul>
                   <li v-if="task_id">
                       <el-tooltip class="item" effect="dark" content="删除任务" placement="bottom">
                        <!-- <i class="el-icon-delete icon_tag"></i> -->
                        <i class="el-icon-delete icon_delete" v-popover:tags-popover></i>
                       </el-tooltip>
                       <!-- <el-popover
                            placement="bottom"
                            title="标签"
                            width="200"
                            trigger="click"
                            ref="tags-popover"
                            >
                            <ul class="tags">
                                <li v-for="tag in tags" :key="tag.id" @click="selectTag(tag.name)">{{tag.name}}</li>
                            </ul>
                        </el-popover> -->
                    </li>
               </ul>
           </div>
        </div>
        
    </div>
    <div class="buttons_container">
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
    import dayjs from 'dayjs';
    import Task from '@/lib/Task';
    import createId from '@/lib/createId';
    import Project from "@/lib/Project";
    import Block from "@/lib/Block";
    import { Prop,Component } from "vue-property-decorator";
    import { ProjectTree } from "@/custom";
    import { mixins } from "vue-class-component";
    import ProjectHelper from "@/mixins/ProjectHelper";
    import BlockHelper from "@/mixins/BlockHelper";

    @Component
    export default class TaskEditor extends mixins(ProjectHelper,BlockHelper){
        task_content = "";
        dueDate = new Date();
        visible = false;
        moreVisible = false;
        isEditing = false;        
        _parentId!:string | null;
        _projectId = "";
        _blockId!:string | null;
        projectName = "";
        blockName="";
        selectedTagName = "";
        projectColor = "";

        tags = [
            {id: 1, name:"工作"},
            {id: 2, name:"家务"},
            {id: 3, name:"学习"}
        ]

        created():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchBlockList");
            this._projectId = this.project_id?this.project_id:"-1";
            this._blockId = this.block_id?this.block_id:null;
            this._parentId = this.parent_id?this.parent_id:null;
            this.blockName = this._blockId===null?"":this.getBlockById(this._blockId).name;
            this.projectName = this.getProjectById(this._projectId).name;
            this.projectColor = this.getProjectById(this._projectId).color;
            
            const task = (this.$store.state.taskList as Task[]).find(i => i.id === this.task_id);
            if(task !== undefined) {
                this.task_content = task.content;
                // to fix Tag取值逻辑
                this.selectedTagName = task.tags.length >= 0? task.tags[0]:"";
                if(task.due_date) {
                    this.dueDate = new Date(task.due_date);
                }
            }
        }

        @Prop({type: String})
        project_id?:string;

        @Prop({type:String})
        block_id?:string;

        @Prop({type:String})
        parent_id?:string;

        @Prop({type:String})
        task_id?:string;

        get projectFullName():string {
            if(this.blockName !== "" && this.blockName !== null && this.blockName !== undefined) {
                return this.projectName + " / " + this.blockName;
            }else{
                return this.projectName;
            }
        }
        
        get dueDateString():string {   
            if(this.dueDate === null) {
                return "日程安排";
            }         
            if(dayjs(this.dueDate).isSame(dayjs(new Date()),'day')){
                return "今天";
            }
            if(dayjs(this.dueDate).isSame(dayjs(new Date()).add(1,'day'),'day')){
                return "明天";
            }
            if(dayjs(this.dueDate).isSame(dayjs(new Date()).add(2,'day'),'day')){
                return "后天";
            }
            return dayjs(this.dueDate).format("MM-DD");
        }

        get addButtonAvaliable():boolean {
            return this.task_content.length <= 0;
        }

        get projectList(): ProjectTree[]{
            const projects = (this.$store.state.projectList as Project[]).filter(i => i.status === 1);
            const blocks = (this.$store.state.blockList as Block[]).filter(i => i.status === 1);
            const result = [] as ProjectTree[];
            for(let p of projects) {
                result.push({project:p, blocks:blocks.filter(i => i.project_id === p.id)});
            }
            return result;
        }

        saveTask():void {
            if(this.task_content === "") return;
            if(this.task_id === undefined) {
                const task = new Task();
                task.content = this.task_content;
                task.id = createId("task").toString();
                if(this.parent_id) task.parent_id = this.parent_id;
        
                task.project_id = this._projectId;
                task.block_id = this._blockId;

                task.due_date = this.dueDate===null?null:this.dueDate.toString();
                task.status = 1;
                task.tags.push(this.selectedTagName);
                this.$store.commit('addTask', task);
            } else {
                const task = (this.$store.state.taskList as Task[]).find(i => i.id === this.task_id);
                if(task) {
                    task.content = this.task_content;
                    task.project_id = this._projectId;
                    task.block_id = this._blockId;
                    task.due_date = this.dueDate===null?null:this.dueDate.toString();
                    task.tags.push(this.selectedTagName);
                    this.$store.commit('updateTask', task);
                }
            }
            
            // 完成后不显示任务编辑
            this.isEditing = false;
            this.task_content = "";
            this._projectId = this.project_id?this.project_id:"-1";
            this._blockId = this.block_id?this.block_id:null;
            this.blockName = this._blockId===null?"":this.getBlockById(this._blockId).name;
            this.projectName = this.getProjectById(this._projectId).name;
            this.projectColor = this.getProjectById(this._projectId).color;
            this.dueDate = new Date();
            this.selectedTagName = "";

            this.$emit("finish");
        }

        selectProject(project: Project):void {
            this._projectId = project.id;
            this.projectName = this.getProjectById(this._projectId).name;
            this.projectColor = project.color || "";
            this._blockId = null;
            this.blockName = "";
            this.moreVisible = false;
            
        }

        selectBlock(block:Block, projectId: string, color:string):void{
            this._blockId = block.id;
            this.blockName = this._blockId===null?"":this.getBlockById(this._blockId).name;
            this._projectId = projectId;
            this.projectName = this.getProjectById(this._projectId).name;
            this.moreVisible = false;
            this.projectColor = color;
        }
       
       selectTag(tagName:string):void {
           this.selectedTagName = tagName;
       }

       closeTag():void {
           this.selectedTagName = "";
       }

       cancel():void {        
           // 清空数据
           this.task_content = "";
           this.dueDate = new Date();
           this._projectId = this.project_id?this.project_id:"-1";
           this._blockId = this.block_id?this.block_id:null;
           this.blockName = this._blockId===null?"":this.getBlockById(this._blockId).name;
           this.projectName = this.getProjectById(this._projectId).name;
           this.projectColor = this.getProjectById(this._projectId).color;
           this.selectedTagName = "";
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
    // border: 1px solid red;
    // border-radius: 5px;
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

.tags {
    & > li{
        line-height: 32px;
        text-align:center;
        &:hover{
            background:rgb(236,245,255);
            cursor: pointer;
        }
    }
}

.projectList {
    padding: 8px;
    & > li {
        display: flex;
        flex-direction: column;
        & .blockList > li, & .project_container, &.collectBox {
            padding: 8px 16px;
            max-width: 256px;
            display: flex;
            align-items: center;
            &:hover{
                background:rgb(236,245,255);
                cursor: pointer;
            }
        }

        & .blockList > li {
            font-size: 12px;
            padding-left: 36px;
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