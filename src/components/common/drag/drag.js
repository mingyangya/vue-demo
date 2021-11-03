import props from './drag.props'
import DragController from "./DragController"

export default {
  functional: true,
  props,
  render (h, {children, props, data}) {
    return children.map(child => {
      if (!child.tag) {
        return child
      }

      const newData = Object.assign({}, data)

      newData.props = Object.assign({}, props)
      newData.props.child = child

      return h(DragController, newData)
    })
  }
}
