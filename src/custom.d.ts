import Task from "./lib/Task";
import Project from "./lib/Project";
import Block from "./lib/Block";

type RootState = {
   taskList: Task[],
   projectList: Project[],
   blockList: Block[]
}

type ProjectTree = {
   project: Project,
   blocks: Block[]
}

type BlockTree = {
   block:Block,
   tasks: Task[]
}