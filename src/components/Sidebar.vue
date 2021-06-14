<template>
    <div class="sidebar">
        <div class="list_holder">
            <ul class="list">
                <li><sidebar-list-item link="/today" linkText="今日" elIconClassName="date" /></li>
                <li><sidebar-list-item link="/calender" linkText="日历" elIconClassName="date" /></li>
            </ul>
            <div class="projects_container">
                <div class="list_title">
                    <div>项目</div>
                    <div class="add_project_button" @click="addProject"><i class="el-icon-circle-plus-outline"></i></div>
                </div>
                <ul class="list">
                    <li v-for="project in projectList" :key="project.id">
                        <sidebar-list-item 
                        :link="'/projects/' + project.id" 
                        :linkText="project.name" 
                        :projectColor="project.color"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";
    import SidebarListItem from "@/components/SidebarListItem.vue";
    import Project from "@/lib/Project";
    
    @Component({
        components: {SidebarListItem}
    })
    export default class Sidebar extends Vue{

       get projectList():Project[] {
           return this.$store.state.projectList;
       }
       
        @Prop({type:Boolean,required:true})
        addProjectDialogVisible!:boolean;

       created():void {
           this.$store.commit("fetchProjectList");
       }

       addProject():void {
           this.$emit("update:addProjectDialogVisible", true);
       }
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

.list_title {
    width: 272px;
    padding: 8px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 700;

    & .add_project_button{
        padding: 0 2px;
        &:hover{
            cursor: pointer;
            color:#409EFF;
        }
    }
}


</style>