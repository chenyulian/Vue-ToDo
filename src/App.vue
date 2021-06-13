<template>
  <div id="app">
    <Nav />
    <div class="content_container">
      <Sidebar :style="isShowSidebar?{'display':'block'}:{'display':'none'}"
               :addProjectDialogVisible.sync="dialogVisible"/>
      <router-view class="content" />

      <el-dialog
        title="添加项目"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form>
          <el-form-item label="项目名称">
            <el-input v-model="project.name"></el-input>
          </el-form-item>
          <el-form-item label="选择颜色">
            <el-color-picker v-model="project.color"></el-color-picker>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitNewProject">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>    
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component";
import Project from "@/lib/Project";
import createId from "./lib/createId";

@Component
export default class App extends Vue {
  isShowSidebar = true;
  dialogVisible = false;

  project:Project = new Project();

  submitNewProject():void {
    this.project.id = createId("project").toString();
    this.$store.commit("addNewProjct", this.project);
    this.dialogVisible = false;
  }

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
