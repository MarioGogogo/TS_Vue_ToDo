import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import { Divider } from 'ant-design-vue';
import '../css/item.less';
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

  @Emit('on-save')
  public save(event) {
    // 如果前面又事件函数 则在 最后一个参数接受 比如 get(index,state,event)
    event.stopPropagation();
    console.log('event', event);
    return {
      index: this.index,
      content: this.editContent,
    };
  }

  public edit(event) {
    event.stopPropagation(); // 阻止冒泡
    this.$emit('on-edit', {
      index: this.index,
    });
  }

  public close() {
    this.$emit('on-close', {
      index: this.index,
    });
  }

  public setComplete() {
    // 告诉父组件完成的是第几条
    this.$emit('on-setComplete', {
      index: this.index,
    });
  }

  protected render() {
    return (
      <li class='item-wrap'>
        {this.isEditIndex === this.index ? (
          <div>
            <a-input v-model={this.editContent} />
            <a-icon type='check' nativeOn-click={this.save} />
            <a-icon type='close' nativeOn-click={this.close} />
          </div>
        ) : (
          <div>
            <span on-click={this.setComplete} style={this.item.complete ? { textDecoration: 'line-through' } : null}>
              {this.item.text}
            </span>
            <a-icon type='edit' nativeOn-click={this.edit} />
          </div>
        )}
      </li>
    );
  }
}
