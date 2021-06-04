<template>
    <div>
        <ul>
            <li><router-link to="/today">今日</router-link></li>
            <li><router-link to="/calender">日历</router-link></li>
            <div>
                <div>项目</div>
                <ul>
                    <li>做一桌子菜</li>
                    <li>创建计划</li>
                </ul>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    
    @Component
    export default class Sidebar extends Vue{
        
    }
</script>

<style lang="scss" scoped>

</style>