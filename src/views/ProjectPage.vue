<template>
    <div class="projectPage">
        <h1>{{project.name}}</h1>
        <ul class="blockList">
           <li v-for="(item, key) in tasks" :key="key">
                <block-item :blockName="item[0]" 
                            :taskList="item[1]" 
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
    import TaskListItem from "@/components/TaskListItem.vue";
    import BlockItem from "@/components/BlockItem.vue";

    @Component({
        components: {TaskListItem,BlockItem}
    })
    export default class ProjectPage extends Vue{
        
        blockEditorVisible = false;

        newBlockName = "";

        zxz=false;

        get projectId():string{
            return this.$route.params.id;
        }

        get project():Project {
            return this.$store.state.projectList.find((item:Project)=>{
                return item.id === this.projectId;
            });
        }

        get tasks():Map<string,Task[]> {
            const taskList = this.$store.state.taskList as Task[];
            const blockList = this.project.blocks;
            const tasks = taskList.filter((t:Task)=>{
                return t.project === this.project.name && t.status === 1;
            });
            
            let map:Map<string,Task[]> = new Map();

            map.set("",[]);

            blockList.forEach((block)=>{
                const blockKey = block.name;
                map.set(blockKey, []);
            })
            
            tasks.forEach((task)=>{
                const blockKey = task.block === null ? "":task.block;
                const list = map.get(blockKey)===undefined?[]:map.get(blockKey) as Task[];
                map.set(blockKey,map.get(blockKey)===undefined?[task]:[...list, task]);
            });

            return map;
        }

        beforeCreate():void {
            this.$store.commit("fetchProjectList");
            this.$store.commit("fetchTaskList");
        }

        addBlock(projectId: string):void {
            this.$store.commit("addBlock", {projectId: projectId, blockName: this.newBlockName});
            this.blockEditorVisible = false;
            // 清空输入框数据
            this.newBlockName = "";
        }

        deleteBlock(blockName:string):void {
            this.$store.commit("deleteBlock",{projectId:this.projectId, blockName:blockName});
            this.$store.commit("deleteTaskByBlock",{projectName:this.project.name,blockName:blockName})
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