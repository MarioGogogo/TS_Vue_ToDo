<template>
  <div class="todo-page">
    <ul>
      <todo-item
        v-for="(item,index) 
      in list"
        :key="`todo-item-${index}`"
        :item="item"
        :index="index"
        :isEditIndex="isEditIndex"
        @on-save="handleSave"
        @on-edit="handleEdit"
        @on-close="handleClose"
        @on-setComplete="handleSetComplete"
      ></todo-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "../components/todo-item";
import { State, Mutation } from "vuex-class";

@Component({
  name: "TodoPage",
  components: {
    TodoItem
  }
})
export default class TodoPage extends Vue {
  @State("todoList") public list;
  public isEditIndex = -1;

  @Mutation("updateTodoList") public updateList;
  handleSave({ index, content }) {
    console.log(index, content);
    this.updateList({ index, content });
    this.handleClose();
  }
  handleEdit({ index }) {
    if (this.list[index].complete) {
      alert("已删除状态无法打开");
    } else {
      this.isEditIndex = index;
    }
  }
  handleClose() {
    this.isEditIndex = -1;
  }

  @Mutation("setTodoComplete") public setTodoComplete;
  handleSetComplete({ index }) {
    this.setTodoComplete({ index });
  }
}
</script>
