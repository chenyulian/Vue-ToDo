<template>
    <nav>
        <Icon name="align-text-justify" class="align-text-justify" />
        <button class="addButton">添加新任务</button>
        <span class="notice">通知</span>
        <span class="avatar">头像</span>

    </nav>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    
    @Component
    export default class Nav extends Vue{
        
    }
</script>

<style lang="scss" scoped>
nav {
    height: 80px;
    border: 1px solid red;
}

.align-text-justify {
    width: 24px;
    height: 24px;
    color: red;
}
</style>