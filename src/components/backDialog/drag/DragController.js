import VueTypes from 'vue-types'
import props from './drag.props'
import DragClass from './drag.class'

export default {
  name: 'gkui-drag-controller',
  props: Object.assign({
    /**
     * 需要 render 的 dom
     * drag.controller 由 高阶函数 Drag 调用渲染
     */
    child: VueTypes.object.isRequired
  }, props),
  data () {
    return {
      dragClass: null
    }
  },
  watch: {
    range (range) {
      this.dragClass.setRange(range)
    }
  },
  mounted () {
    this.dragClass = new DragClass({
      $drag: this.$el,
      scroll: this.scroll,
      touch: this.touch,
      auto: this.auto,
      range: this.range,
      inertia: this.inertia,
      syncStart: (x, y, ev) => {
        this.$emit('start', x, y, ev)
      },
      syncMove: (x, y, left, top, ev) => {
        this.$emit('move', x, y, left, top, ev)
      },
      syncEnd: () => {
        this.$emit('end')
      }
    })
  },
  beforeDestroy () {
    this.dragClass && this.dragClass.destroy()
  },
  render (h) {
    return this.child
  }
}
