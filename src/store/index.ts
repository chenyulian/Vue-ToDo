import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import Task from '@/lib/Task'
import { RootState } from '@/custom'
import Project from '@/lib/Project'
import Block from '@/lib/Block'
import createId from '@/lib/createId'

// let customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    taskList: [],
    todayTaskList: [],
    projectList: [],
    blockList: []
  } as RootState,
  mutations: {
    fetchTaskList(state) {
      state.taskList = JSON.parse(localStorage.getItem("task_list") || '[]');
    },
    saveTaskList(state, taskList:Task[]) {
      state.taskList = taskList;
      localStorage.setItem("task_list",JSON.stringify(taskList));
    },
    fetchTodayTaskList(state) {
      store.commit("fetchTaskList");
      state.todayTaskList =  state.taskList.filter((task:Task)=>{
        return task.dueDate === null ||
               (dayjs(task.dueDate).isSame(dayjs(new Date()),'day') && task.status === 1);
      });
    },

    addTask(state, task:Task) {
      store.commit("fetchTaskList");
      state.taskList.push(task);
      store.commit("saveTaskList", state.taskList);
      store.commit("fetchTodayTaskList");
    },

    deleteTask(state, id:string) {
      store.commit("fetchTaskList");
      if(state.taskList === []) {
        throw new Error('empty task list');
      }
      const index = state.taskList.findIndex((task:Task)=>{
        return task.id === id;
      })
      state.taskList.splice(index, 1);
      store.commit("saveTaskList", state.taskList);
      store.commit("fetchTodayTaskList");
    },

    finishTask(state, id: string) {
      store.commit("fetchTaskList");
      if(state.taskList === []) {
        throw new Error('empty task list');
      }
      const task = state.taskList.find((task:Task)=>{
        return task.id === id;
      });
      if(task) task.status = 2;
      store.commit("saveTaskList", state.taskList);
      store.commit("fetchTodayTaskList");
    },

    fetchProjectList(state) {
      const projects = JSON.parse(localStorage.getItem("project_list") || '[]');
      state.projectList =  projects.filter((project:Project)=>{
        return project.status === 1;
      });
    },

    saveProjectList(state, projects: Project[]) {
      state.projectList = projects;
      localStorage.setItem("project_list",JSON.stringify(projects));
    },

    addNewProjct(state, project:Project) {
      store.commit("fetchProjectList");
      state.projectList.push(project);
      store.commit("saveProjectList",state.projectList);
      store.commit("fetchProjectList");
    },

    deleteProject(state, id:string) {
       // 删除任务
       const project = state.projectList.find((item)=>{
         return item.id === id;
       });

       store.commit("fetchTaskList");
       const newTasks = state.taskList.filter((task)=>{
         return task.project !== project?.name;
       });
       store.commit("saveTaskList",newTasks);
       store.commit("fetchTaskList");
       store.commit("fetchTodayTaskList");

      // 删除project
      // store.commit("fetchProjectList");
      const projectIndex = state.projectList.findIndex(i => i.id === id);
      state.projectList.splice(projectIndex, 1);
      store.commit("saveProjectList",state.projectList);
    },
    addBlock(state, payload:{projectId:string,blockName:string}) {
      store.commit("fetchProjectList");
      const newBlock = new Block();
      const {projectId, blockName} = payload;
      newBlock.name = blockName;
      newBlock.id = createId("block").toString();
      const project = state.projectList.find((item)=>{return item.id === projectId});
      project?.blocks.push(newBlock);
      store.commit("saveProjectList", state.projectList);
      store.commit("fetchProjectList");
    },
    deleteBlock(state, payload:{blockName:string, projectId:string}){
      const project = state.projectList.find(i => i.id === payload.projectId);
      project?.blocks.splice(project!.blocks.findIndex(i => i.name === payload.blockName), 1);
      store.commit('saveProjectList', state.projectList);
    },
    deleteTaskByBlock(state, payload:{projectName:string,blockName:string}) {
      state.taskList = state.taskList.filter((task)=>{
       return !(task.project === payload.projectName && task.block === payload.blockName);
      });
     
      store.commit('saveTaskList', state.taskList);

    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;