<template>
    <div class="task_list_item">
        <div class="task_container">
            <div class="check_box_circle">
                <Icon name="tick" class="tick" />
            </div>
            <div class="task_content">任务内容</div>
        </div>
        <hr />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class TaskListItem extends Vue{
        
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.task_list_item {
    width: 100%;
    height: 56px;
    padding: 12px;

    & > hr {
        border:0;
        background-color:#e8e8ea;
        height:1px;
    }
}
.task_container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
}
.check_box_circle {
    width: 24px;
    height: 24px;
    border: 1px solid $color-blue-3;
    background-color: white;
    border-radius: 9px;
    position: relative;
    margin: 4px;
    &:hover {
        background-color: $color-blue-3;
        .tick {
            display: block;
        }
    }
}

.tick {
    position: absolute;
    width: 15px;
    height: 15px;
    left: calc(50% - 15px/2 - 0.5px);
    top: calc(50% - 15px/2 + 0.5px);
    display: none;
}

.task_content {
    flex-grow: 1;
    padding-left: 8px;
    color: #4a4754;
}

</style>