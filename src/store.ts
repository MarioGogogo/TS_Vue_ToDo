import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        text: '吃饭',
        complete: false,
      },
      {
        text: '睡觉',
        complete: false,
      },
      {
        text: '打豆豆',
        complete: false,
      },
    ],
  },
  mutations: {
    updateTodoList(state, { index, content }) {
      state.todoList[index].text = content;
    },
    setTodoComplete(state, { index }) {
      state.todoList[index].complete = !state.todoList[index].complete;
    },
  },
  actions: {},
});
