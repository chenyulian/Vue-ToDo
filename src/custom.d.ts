import Task from "./lib/Task";
import Project from "./lib/Project";

type RootState = {
   taskList: Task[],
   projectList: Project[],
}