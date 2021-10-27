import DragController from './DragController'
import props from './drag.props'

export default {
  functional: true,
  props,
  render (h, {parent, props, data, children}) {
    return children.map((child) => {
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
