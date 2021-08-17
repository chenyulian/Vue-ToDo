<template>
  <div id="app">
    <main>
      <router-view class="content" />
      <BottomNav />
    </main>
  </div>
</template>
 
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BottomNav from "@/components/BottomNav.vue";
@Component({
  components: {BottomNav}
})
export default class App extends Vue {
  isShowSidebar = true;
  addProjectDialogVisible = false; 
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/common.scss";

 body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-family: $font-hei;
    font-size: 16px;
    line-height: 1.5;
    background: white;
  }

main {
  display: flex;
  // border: 1px solid red;
  height: 100vh;
  // 
  flex-direction: row-reverse;
  @media (max-width: 500px) {
    flex-direction: column;
  }
}

.content {
  width: 100%;
  flex-grow: 1;
}
.slide-fade-enter-active {
  transition: all .3s ease
}
.slide-fade-leave-active {
  transition: all .3s ease
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(-320px);
}
</style>
