import Project from "@/lib/Project";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export class ProjectHelper extends Vue {
    getProjectById(id:string):Project {
        const projectList = this.$store.state.projectList as Project[];
        const project = projectList.find(i => i.id === id);
        if(project === undefined){
            const result = new Project();
            result.id = "-1";
            result.color = "";
            result.name = "收集箱"
            return result;
            // throw new Error("can't find project by id : " + id);
        } else {
            return project;
        }
    }
}

export default ProjectHelper;