import Vue from 'vue'
import Vuex from 'vuex'
import Task from '@/lib/Task'
import { RootState } from '@/custom'
import Project from '@/lib/Project'
import Block from '@/lib/Block'
import createId from '@/lib/createId'
import clone from '@/lib/clone'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    taskList: [],
    // todayTaskList: [],
    projectList: [],
    blockList: [],
    currentProjectForDialog: new Project()
  } as RootState,
  mutations: {
    fetchTaskList(state) {
      state.taskList = JSON.parse(localStorage.getItem("task_list") || '[]');
    },
    saveTaskList(state, taskList:Task[]) {
      state.taskList = taskList;
      localStorage.setItem("task_list",JSON.stringify(taskList));
    },

    addTask(state, task:Task) {
      store.commit("fetchTaskList");
      state.taskList.push(task);
      store.commit("saveTaskList", state.taskList);
    },
    
    deleteTask(state, id:string) {
      store.commit("fetchTaskList");
      if(state.taskList === []) {
        throw new Error('empty task list');
      }
      const delTask = state.taskList.find((task:Task)=>{
        return task.id === id;
      })
      if(delTask) delTask.status = 0;
      store.commit("saveTaskList", state.taskList);
    },

    finishTask(state, id: string) {
      store.commit("fetchTaskList");
      if(state.taskList === []) {
        throw new Error('empty task list');
      }
      const task = state.taskList.find((task:Task)=>{
        return task.id === id;
      });
      if(task) {
        task.status = 2;
        task.finishTime = new Date();
      }
      store.commit("saveTaskList", state.taskList);
    },

    fetchProjectList(state) {
      const projects = JSON.parse(localStorage.getItem("project_list") || '[]');
      state.projectList = projects;
    },

    saveProjectList(state, projects: Project[]) {
      state.projectList = projects;
      localStorage.setItem("project_list",JSON.stringify(projects));
    },

    modifyProject(state, project:Project) {
      store.commit("fetchProjectList");
      const p = state.projectList.find(i => i.id === project.id);
      if(p === undefined) {
        state.projectList.push(project);
      } else {
        p.name = project.name;
        p.color = project.color;
      }
      
      store.commit("saveProjectList",state.projectList);
    },

    deleteProject(state, id:string) {
      for(const task of state.taskList) {
        if(task.project_id === id) {
          // 0 表示已删除
          task.status = 0;
        }
      }
       store.commit("saveTaskList",state.taskList);
     
      // 删除project
      const project = state.projectList.find(i => i.id === id);
      if(project) project.status = 0;
      store.commit("saveProjectList",state.projectList);
    },

    // 模块相关操作 start
    fetchBlockList(state) {
      state.blockList = JSON.parse(localStorage.getItem("block_list") || '[]');
    },

    saveBlockList(state, blockList:Block[]) {
      state.blockList = blockList;
      localStorage.setItem("block_list", JSON.stringify(state.blockList));
    },

    addBlock(state, payload:{projectId:string,blockName:string}) {
      store.commit("fetchBlockList");
      const newBlock = new Block();
      const {projectId, blockName} = payload;
      newBlock.name = blockName;
      newBlock.id = createId("block").toString();
      newBlock.project_id = projectId;
      state.blockList.push(newBlock);
      store.commit('saveBlockList', state.blockList);
    },
    deleteBlock(state, payload:{blockId:string}){
      // 删除任务
      for(const task of state.taskList) {
        if(task.block_id === payload.blockId) {
          task.status = 0;
        }
      }
      // 删除模块
      store.commit("fetchBlockList");
      const delBlock = state.blockList.find(i => i.id === payload.blockId);
      if(delBlock) delBlock.status = 0;
      store.commit("saveBlockList",state.blockList);
       
    },
    modifyBlock(state, payload: Block) {
      const {id, name} = payload;
      const block = state.blockList.find(i => i.id === id);
      if(block) block.name = name;
      store.commit("saveBlockList", state.blockList);
    },
    updateCurrentProject(state, payload: Project) {
      state.currentProjectForDialog = clone(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;