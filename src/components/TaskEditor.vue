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
            <input type="text" v-model = "task_content" width="100%" placeholder="请输入任务内容，例如：慢跑半小时">
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
                        <li class="collectBox" @click="selectProject({name: '收集箱'})"><i class="el-icon-receiving"></i><span style="margin-left:4px;">收集箱</span></li>
                        <li v-for="project in projectList" :key="project.id" @click="selectProject(project)">
                            <div class="project_container">
                                <div :style="{backgroundColor:project.color}"></div>
                                <span>{{project.name}}</span>
                            </div>
                            <ul v-if="project.blocks.length > 0" class="blockList">
                                <li v-for="block in project.blocks" :key="block.id" @click.stop="selectBlock(block, project.name, project.color)">
                                    {{block.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-popover>
            </div>
           
           <div class="task_meta_quick_settings">
               <ul>
                   <li>
                       <el-tooltip class="item" effect="dark" content="选择标签" placement="bottom">
                        <i class="el-icon-collection-tag icon_tag" v-popover:tags-popover></i>
                       </el-tooltip>
                       <el-popover
                            placement="bottom"
                            title="标签"
                            width="200"
                            trigger="click"
                            ref="tags-popover"
                            >
                            <ul class="tags">
                                <li v-for="tag in tags" :key="tag.id" @click="selectTag(tag.name)">{{tag.name}}</li>
                            </ul>
                        </el-popover>
                    </li>
               </ul>
           </div>
        </div>
        
    </div>
    <div class="buttons_container">
        
        <el-button type="primary" size="medium" class="add_button" v-if="isEditing" @click="addTask" :disabled="addButtonAvaliable">
            <i class="el-icon-circle-plus"
            ></i>
            添加任务
        </el-button>

        <div class="addButtonText" v-else @click="isEditing = !isEditing">
            <Icon name="add" class="icon-add" />
            <span>添加任务</span>
        </div>

        <el-button type="text" size="medium" class="cancel_button" v-if="isEditing"
            @click="cancel">
            取消
        </el-button>
    </div>
</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import dayjs from 'dayjs';
    import Task from '@/lib/Task';
    import createId from '@/lib/createId';
    import Project from "@/lib/Project";
    import Block from "@/lib/Block";

    @Component
    export default class TaskEditor extends Vue{
        task_content = "";
        dueDate = new Date();
        visible = false;
        moreVisible = false;
        isEditing = false;
        project = "收集箱";
        parentProject = "";
        selectedTagName = "";
        projectColor = "";

        tags = [
            {id: 1, name:"工作"},
            {id: 2, name:"家务"},
            {id: 3, name:"学习"}
        ]

        created():void {
            this.$store.commit("fetchProjectList");
        }

        get projectFullName():string {
            return this.parentProject === ""?this.project:this.parentProject+" / "+this.project;
        }
        
        get dueDateString():string {            
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

        get projectList():Project[] {
            return this.$store.state.projectList;
        }

        addTask():void {
            const task = new Task();
            task.content = this.task_content;
            task.id = createId("task").toString();
            if(this.projectFullName.indexOf("/") >= 0) {
                const project = this.projectFullName.split("/")[0].trim();
                const block = this.projectFullName.split("/")[1].trim();
                task.project = project;
                task.block = block;
            } else {
                task.project = this.projectFullName;
            }
            task.dueDate = this.dueDate.toString();
            task.status = 1;
            task.tags.push(this.selectedTagName);
            this.$store.commit('addTask', task);
            // 完成后不显示任务编辑
            this.isEditing = false;
        }

        selectProject(project: Project):void {
            this.project = project.name;
            this.projectColor = project.color || "";
           
            this.parentProject = "";
            this.moreVisible = false;
            
        }

        selectBlock(block:Block, projectName: string, color:string):void{
            this.project = block.name;
            this.parentProject = projectName;
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
           this.isEditing = !this.isEditing;
           // 清空数据
           this.task_content = "";
           this.dueDate = new Date();
           this.project = "收集箱";
           this.parentProject = "";
           this.selectedTagName = "";
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
    margin-top: 8px;
    &.isEditing{
        border: 1px solid #DCDFE6;
        border-radius: 5px;
    }
}

.task_edit_container {
    display: none;
    &.isEditing{
        display: flex;
        flex-direction: column;
        min-height: 48px;
        border-radius: 5px;
        padding: 0 18px;
        font-size: 14px;
    }
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

.icon_tag,.icon_flag {
    color: $color-font-occupation;
    margin: 0;
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

.addButtonText {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: $color-font-occupation;
    &:hover {
        cursor: pointer;
        color:$color-theme;
    }
    & .icon-add {
        width: 18px;
        height: 18px;
    }
    & > span {
        line-height: 18px;
        text-align: center;
    }
}
</style>