<template>
    <div>
        <h2>项目</h2>
        <ul class="filters">
            <li class="selected">全部</li>
            <li>进行中</li>
            <li>已完成</li>
        </ul>
        <ul class="project-list">
            <li>zz</li>
            <li>zz</li>
            <li>zz</li><li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
            <li>zz</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

    @Component
    export default class Projects extends Vue {
        
    }
</script>

<style lang="scss" scoped>
.filters {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    // padding: 0 36px;
    & > li {
        // padding: 0 18px;
        height: 100%;
        line-height: 48px;
        width: 72px;
        text-align: center;
        border-radius: 18px;

        &.selected {
            background: #e4e8f4;
            color: #37429B;
            font-weight: 600;
        }
    }
}

 .project-list {
        border: 1px solid green;
        background: lightblue;
        margin-top: 24px;
        overflow: auto;
    }
</style>