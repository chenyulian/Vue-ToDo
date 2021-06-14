<template>
    <el-dialog
        title="添加项目"
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose"
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
              <el-button @click="$emit('update:visible',false)">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Project from "@/lib/Project";
    import { Prop } from "vue-property-decorator";
    import createId from "@/lib/createId";

    @Component
    export default class AddProjectDialog extends Vue {
        project = new Project();

        @Prop({type:Boolean, required:true})
        visible!:boolean;

        submitNewProject():void {
            this.project.id = createId("project").toString();
            this.$store.commit("addNewProjct", this.project);
            this.$emit('update:visible',false);
        }

        handleClose():void {
            this.$emit('update:visible',false);
        }
    }
</script>