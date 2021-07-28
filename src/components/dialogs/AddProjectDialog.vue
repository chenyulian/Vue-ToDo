<template>
      <div v-if="visible">
        <div class="dialog-overlay" @click="$emit('update:visible', false)">
        </div>
        <div class="dialog-wrapper">
          <div class="dialog">
            <header><span>编辑项目</span><el-button type="primary" round @click="submitNewProject" :disabled="projectName === ''">保存</el-button></header>
            <div class="main">
              <div class="project-name-container">
                <h4>项目名称</h4>
                  <el-input v-model="projectName" placeholder="请输入项目名"></el-input>
                </div>
               <div class="color-list-container">
                 <h4>颜色</h4>
                  <ul>
                    <li v-for="color in colorList" :key="color.id">
                         <div class="color-option" :style="{backgroundColor: color.base, borderColor: color.light}" tabindex="0" @focus="selectColor(color.base)"
                         :class="{'focused':projectColor === color.base}"></div>
                      </li>
                  </ul>
               </div>
            </div>

          </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Component, { mixins } from "vue-class-component";
    import Project from "@/lib/Project";
    import { Prop } from "vue-property-decorator";
    import createId from "@/lib/createId";
    import ProjectHelper from "@/mixins/ProjectHelper";
    import { colorList } from "@/constants/colorList";

    @Component
    export default class AddProjectDialog extends mixins(ProjectHelper) {

        @Prop({type:Boolean, required:true})
        visible!:boolean;

        @Prop({type:String})
        projectId!:string;

        projectName = "";
        projectColor = "";

        focused = false;

        colorList = colorList;

        // get project():Project {
        //   const currentProject = this.$store.state.currentProjectForDialog as Project;
        //   return currentProject;
        // }

        // set project(value:Project) {
        //   this.$store.commit("updateCurrentProject",value);
        // }

        created():void {
          if(this.projectId === undefined) {
            this.projectName = "";
            this.projectColor = colorList[0].base;
          } else {
            const project = (this.$store.state.projectList as Project[]).find(p => p.id === this.projectId);
            if(project === undefined) {
              throw new Error(`can't find project of id: ${this.projectId}, please check your prop value`);
            } else {
              this.projectName = project.name;
              this.projectColor = project.color;
            }
          }
        }

        submitNewProject():void {
          const project = new Project();

          if(this.projectId === undefined ) project.id = createId("project").toString();
          
          project.color = this.projectColor;
          project.name = this.projectName;
          this.$store.commit("modifyProject", project);

          this.$emit('update:visible',false);
        }

        selectColor(color: string):void {
          this.projectColor = color;
        }

        close():void {
            this.$emit('update:visible',false);
        }

    }
</script>

<style lang="scss" scoped>
$radius: 4px;
$border-color: #d9d9d9;

.dialog {
    &-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: fade_out(#585772, 0.5);
        z-index: 10;
    }

    &-wrapper {
        position: fixed;
        top:50%;
        left:50%;
        width: 30%;
        transform: translate(-50%, -50%);
        height: 30%;
        background: white;
        border-radius: 30px;
        z-index: 11;
        padding-top: 12px;

        @media (max-width: 500px) {
          width: 100%;
          height: 60%;
          top: unset;
          bottom: 0;
          border-radius: 30px 30px 0 0;
          transform:unset;
          left: 0;
        }
    }

    & > header {
        padding: 12px 36px;
        border-bottom: 1px solid $border-color;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
    }

    & > .main {
        padding: 12px 36px;

        & > div {
          margin-bottom: 12px;
        }

        & h4 {
          margin-bottom: 12px;
        }
    }

}

.color-list-container {
  & > ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
   
    & > li > .color-option {
      width: 20px;
      height: 20px;
      border-radius: 12px;

      &:hover {
        cursor: pointer;
      }

      &.focused {
        width: 30px;
        height: 30px;
        border-radius: 20px;
        border: 2px solid;
      }
    }
  }
}
</style>