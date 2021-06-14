<template>
  <div id="app">
    <Nav />
    <div class="content_container">
      <Sidebar :style="isShowSidebar?{'display':'block'}:{'display':'none'}"
               :addProjectDialogVisible.sync="addProjectDialogVisible"/>
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
  padding: 100px 24px;
}
</style>
