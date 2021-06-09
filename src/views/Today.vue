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
        <task-editor />
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

</style>