import Vue from 'vue'
import Vuex from 'vuex'
import Task from '@/lib/Task'
import { RootState } from '@/custom'
import Project from '@/lib/Project'
import createId from '@/lib/createId'
import clone from '@/lib/clone'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    taskList: [],
    projectList: [],
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
    updateTask(state, task:Task) {
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
  },
  actions: {
  },
  modules: {
  }
})

export default store;