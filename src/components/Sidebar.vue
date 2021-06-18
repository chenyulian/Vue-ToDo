<template>
    <div class="sidebar">
        <div class="list_holder">
            <ul class="list">
                <li><sidebar-list-item link="/today" linkText="今日" elIconClassName="news"/></li>
                <li><sidebar-list-item link="/schedule" linkText="日程" elIconClassName="date" /></li>
            </ul>
            <div class="projects_container">
                <div class="list_title">
                    <div>项目</div>
                    <div @click="addProject" class="add_project_button"><Icon name="add" class="icon-add"/></div>
                </div>
                <ul class="list">
                    <li v-for="project in projectList" :key="project.id">
                        <sidebar-list-item 
                        :link="'/projects/' + project.id" 
                        :linkText="project.name" 
                        :projectColor="project.color"
                        :projectId="project.id" />
                    </li>
                </ul>
            </div>
            <ul class="list">
                <li><sidebar-list-item link="/record" linkText="记录" elIconClassName="data-line"/></li>
                <li><sidebar-list-item link="/settings" linkText="设置" elIconClassName="setting"/></li>
            </ul>
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
    padding: 8px 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    & .add_project_button{
        line-height: 24px;
        margin-top: 4px;
        &:hover{
            & .icon-add {
                background: #eee;
            }
           
        }
        & .icon-add {
            width: 24px;
            height: 24px;
        }
    }
}

.projects_container > .list {
    max-height: 550px;
    overflow:auto;
}

</style>