<template>
        <router-link 
            :to="link"
            class="sidebar-list-item"
            active-class="selected">
                <i class="el-icon-date"></i>
                <div>{{linkText}}</div>
        </router-link>
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
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";

.sidebar-list-item{
    width: 272px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 12px;

    &.selected {
        background-color:  $color-blue-11;
        font-weight: 700;
    }

    &:hover {
        background-color:  $color-blue-11;
        // font-weight: 700;
    }

    &>div {
        line-height: 16px;
        text-align: center;
        padding: 0 4px;
    }
}
</style>