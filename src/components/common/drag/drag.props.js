
import VueTypes from 'vue-types'

export default {
  /**
   * 拖拽元素
   */
  drag: HTMLElement,
  /**
   * 是否使用touch
   */
  touch: VueTypes.bool.def(true),
  /**
   * 是否自动移动
   */
  auto: VueTypes.bool.def(false),
  /**
   * 移动结束后是否执行惯性移动
   */
  inertia: VueTypes.bool.def(false),
  /**
   * 移动范围
   * @param {Number} xmin x轴最小值
   * @param {Number} xmax x轴最大值
   * @param {Number} ymin y轴最小值
   * @param {Number} ymin y轴最大值
   */
  range: VueTypes.shape({
    xmin: Number,
    xmax: Number,
    ymin: Number,
    ymax: Number
  }).def({}).loose
}