import VueTypes from 'vue-types'
import props from './drag.props'
import DragClass from './drag.class'

export default {
  props: Object.assign({
    child: VueTypes.object.isRequired
  }, props),
  data () {
    return {
      dragClass: null
    }
  },
  mounted () {
    this.dragClass = new DragClass({
      $drag: this.$el.querySelector('[drag]') || this.$el,
      $dragWrap: this.$el,
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
      },
      syncClick: () => {
        this.$emit('click-event')
      }
    })
  },
  render () {
    return this.child
  },
  beforeDestroy () {
    this.dragClass && this.dragClass.destroy()
  }
}
