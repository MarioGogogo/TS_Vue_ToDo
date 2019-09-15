import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Divider } from 'ant-design-vue';

// 定义接口
interface Item {
  text: string;
  complete: boolean;
}

@Component({
  name: 'TodoItem',
})
export default class TodoItem extends Vue {
  @Prop(Object) public item!: Item;
  @Prop(Number) public index!: number; // 下标

  @Prop(Number) public isEditIndex!: number; // 正在编辑的下标
  public editContent = '';

  @Watch('isEditIndex')
  public editChange(index) {
    if (this.index === index) {
      this.editContent = this.item.text;
    } else {
      this.editContent = '';
    }
  }

  public save() {
    this.$emit('on-save', {
      index: this.index,
      content: this.editContent,
    });
  }

  public edit() {
    this.$emit('on-edit', {
      index: this.index,
    });
  }

  public close() {
    this.$emit('on-close', {
      index: this.index,
    });
  }

  protected render() {
    return (
      <li>
        {this.isEditIndex === this.index ? (
          <div>
            <a-input v-model={this.editContent} />
            <a-icon type='check' nativeOn-click={this.save} />
            <a-icon type='close' nativeOn-click={this.close} />
          </div>
        ) : (
          <div>
            <span>{this.item.text}</span>
            <a-icon type='edit' nativeOn-click={this.edit} />
          </div>
        )}
      </li>
    );
  }
}
