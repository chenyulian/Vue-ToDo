<template>
    <div class="today">
        <div class="title">{{todayString}}</div>
        <div class="task_list">
            <ul>
                <li v-for="task in task_list" :key="task.id">
                    <TaskListItem :task = "task" />
                    <hr />
                </li>
            </ul>
        </div>
        <task-editor />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TaskListItem from "@/components/TaskListItem.vue";
    import dayjs from 'dayjs';

    @Component({
        components: {TaskListItem}
    })
    export default class Today extends Vue{
        todayString = dayjs(new Date()).format("YYYY-MM-DD");

        // 从localStorage获取taskList
        task_list = JSON.parse(localStorage.getItem("task_list") || "[]");
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';

.today {
    // border: 1px solid red;
    padding-left: 24px;
    padding-right: 24px;
    max-width: 746px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
}

.task_list > ul > li hr {
    border:0;
    background-color: $color-border-3;;
    height:1px;
}

</style>