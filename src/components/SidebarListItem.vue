<template>
        <el-tooltip class="item" effect="dark" :content="linkText" placement="bottom" open-delay="1000">
            <div>
                <router-link 
                :to="link"
                class="sidebar-list-item"
                active-class="selected"
                v-popover:fullText>
                    <i v-if="elIconClassName" :class="`el-icon-${elIconClassName}`"></i>
                    <div v-else class="colored_sign" :style="`background-color:${projectColor};`"></div>
                    <div class="linkText">{{linkText}}</div>
                </router-link>
            </div>
            <div slot="content"><div style="font-size:5px;">{{linkText}}</div></div>
        </el-tooltip>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";

    @Component
    export default class SidebarListItem extends Vue {
        @Prop({type:String, required:true})
        link!:string;

        @Prop({type:String, required:true})
        linkText!:string;

        @Prop({type:String})
        elIconClassName?:string;

        @Prop({type:String})
        projectColor?:string;
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";

.sidebar-list-item{
    width: 272px;
    height: 32px;
    padding: 8px;
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
    }
}

.colored_sign {
    width: 10px;
    height: 10px;
    border-radius: 8px;
}

::v-deep .fullText {
    color:red;
}
</style>