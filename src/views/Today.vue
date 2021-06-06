<template>
    <div class="today">
        <div class="title">2021/06/01</div>
        <div class="task_list">
            <ul>
                <li>
                    <TaskListItem content = "买菜" />
                </li>
                <li><TaskListItem content = "做饭" /></li>
                <li><TaskListItem content = "洗碗"/></li>
            </ul>
        </div>
        <div class="add_task_container">
            <Icon name="plus-circle" class="plus-circle" />
            <div class="add_task_button">添加任务</div> 
        </div>
        <el-button>默认按钮</el-button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TaskListItem from "@/components/TaskListItem.vue";

    @Component({
        components: {TaskListItem}
    })
    export default class Today extends Vue{
        
    }
</script>

<style lang="scss" scoped>
.today {
    // border: 1px solid red;
    padding-left: 24px;
    padding-right: 24px;
    max-width: 746px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
}

.plus-circle {
    width:20px;
    height:20px;
    // fill:#003cff;
    
    
}

.add_task_container {
    display: flex;
    align-items: center;
    margin-top: 8px;
    padding: 0 18px;
    font-size: 14px;
    color:#8e8c94;

    &:hover {
        color:#003cff;
        cursor: pointer;
    }
}

.add_task_button {
    margin-left: 14px;
}

.title {
    padding: 0 18px;
    font-weight: 700;
}
</style>