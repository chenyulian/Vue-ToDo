import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import Task from '@/lib/Task'
import { RootState } from '@/custom'

// let customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todayTaskList: []
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
      // state.todayTaskList.push(task);
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;