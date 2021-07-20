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
            <li :class="selected === 4?'selected':''" @click="select(4)"><Icon name="about" class="icon-todo" /><span>关于</span></li>
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
        select(index: number):void {
            this.selected = index;
            if(this.selected === 1) {
                this.$router.push("/today");
                // this.$emit("goto", "/today")
            }
            if(this.selected === 2) {
                this.$router.push("/projects");
                // this.$emit("goto", "/projects")
            }
            if(this.selected === 3) {
                this.$router.push("/stats");
                // this.$emit("goto", "/stats")
            }
            if(this.selected === 4) {
                this.$router.push("/about");
                // this.$emit("goto", "/about")
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/common.scss";

$seletedWidth: 76px;
$projectWidth: 96px;
$spacing: calc((100vw - 4 * #{$seletedWidth}) / 5);
.bottom-nav {
  display: none;
//   position: absolute;
//   bottom: 0;
//   left: 0;
  flex: 0 0 64px;
  position: relative;
//   height: 64px;
  width: 100vw;
  border-top: 1px solid #E8E8EA;
  background: white;
  z-index: 2;
  @media (max-width:500px) {
    display: block;
  }
  .nav-selected-color {
    position: absolute;
    width: $seletedWidth;
    height: 36px;
    left: 0px;
    top: 14px;
    transform: translateX($spacing);
    background: #e4e8f4;
    border-radius: 8px;
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
  & > ul  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 $spacing;
    & > li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      z-index: 1;
      border-radius: 8px;
      font-weight: 600;
      color:#ccd0e0;
      font-family: $font-hei;
      padding: 8px 12px;
      
      & .icon-todo {
        width: 1.5em;
        height: 1.5em;
        margin-right: 4px;
      }

      &.selected {
        color: #37429B;
      }
    }
  }
}
</style>