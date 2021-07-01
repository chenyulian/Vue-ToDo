<template>
    <div class="block_item">
        <Icon name="drag" class="icon-drag" v-popover:popover :style="blockName===''?'visibility:hidden':''" />
        <el-popover
            placement="bottom"
            width="200"
            trigger="click"
            ref="popover"
           >
           <ul class="operate_items">
               <li @click="isEditing = true">
                   修改模块
               </li>
               <li @click="$emit('delete', blockId)">
                   删除模块
               </li>
           </ul>
        </el-popover>
        <div class="block">
            <div class="title" v-if="blockName !== ''">
                <div @click="showTasks = !showTasks" :class="showTasks?'':'hideList'">
                    <i class="el-icon-arrow-down"></i>
                </div>
                <!-- <div>{{blockName}}</div> -->
                <input class="blockName" :class="isEditing?'isEditing':''" 
                      v-model="_blockName"
                      :disabled="!isEditing" 
                      @blur="isEditing = false"
                      @keyup.enter="modifyBlock(blockId)">
            </div>
            <transition name="fade">
                <div class="task_list" v-if="showTasks">
                    <ul>
                        <li v-for="task in taskList" :key="task.id">
                            <TaskListItem :task = "task" />
                            <hr />
                        </li>
                    </ul>
                    <task-editor v-if="showTasks" :project_id="projectId" :block_id="blockId" /> 
                </div>
            </transition>
         </div>
       
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TaskListItem from "@/components/TaskListItem.vue";
    import Task from "@/lib/Task";
    import { Prop } from "vue-property-decorator";
    @Component({
        components: {TaskListItem}
    })
    export default class BlockItem extends Vue{

        @Prop({type:String, required:true})
        blockName!:string;

        _blockName="";

        @Prop({type:Array, required:true})
        taskList?:Task[];

        @Prop({type:String, required:true})
        blockId!:string;

        @Prop({type:String, required:true})
        projectId!:string;

        showPopover=false;

        showTasks = true;

        isEditing = false;

        created() :void {
            this._blockName = this.blockName || "";
        }

        modifyBlock():void {
            this.isEditing = false;
            this.$emit("update:blockName",this._blockName);
        }
    }
</script>

<style lang="scss" scoped>

@import "~@/assets/style/common.scss";
.block_item {
    display: flex;
    &:hover {
        & .icon-drag {
            visibility: visible;
        }
    }
    & .block {
        flex-grow: 1;
    }
}
.task_list > ul > li hr {
    border:0;
    background-color: $color-border-3;;
    height:1px;
}

.title {
    display: flex;
    align-items: center;
    & div:first-child {
       padding: 2px 6px;
        &:hover {
            cursor: pointer;
            background: #eee;
        }
        
        &.hideList {
            transform: rotate(-90deg);
        }
    }
    // & input:first-child {
    //     font-weight: 700;
    //     margin-left: 4px;
    //     font-size: 14px;
    //     border: none;
    // }

    & .blockName {
        font-weight: 700;
        margin-left: 4px;
        font-size: 14px;
        border: none;
        background: none;
        &:hover{
            cursor:default;
        }
        &.isEditing {
            &:hover{
                cursor:auto;
                
            }
            border: 1px solid $color-theme;
        }
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.icon-drag {
    width:28px;
    height: 28px;
    visibility: hidden;
    &:hover{
        cursor: pointer;
    }
}

.operate_items {
    & > li{
        line-height: 32px;
        text-align:center;
        &:hover{
            background:rgb(236,245,255);
            cursor: pointer;
        }
    }
}


</style>