import VueTypes from 'vue-types'

export default {
  /**
   * 是否为 scrollbar
   */
  scroll: VueTypes.bool.def(false),
  /**
   * 是否使用 touch 事件
   */
  touch: VueTypes.bool.def(false),
  /**
   * 是否自动移动
   */
  auto: VueTypes.bool.def(false),
  /**
   * 拖拽结束后是否执行惯性移动
   */
  inertia: VueTypes.bool.def(false),
  /**
   * 设置则自动执行移动的范围
   * @param {Number} xmin  x 轴的最小值
   * @param {Number} xmax  x 轴的最大值
   * @param {Number} ymin  y 轴的最小值
   * @param {Number} ymax  y 轴的最大值
   */
  range: VueTypes.shape({
    xmin: Number,
    xmax: Number,
    ymin: Number,
    ymax: Number
  }).def({}).loose
}
