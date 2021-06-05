<template>
    <nav>
        <Icon name="align-text-justify" class="align-text-justify"/>
        <div class="top_right_button_group">
            <button class="addButton">
                <span>添加任务</span>
                <Icon name="plus-circle" class="plus-circle" />
            </button>
            <div class="bell_container">
                <Icon name="bell" class="bell" />
            </div>
            
            <img src="@/assets/Avatar.png" alt="">
        </div>
        
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
    // border: 1px solid red;
    position:absolute;
    top:0;
    left:0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.align-text-justify {
    width: 32px;
    height: 32px;
    margin: 24px;
}
.top_right_button_group {
    margin-right: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > * {
        margin-left: 16px;
    }
    & .addButton {
        height: 32px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 14px 4px;
        background: #003cff;
        color: white;
        border-radius: 20px;
        font-size: 14px;
        & span {
           padding-left: 4px;
           padding-right: 4px;
        }
    }
}

.plus-circle {
    width: 24px;
    height: 24px;
    fill: red;
    color: red;
    // margin-left: 4px;
}

.bell_container {
    padding: 7px;
    border: 1px solid #e8e8ea;
    border-radius: 12px;
}
.bell {
    width: 18px;
    height: 18px;
}

.top_right_button_group img {
    width: 48px;
    height: 48px;
}
</style>