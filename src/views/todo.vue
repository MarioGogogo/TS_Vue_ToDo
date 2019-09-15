<template>
  <div class="todo-page">
    <ul>
      <todo-item
        v-for="(item,index) 
      in list"
        v-bind="index"
        :item="item"
        :index="index"
        :isEditIndex="isEditIndex"
        @on-save="handleSave"
        @on-edit="handleEdit"
        @on-close="handleClose"
      ></todo-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "../components/todo-item";

@Component({
  name: "TodoPage",
  components: {
    TodoItem
  }
})
export default class TodoPage extends Vue {
  public isEditIndex = -1;
  public list = [
    {
      text: "吃饭",
      complete: true
    },
    {
      text: "睡觉",
      complete: true
    },
    {
      text: "打豆豆",
      complete: false
    }
  ];

  handleSave({ index, content }) {
    console.log(index, content);
    this.list[index].text = content;
    this.isEditIndex = -1;
  }
  handleEdit({ index }) {
    this.isEditIndex = index;
  }
  handleClose({ index }) {
    this.isEditIndex = -1;
  }
}
</script>
