<template>
  <div id="app">
    <Nav @toggleSidebar="isShowSidebar = !isShowSidebar" />
    <main>
      <transition name="slide-fade">
        <Sidebar v-if="isShowSidebar"
               :addProjectDialogVisible.sync="addProjectDialogVisible"/>
      </transition>
      
      <router-view class="content" />
      <BottomNav />
      <!-- dialogs -->
      <add-project-dialog :visible.sync="addProjectDialogVisible" />
    
    </main>
  </div>
</template>
 
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AddProjectDialog from "@/components/dialogs/AddProjectDialog.vue";
import BottomNav from "@/components/BottomNav.vue";
@Component({
  components: {AddProjectDialog, BottomNav}
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
  flex-direction: column;
}

.content {
  width: 100%;
  padding-top: 100px;
  border: 1px solid red;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 746px;
  margin-left: auto;
  margin-right: auto;
  // margin-top: 24px;
  flex-grow: 1;
  overflow: auto;
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
