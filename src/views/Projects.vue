<template>
    <div class="projects">
        <h2>项目</h2>
        <ul class="filters">
            <li class="selected">全部</li>
            <li>进行中</li>
            <li>已完成</li>
        </ul>
        <ul class="project-list">
            <li>
                <div class="project_left">
                    <div class="name"><strong>项目名称1234567890123456789012345678901234567890</strong></div>
                    <div class="info">还剩2个任务</div>
                </div>
                <div class="progress">占位222</div>
                <div><Icon name="more" class="more" /></div>
            </li>
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
.projects {
    display: flex;
    flex-direction: column;
}
.filters {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    // padding: 0 36px;
    margin-top: 16px;
    & > li {
        // border: 1px solid red;
        // padding: 0 18px;
        // height: 100%; 
        // line-height: 48px;
        height: 48px;
        width: 86px;
        text-align: center;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        &.selected {
            background: #e4e8f4;
            color: #37429B;
            font-weight: 600;
        }
    }
}

 .project-list {
        
        margin-top: 16px;
        flex-grow: 1;
        overflow: auto;

        & > li {
            background:  #686A9A;
            border-radius: 16px;
            color: white;
            height: 96px;
            margin-bottom: 24px;
            padding: 4px 16px;
            display: flex;
            & > div:first-child {
                flex-grow: 1;
            }

            & .progress {
                padding: 4px;
            }
            & .more {
                width: 1.5em;
                height: 1.5em;
            }

            & .project_left {
                .name {
                    font-size: 20px;
                    max-width: 50vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .info {
                    font-size: 12px;
                    margin-top: 10px;
                }
            }

            align-items: center;
        }
    }
</style>