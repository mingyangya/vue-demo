/**
 * 拖拽位移
 * @param {Object}    option             配置
 * @param {Element}   option.$drag       拖拽的 dom
 * @param {Boolean}  [option.scroll]     是否是滚动条的内容
 * @param {Array}    [option.range]      移动的区间
 * @param {Boolean}  [option.touch]      是否使用 touch
 * @param {Boolean}  [option.auto]       是否自动移动
 * @param {Boolean}  [option.inertia]    是否使用惯性移动
 * @param {Function} [option.syncStart]  同步拖拽开始
 * @param {Function} [option.syncMove]   同步拖拽中
 * @param {Function} [option.syncEnd]    同步拖拽结束
 */
class Drag {
  constructor (option = {}) {
    const {scroll, touch, inertia, range} = option
    this.$drag = option.$drag
    this.isScroll = scroll || false
    this.isTouch = touch || false
    this.isInertia = inertia || false

    this.handleEmitStart = option.syncStart || function () {}
    this.handleEmitMove = option.syncMove || function () {}
    this.handleEmitEnd = option.syncEnd || function () {}

    this.useAutoMove = option.auto

    this.setRange(range)

    this.startTop = 0
    this.top = 0
    this.startLeft = 0
    this.left = 0

    this.actionMoving = false
    this.inertiaMoving = false
    this.startX = 0
    this.startY = 0
    this.moveX = 0
    this.moveY = 0
    this.moveStartTime = 0
    this.lastMoveTime = 0

    this.handler = {
      start: touch ? 'touchstart' : 'mousedown',
      move: touch ? 'touchmove' : 'mousemove',
      end: touch ? 'touchend' : 'mouseup'
    }

    this.handlDragStart = this.handlDragStart.bind(this)
    this.handlDragMove = this.handlDragMove.bind(this)
    this.handlDragEnd = this.handlDragEnd.bind(this)
    this.handleInertiaMove = this.handleInertiaMove.bind(this)

    this.init()
  }

  init () {
    this.$drag.addEventListener(this.handler.start, this.handlDragStart)
  }

  setRange (range) {
    this.useRange = range.xmin !== undefined && range.xmax !== undefined || range.ymin !== undefined && range.ymax !== undefined

    this.minLeft = this.useRange && range.xmin
    this.maxLeft = this.useRange && range.xmax
    this.minTop = this.useRange && range.ymin
    this.maxTop = this.useRange && range.ymax
  }

  handlDragStart (ev) {
    const event = this.isTouch ? ev.touches[0] : ev

    ev.stopImmediatePropagation()

    this.startX = event.pageX
    this.startY = event.pageY
    this.moveX = event.pageX
    this.moveY = event.pageY
    this.moveStartTime = 0
    this.lastMoveTime = 0
    this.actionMoving = false
    this.inertiaMoving = false

    if (this.useAutoMove) {
      this.startTop = this.isScroll ? -this.$drag.scrollTop : parseInt(this.$drag.style.top) | 0
      this.startLeft = parseInt(this.$drag.style.left) | 0
    }

    document.addEventListener(this.handler.move, this.handlDragMove)
    document.addEventListener(this.handler.end, this.handlDragEnd)

    this.handleEmitStart(event.pageX, event.pageY, ev)
  }

  handlDragMove (ev) {
    if (this.actionMoving) {
      return
    }

    this.actionMoving = true

    requestAnimationFrame(() => {
      const event = this.isTouch ? ev.touches[0] : ev
      const moveX = event.pageX - this.startX
      const moveY = event.pageY - this.startY
      const time = Date.now()

      this.moveX = event.pageX
      this.moveY = event.pageY

      if (!this.moveStartTime || time - this.lastMoveTime > 50) {
        this.moveStartTime = time
      }

      this.lastMoveTime = time

      if (this.useAutoMove) {
        let left = this.startLeft + moveX
        let top = this.startTop + moveY

        if (this.isScroll) {
          top = top > 0 ? 0 : Math.max(top, this.minTop)
        } else if (this.useRange) {
          top = top < 0 ? 0 : Math.min(top, this.maxTop)
          left = left < 0 ? 0 : Math.min(left, this.maxLeft)
        }

        this.left = left
        this.top = top
      }

      this.handleEmitMove(moveX, moveY, this.left, this.top, ev)

      this.actionMoving = false
    })
  }

  handlDragEnd () {
    document.removeEventListener(this.handler.move, this.handlDragMove)
    document.removeEventListener(this.handler.end, this.handlDragEnd)

    const time = Date.now()
    const moveTime = time - this.moveStartTime

    // 判断是不是惯性滑动
    const inertia = this.isInertia && time - this.lastMoveTime < 50

    if (inertia) {
      this.inertiaMoving = true
      this.animationSpeed = ((this.moveY - this.startY) / moveTime) * 16
      this.handleInertiaMove()
    } else {
      this.handleEmitEnd()
    }
  }

  /**
   * 惯性滑动动画
   */
  handleInertiaMove () {
    this.inertiaMoving && requestAnimationFrame(this.handleInertiaMove)

    const f = Math.min(Math.abs(this.animationSpeed) / 12, 0.5)

    if (this.animationSpeed > 0.2) {
      this.animationSpeed -= f
    } else if (this.animationSpeed < -0.2) {
      this.animationSpeed += f
    } else {
      this.animationSpeed = 0
      this.inertiaMoving = false
      this.handleEmitEnd()
      return
    }

    this.moveY += this.animationSpeed
    this.top += this.animationSpeed

    this.handleEmitMove(this.moveX, this.moveY, this.left, this.top)

    // 超出位移范围后停止惯性滑动，更新返回的动画时间
    if (this.top < this.minTop || this.top > this.maxTop) {
      this.animationSpeed = 0
    }
  }

  destroy () {
    this.$drag.removeEventListener(this.handler.start, this.handlDragStart)
  }
}

export default Drag

