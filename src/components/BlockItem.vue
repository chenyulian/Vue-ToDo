<template>
    <div class="block_item">
        <div class="title" v-if="blockName !== ''">
            <div @click="showTasks = !showTasks" :class="showTasks?'':'hideList'">
                <i class="el-icon-arrow-down"></i>
            </div>
            <div>{{blockName}}</div>
        </div>
        <transition name="fade">
            <div class="task_list" v-if="showTasks">
                <ul>
                    <li v-for="task in taskList" :key="task.id">
                        <TaskListItem :task = "task" />
                        <hr />
                    </li>
                </ul>
                <task-editor v-if="showTasks" /> 
            </div>
         </transition>
            
       
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
        title = "";

        @Prop({type:String, required:true})
        blockName!:string;

        @Prop({type:Array, required:true})
        taskList?:Task[];

        showTasks = true;
    }
</script>

<style lang="scss" scoped>

@import "~@/assets/style/common.scss";
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
    & div:nth-child(2) {
        font-weight: 700;
        margin-left: 4px;
        font-size: 14px;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>