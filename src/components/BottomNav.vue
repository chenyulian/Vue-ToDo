<template>
    <div class="bottom-nav">
        <ul class="bottom-nav-list">
            <li :class="selected === 1?'selected':''" @click="select(1)"><Icon name="todo" class="icon-todo" /><span>待办</span></li>
            <li :class="selected === 2?'selected':''" @click="select(2)"><Icon name="project" class="icon-todo" />
                <span>项目</span>
            </li>
            <li :class="selected === 3?'selected':''" @click="select(3)"><Icon name="statistics" class="icon-todo" />
                <span>数据</span>
            </li>
        </ul>
        <div class="nav-selected-color" :class="`selected-${selected}`"></div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    @Component
    export default class BottomNav extends Vue {
        selected = 1;
        
        created():void {
            if(this.$route.path === '/today') this.selected = 1;
            if(this.$route.path === '/projects') this.selected = 2;
            if(this.$route.path === '/stats') this.selected = 3;
        }
        select(index: number):void {
            this.selected = index;
            
          
            if(this.selected === 1 && this.$route.path !== '/today') {
                this.$router.push("/today");
            }
            if(this.selected === 2 && this.$route.path !== '/projects') {
                this.$router.push("/projects");
            }
            if(this.selected === 3 && this.$route.path !== '/stats' ) {
                this.$router.push("/stats");
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/common.scss";

$seletedWidth: 76px;
$projectWidth: 96px;
$spacing: calc((100vw - 3 * #{$seletedWidth}) / 4);
.bottom-nav {
  position: relative;
  padding: 120px 8px;
  min-width: 300px;
  background: white;
  z-index: 2;
  border-right: 1px solid #E8E8EA;
  border-top:none;
   @media (max-width: 500px) {
       flex: 0 0 64px;
       width: 100vw;
       border-top: 1px solid #E8E8EA;
       border-right:none;
       padding: 0;
   }
   @media (max-width: 900px) and (min-width: 501px) {
       min-width: 30px;
       max-width: 120px;
        // .icon-todo {
        //     margin-right: auto;
        // }

       .bottom-nav-list > li > span {
           display: none;
       }
   }
  .nav-selected-color {
      display: none;
    position: absolute;
    background: #e4e8f4;
    border-radius: 8px;
    height: 36px;
    @media (max-width: 500px) {
        display: block;
        width: $seletedWidth;
        left: 0px;
        top: 14px;
        transform: translateX($spacing);
        
        &.seleted-1 {
            transform: translateX($spacing);
        }
        &.selected-2 {
            transform: translateX(calc(#{$spacing} * 2 + #{$seletedWidth}));
        }
        &.selected-3 {
            transform: translateX(calc(#{$spacing} * 3 + #{$seletedWidth} * 2));
        }
        &.selected-4 {
            transform: translateX(calc(#{$spacing} * 4 + #{$seletedWidth} * 3));
        }
            transition: transform 250ms cubic-bezier(0.645, 0.045, 0.355, 1);
        }
  }
  & > ul  {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    align-items: center;
    height: 100%;
    & > li {
        display: flex;
        flex-wrap: nowrap;
        padding: 6px 16px;
        margin-bottom: 8px;
        font-weight: 600;
        color:#ccd0e0;
        font-family: $font-hei;
        font-size: 14px;
        border-radius: 8px;
         & .icon-todo {
            width: 1.5em;
            height: 1.5em;
        }

       & > span {
           margin-left: 100px;
       }

        &.selected {
            color: #37429B;
        }

        &:hover {
            cursor: pointer;
            color: #37429B;
        }
    }

    @media (max-width: 500px) {
        flex-direction: row;
        justify-content: space-between;
        padding: 0 $spacing;
        & > li {
            align-items: center;
            justify-content: center;
            z-index: 1;
            margin-bottom: 0;
            padding: 8px 12px;
            &.selected {
                background:none;
            }
            & > span {
                margin-left: 4px;
            }
        }
    }
    
  }
}
</style>