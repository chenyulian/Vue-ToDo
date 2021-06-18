<template>
  <div id="app">
    <Nav @toggleSidebar="isShowSidebar = !isShowSidebar" />
    <div class="content_container">
      <transition name="slide-fade">
        <Sidebar v-if="isShowSidebar"
               :addProjectDialogVisible.sync="addProjectDialogVisible"/>
      </transition>
      
      <router-view class="content" />

      <!-- dialogs -->
      <add-project-dialog :visible.sync="addProjectDialogVisible" />

    </div>    
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component";
import AddProjectDialog from "@/components/dialogs/AddProjectDialog.vue";

@Component({
  components: {AddProjectDialog}
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

.content_container {
  display: flex;
}

.content {
  width: 100%;
  padding-top: 100px;
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
