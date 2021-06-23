<template>
    <div class="projectPage">
        <h1>{{project.name}}</h1>
        <ul class="blockList">
           <li v-for="(item) in task_list" :key="item.block.id">
                <block-item :blockName="item.block.name" 
                            :taskList="item.tasks"
                            :blockId="item.block.id"
                            :projectId="item.block.project_id"
                            class="blockItem" 
                            :showPopover="false"
                            @delete="deleteBlock"/>
            </li>
        </ul>
        <div class="addBlockEditor" v-if="blockEditorVisible">
            <el-input v-model="newBlockName" placeholder="请输入模块名称" style="margin-bottom:8px;"></el-input>
            <el-button type="primary" :disabled="newBlockName === ''" @click="addBlock(projectId)">添加模块</el-button>
            <el-button @click="blockEditorVisible = !blockEditorVisible">取消</el-button>
        </div>
        <div class="add_block_divider_container" @click="blockEditorVisible = true" v-if="!blockEditorVisible">
            <el-divider content-position="center" class="divider">添加模块</el-divider>
        </div>
        
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Project from "@/lib/Project";
    import Task from "@/lib/Task";
    import Block from "@/lib/Block";
    import TaskListItem from "@/components/TaskListItem.vue";
    import BlockItem from "@/components/BlockItem.vue";
    import { BlockTree } from "@/custom";

    @Component({
        components: {TaskListItem,BlockItem}
    })
    export default class ProjectPage extends Vue{
        
        blockEditorVisible = false;

        newBlockName = "";

        beforeCreate():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchTaskList");
            this.$store.commit("fetchBlockList");
        }

        get projectId():string{
            return this.$route.params.id;
        }

        get project():Project {
            return this.$store.state.projectList.find((item:Project)=>{
                return item.id === this.projectId;
            });
        }

        get block_list():Block[] {
            const blocks = this.$store.state.blockList as Block[];
            return blocks.filter((block)=>{
                if(block.project_id === this.projectId && block.status === 1) {
                    return true;
                }
                return false;
            })
        }

        get task_list():BlockTree[] {
            const tasks = this.$store.state.taskList as Task[];
            // const blockList = this.;
            const task_list = tasks.filter((task)=>{
                return task.project_id === this.projectId && task.status === 1;
            });
            
            let map:Map<string,Task[]> = new Map();
            let result:BlockTree[] = [];
            let defaultBlock = new Block();
            defaultBlock.id = "-1";
            defaultBlock.name = "";
            defaultBlock.project_id = this.projectId;
            result.push({block: defaultBlock, tasks:[]});
            map.set("",[]);

            this.block_list.forEach((block)=>{
                result.push({block:block, tasks:[]});
            })
            
            task_list.forEach((task)=>{
                if(task.block_id === null) {
                    result[0].tasks.push(task);
                }else{
                    const item = result.find(i => i.block.id === task.block_id);
                    item?.tasks.push(task);
                }

            });

            return result;
        }

        getBlockNameById(block_id:string):string {
            const block = this.block_list.find(t => t.id === block_id);
            if(block) return block.name;
            return "";
        }

        addBlock(projectId: string):void {
            this.$store.commit("addBlock", {projectId: projectId, blockName: this.newBlockName});
            this.blockEditorVisible = false;
            // 清空输入框数据
            this.newBlockName = "";
        }

        deleteBlock(blockId:string):void {
            this.$store.commit("deleteBlock",{blockId});
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

.add_block_divider_container {
   height: 32px;
   & > .divider {
       display: none;
   }
   &:hover {
       & > .divider{
           display: block;
       }
       cursor: pointer;
   }
}

.addBlockEditor,.add_block_divider_container{
   width: 96%;
   float: right;
}

.el-divider--horizontal{
    border-top: 1px solid #79bbff;
} 

.el-divider__text{
    color: #79bbff;
}

.blockList > li{
    display: flex;
    &:hover {
        .icon-drag {
            visibility: visible;
            cursor: pointer;
        }
    }
    & .blockItem {
        flex-grow: 1;
    }
}

</style>