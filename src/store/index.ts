import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import Task from '@/lib/Task'
import { RootState } from '@/custom'
import Project from '@/lib/Project'

// let customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todayTaskList: [],
    projectList: [],
    blockList: []
  } as RootState,
  mutations: {
    fetchTodayTaskList(state) {
      const tasks = JSON.parse(localStorage.getItem("task_list") || '[]');
      state.todayTaskList =  tasks.filter((task:Task)=>{
        if(task.dueDate === null) {
          return true;
        }

        if(dayjs(task.dueDate).isSame(dayjs(new Date()),'day') && task.status === 1) {
          return true;
        }

        return false;
      });
    },

    addTask(state, task:Task) {
      const tasks =  JSON.parse(localStorage.getItem("task_list") || "[]");
      tasks.push(task);
      localStorage.setItem("task_list",JSON.stringify(tasks));
      store.commit("fetchTodayTaskList");
    },

    deleteTask(state, id:string) {
      const tasks = JSON.parse(localStorage.getItem("task_list") || '[]');
      if(tasks === []) {
        throw new Error('empty task list');
      }
      const index = tasks.findIndex((task:Task)=>{
        return task.id === id;
      })
      tasks.splice(index, 1);
      localStorage.setItem("task_list",JSON.stringify(tasks));
      store.commit("fetchTodayTaskList");
    },

    finishTask(state, id: string) {
      const tasks = JSON.parse(localStorage.getItem("task_list") || '[]');
      if(tasks === []) {
        throw new Error('empty task list');
      }
      const task = tasks.find((task:Task)=>{
        return task.id === id;
      });
      task.status = 2;
      localStorage.setItem("task_list",JSON.stringify(tasks));
      store.commit("fetchTodayTaskList");
    },

    fetchProjectList(state) {
      const projects = JSON.parse(localStorage.getItem("project_list") || '[]');
      state.projectList =  projects.filter((project:Project)=>{
        return project.status === 1;
      });
    },

    addNewProjct(state, project:Project) {
      const projects = JSON.parse(localStorage.getItem("project_list") || '[]');
      projects.push(project);
      localStorage.setItem("project_list",JSON.stringify(projects));
      store.commit("fetchProjectList");
    },
    deleteProject(state, id:string) {
       // 删除任务
       console.log("id"+id)
       const project = state.projectList.find((item)=>{
         return item.id === id;
       });
       console.log("project:" + project)
       
       const tasks = JSON.parse(localStorage.getItem("task_list") || '[]') as Task[];
       const newTasks = tasks.filter((task)=>{
         console.log("task.project:" + task.project)
         console.log("project?.name" + project?.name)
         return task.project !== project?.name;
       })
 
       console.log(newTasks);
       localStorage.setItem("task_list",JSON.stringify(newTasks));
       store.commit("fetchTodayTaskList");

      // 删除project
      store.commit("fetchProjectList");
      const projectIndex = state.projectList.findIndex(i => i.id === id);
      state.projectList.splice(projectIndex, 1);
      localStorage.setItem("project_list",JSON.stringify(state.projectList));

    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;