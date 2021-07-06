<template>
   
        <div class="addButtonText" @click="$emit('click')">
            <Icon name="add" class="icon-add" />
            <span>添加任务</span>
        </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class AddTaskButton extends Vue{
        
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';
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