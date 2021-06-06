<template>
    <div class="sidebar">
        <div class="list_holder">
            <ul class="list">
                <li><router-link to="/today" active-class="xxx">今日</router-link></li>
                <li><router-link to="/calender" active-class="xxx">日历</router-link></li>
            </ul>
            <div class="projects_container">
                <div class="list_title">项目</div>
                <ul class="list">
                    <li><router-link to="/projects/1" active-class="xxx">做一桌子菜</router-link></li>
                    <li><router-link to="/projects/2" active-class="xxx">创建计划</router-link></li>
                </ul>
            </div>
        </div>
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
@import "~@/assets/style/common.scss";
.sidebar {
    max-width: 320px;
    min-height: 100vh;
    // position: fixed;
    // left:0;
    // top:0;
    -moz-box-shadow:1px 1px 2px #E8E8EA; -webkit-box-shadow:1px 1px 2px #E8E8EA; box-shadow:1px 1px 2px #E8E8EA;
}

.list_holder {
    padding: 120px 8px;
}

.list > li > a{
    width: 272px;
    padding: 8px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    border-radius: 12px;

    &:hover {
        background-color:  $color-blue-11;
        font-weight: 700;
    }
}

.xxx {
    background-color:  $color-blue-11;
    font-weight: 700;
}


.list_title {
    width: 272px;
    padding: 8px;
    display: flex;
    justify-content: center;
    font-size: 14px;
}


</style>