<template>
        <el-tooltip class="item" effect="dark" :content="linkText" placement="bottom" :open-delay="1000">
            <div>
                <router-link 
                :to="link"
                class="sidebar-list-item"
                active-class="selected"
                v-popover:fullText>
                    <i v-if="elIconClassName" :class="`el-icon-${elIconClassName}`"></i>
                    <div v-else class="colored_sign" :style="`background-color:${projectColor};`"></div>
                    <div class="linkText">{{linkText}}</div>
                    <div class="operate" v-popover:operate v-if="projectId"><i class="el-icon-more"></i></div>
                    <el-popover
                        ref="operate"
                        placement="right"
                        width="200"
                        trigger="click">
                        <ul class="operate_items">
                            <li @click="modifyProject(projectId)">编辑项目</li>
                            <li @click="deleteProject(projectId)">删除项目</li>
                        </ul>
                    </el-popover>
                </router-link>
            </div>
            <div slot="content"><div style="font-size:5px;">{{linkText}}</div></div>
        </el-tooltip>
</template>

<script lang="ts">
    import ProjectHelper from "@/mixins/ProjectHelper";
    import Component, { mixins } from "vue-class-component";
    import { Prop } from "vue-property-decorator";

    @Component
    export default class SidebarListItem extends mixins(ProjectHelper) {
        @Prop({type:String, required:true})
        link!:string;

        @Prop({type:String, required:true})
        linkText!:string;

        @Prop({type:String})
        elIconClassName?:string;

        @Prop({type:String})
        projectColor?:string;

        @Prop({type:String})
        projectId?:string;

        modifyProject(id:string):void {
            this.$emit("modifyProject",id);
            this.$store.commit("updateCurrentProject",this.getProjectById(id));
        }

        deleteProject(id:string):void {
            this.$store.commit("deleteProject", id);
            this.$router.push("/today");
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";

.sidebar-list-item{
    width: 272px;
    height: 32px;
    padding: 8px 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    border-radius: 12px;

    &.selected {
        background-color:  #eee;
        font-weight: 700;
    }

    &:hover {
        background-color:  #eee;
        & .operate {
            display: block;
        }
    }

    &>div {
        line-height: 16px;
        text-align: center;
        padding: 0 4px;
        margin-left: 4px;
    }

    & .linkText {
        max-width: 80%;
        max-height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 1;
        text-align: left;
    }

    & .operate {
        color: $color-font-secondary;
        display: none;
    }
}

.colored_sign {
    width: 10px;
    height: 10px;
    border-radius: 8px;
}

.operate_items {
    & > li{
        line-height: 32px;
        text-align:center;
        &:hover{
            background:rgb(236,245,255);
            cursor: pointer;
        }
    }
}

</style>