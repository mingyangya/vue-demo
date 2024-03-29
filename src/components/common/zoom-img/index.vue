<template>
  <div class="zoom-img-container">
    <div class="img">
      <img :src="src || defaultImg" :alt="alt" :title="title" :style="style" @onload="onload" @click="clickImg">
    </div>

    <div :class="['zoom-img-dialog', {mobile: isMobile}]" v-if="show">
      <transition name="fade">
        <div modal-mask class="modal-mask" @click="close">
        </div>
      </transition>
      <transition :name="transition">
        <div class="modal-main" :style="mainStyle">
          <div class="close">
            <slot name="close"><span class="close" @click="close"></span></slot>
          </div>
          
          <div class="modal-header" ref="modalHeaderEle"></div>
          <div class="modal-content">
            <div class="img-box" ref="imgBoxEle" :style="zoomArea">
              <div class="img-wrap" ref="imgWrapEle" :style="imgWrapStyle">
                <img ref="imgEle" :src="src || defaultImg" :style="imgStyle" alt="zoom-img">
              </div>
            </div>
          </div>

          <div class="modal-footer" ref="modalFooterEle">
            <slot name="footer">
              <div class="tool-group">
                <span class="zoom-out" @click="zoomOut"></span>
                <span class="zoom-text">{{ratio}}%</span>
                <span class="zoom-in" @click="zoomIn"></span>
              </div>
            </slot>
          </div>
        </div>
      </transition>
    </div>

  </div> 
</template>
<script>
export default {
  data () {
    return {
      defaultImg: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEVHcEyC+tLSAAAAAXRSTlMAQObYZgAAAApJREFUeNpjYQAAAAoABUouQOkAAAAASUVORK5CYII=`, // 透明图
      show: false,
      initRatio: 100, // 初始缩放比
      ratio: 100, // 比列
      add: 10, // 增量
      min: 10, // 最小缩放比
      max: this.option.x || 200, // 最大缩放比
      adapte: true, // 适应pc和mobile切换
      timer: null,
      bodyEl: document.body,
      top: 0,
      isMove: false,
      isTouch: false,
      startPoint: {},
      endPoint: {},
      x: 0,
      y: 0,
      boundary: {}, // 边界
      env: '',
      opacity: 0,
      headerHeight: 0,
      footerHeight: 0
    }
  },
  props: {
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 0
    },
    alt: {
      type: String,
      default: ''
    },
    title: String,
    transition: {
      type: String,
      default () {
        return 'fade'
      }
    },
    src: String,
    // 图片区域
    zoomArea: Object,
    option: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    style () {
      let style = {}
      const w = this.width
      const h = this.height

      if (w) {
        if (String(w).match(/^[\d]+$/)) {
          style.width = `${w}px`
        } else if (String(w).match(/^[\d]+(vw|vh|px|em|%)$/)) {
          style.width = w
        }
      }

      if (h) {
        if (String(h).match(/^[\d]+$/)) {
          style.height = `${h}px`
        } else if (String(h).match(/^[\d]+(vw|vh|px|em|%)$/)) {
          style.height = h
        }
      }
      return style
    },
    imgWrapStyle () {
      return {
        transform: `scale(${this.ratio / 100})`,
      }
    },
    imgStyle () {
      // transform: translate 于ie11测试有抖动现象，用margin替代
      return this.isIE() ? {margin: `${this.y.toFixed(2)}px 0 0 ${this.x.toFixed(2)}px`} : {transform: `translate(${this.x.toFixed(2)}px, ${this.y.toFixed(2)}px)`}
    },
    mainStyle () {
      return {
        'opacity': this.opacity, 
        'padding': `${this.headerHeight}px 0 ${this.footerHeight}px`
      }
    },
    offsetRatio () {
      // 图片元素位置相对于父元素的偏移比例
      return {
        x: this.x / this.wrapWidth,
        y: this.y / this.wrapHeight
      }
    }
  },
  methods: {
    clickImg () {
      this.open()
    },
    open () {
      this.show = true
      this.init()
      this.$emit('open', event)
    },

    close () {
      this.handleEvent(false)
      this.show = false
      this.resetData()
      this.$emit('close')
    },

    resetData () {
      this.ratio = this.initRatio
      this.x = 0
      this.y = 0
      this.startPoint = {}
      this.endPoint = {}
      this.boundary = {}
      this.env = ''
      this.opacity = 0
    },
    onload () {
      this.$emit('onload')
    },
    mousewheelEvent (add = true) {
      // 支持ie11+ 、edge、chorme , 不支持safari 、firefox
      const _mousewheelEvent = 'mousewheel'
      add ? this.$refs.imgBoxEle.addEventListener(_mousewheelEvent, this.mouseWheel) : this.$refs.imgBoxEle.removeEventListener(_mousewheelEvent, this.mouseWheel)
    },

    init () {
      this.$nextTick(() => {
        this.footerHeight = this.$refs.modalFooterEle.clientHeight || 0
        this.headerHeight = this.$refs.modalHeaderEle.clientHeight || 0

        this.handleEvent(true)

        //初始化图片位置
        if (this.isIE()) {
          // IE img 一直触发onload
          this.$refs.imgEle.onload = () => {
            this.initPostion()
          }
        } else {
          if (this.$refs.imgEle && this.$refs.imgEle.complete) {
            // 已onload的图片不触发onload
            this.initPostion()
          } else {
            this.$refs.imgEle.onload = () => {
              this.initPostion()
            }
          }
        }

        // mobile和pc切换
        if (this.adapte) {
          this.env = this.isMobile() ? 'mobile' : 'pc'
          // 拖动区域发生变化
          this.$refs.imgWrapEle.onresize = () => {
            // pc 和 mobile 相互切换
            if((this.isMobile() && this.env === 'pc') || (!this.isMobile() && this.env === 'mobile')) {
              this.setPosition()
              this.env = this.isMobile() ? 'mobile' : 'pc'
            }
          }
        }

      })
    },

    handleEvent (add = true) {
      const eventGroup = [{name: 'mousedown', e: this.mousedown}, {name: 'mousemove', e: this.mousemove}, {name: 'mouseup', e: this.mouseup}, {name: 'mouseleave', e: this.mouseleave}, {name: 'touchstart', e: this.touchstart}, {name: 'touchmove', e: this.touchmove}, {name: 'touchend', e: this.touchend}]
      const eventKey = add ? 'addEventListener' : 'removeEventListener'
      this.$nextTick(() => {
        // 监听 eventGroup中的事件，控制图片的移动
        eventGroup.forEach(item => {
          this.$refs.imgWrapEle[eventKey](item.name, item.e)
        })

        // 监听滚轮事件
        this.mousewheelEvent(add)


      })
    },
    // @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousewheel_event
    mouseWheel (e) {
      this.pauseEvent(e)
      this.throttle(() => {
        const wheelDelta = e.wheelDelta ? -e.wheelDelta : e.deltaY * 1.2
        if (wheelDelta % 120 === 0) {
          wheelDelta < 0 ? this.zoomIn() : this.zoomOut()
        }
      })()
    },

    zoomIn () {
      const ratio = this.ratio + this.add
      const max = ratio > this.max ? this.max : ratio
      this.ratio = max
    },

    zoomOut () {
      const ratio = this.ratio - this.add
      const min = ratio < this.min ? this.min : ratio
      this.ratio = min
    },
    mousedown (e) {
      this.pauseEvent(e)
      this.isMove = true
      this.startPoint = {x: e.x, y: e.y}
    },

    mousemove (e) {
      this.pauseEvent(e)
      if (this.isMove) {
        this.throttle(() => {
          this.endPoint = {x: e.x, y: e.y}
          const dx = (this.startPoint.x - this.endPoint.x)
          const dy = (this.startPoint.y - this.endPoint.y)
          this.startPoint = {x: this.endPoint.x, y: this.endPoint.y}
          this.x = this.x - dx
          this.y = this.y - dy
        })()
      }
    },

    mouseup (e) {
      this.pauseEvent(e)
      if (this.isMove) {
        this.endPoint = {x: e.x, y: e.y}
        const dx = (this.startPoint.x - this.endPoint.x)
        const dy = (this.startPoint.y - this.endPoint.y)
        this.x = this.x - dx 
        this.y = this.y - dy
        this.isMove = false
      }
    },

    mouseleave (e) {
      this.pauseEvent(e)
      if (this.isMove) {
        this.endPoint = {x: e.x, y: e.y}
        const dx = (this.startPoint.x - this.endPoint.x)
        const dy = (this.startPoint.y - this.endPoint.y)
        this.x = this.x - dx 
        this.y = this.y - dy
      }
      this.isMove = false
    },

    touchstart (e) {
      this.pauseEvent(e)
      const touches = e.touches
      this.isTouch = true
      this.startPoint = {x: touches[0].clientX, y: touches[0].clientY}
    },

    touchmove (e) {
      this.pauseEvent(e)
      if (this.isTouch) {
        this.throttle(() => {
          const touches = e.touches
          this.endPoint = {x: touches[0].clientX, y: touches[0].clientY}
          
          const dx = (this.startPoint.x - this.endPoint.x)
          const dy = (this.startPoint.y - this.endPoint.y)
          const offsetX = this.x - dx
          const offsetY = this.y - dy

          // x 坐标
          if (offsetX > this.boundary.right && offsetX > 0) {
            // 右边界
            this.x = this.boundary.right
          } else if (offsetX <= this.boundary.left && offsetX < 0) {
            // 左边界
            this.x = this.boundary.left
          } else {
            this.startPoint.x = this.endPoint.x
            this.x = offsetX
          }

          // y 坐标
          if (offsetY > this.boundary.bottom) {
            // 下边界
            this.y = this.boundary.bottom
          } else if (offsetY <= this.boundary.top) {
             // 上边界
            this.y = this.boundary.top
          }else {
            this.startPoint.y = this.endPoint.y
            this.y = offsetY
          }

        })()
      }
    },

    touchend (e) {
      this.pauseEvent(e)
      if (this.isTouch) {
        const touches = e.changedTouches

        this.endPoint = {x: touches[0].clientX, y: touches[0].clientY}
        const dx = (this.startPoint.x - this.endPoint.x)
        const dy = (this.startPoint.y - this.endPoint.y)

        const offsetX = this.x - dx
        const offsetY = this.y - dy

        // x 坐标
        if (offsetX > this.boundary.right) {
          // 右边界
          this.x = this.boundary.right
        } else if (offsetX <= this.boundary.left) {
          // 左边界
          this.x = this.boundary.left
        } else {
          this.x = offsetX
        }

        // y 坐标
        if (offsetY > this.boundary.bottom) {
          // 下边界
          this.y = this.boundary.bottom
        } else if (offsetY <= this.boundary.top) {
          // 上边界
          this.y = this.boundary.top
        } else {
          this.y = offsetY
        }

        this.isTouch = false
      }
    },
    setPosition () {
      this.$nextTick (() => {
        const width = parseFloat(this.getStyle(this.$refs.imgEle, 'width'))
        const height = parseFloat(this.getStyle(this.$refs.imgEle, 'height'))
        const offsetRatio = Object.assign({}, this.offsetRatio)

        const wrapWidth = parseFloat(this.getStyle(this.$refs.imgEle.parentElement, 'width'))
        const wrapHeight = parseFloat(this.getStyle(this.$refs.imgEle.parentElement, 'height'))
        
        this.initBoundary({wrapWidth, wrapHeight, width, height})

        this.x = offsetRatio.x * wrapWidth
        this.y = offsetRatio.y * wrapHeight

      })
    },

    /**
     * 获取元素的样式
     * notice： getComputedStyle获取的为resolved values（解析值），对于一些旧属性（包括宽度和高度），它是使用值used value（应用值）
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
     * @param {Element} ele dom元素
     * @param {String} name 属性名
     * @param {String} pseudoElt 伪元素属性名
     */
    getStyle (ele, name, pseudoElt = null) {
      return getComputedStyle(ele, pseudoElt)[name];
    },
    /**
     * 初始化图片位置，默认水平、垂直居中
     */
    initPostion () {
      this.$nextTick (() => {
        const width = parseFloat(this.getStyle(this.$refs.imgEle, 'width'))
        const height = parseFloat(this.getStyle(this.$refs.imgEle, 'height'))

        const wrapWidth = parseFloat(this.getStyle(this.$refs.imgWrapEle, 'width'))
        const wrapHeight = parseFloat(this.getStyle(this.$refs.imgEle.parentElement, 'height'))
        this.wrapWidth = wrapWidth
        this.wrapHeight = wrapHeight

        this.initBoundary({wrapWidth, wrapHeight, width, height})
        this.x = (wrapWidth - width) / 2
        this.y = (wrapHeight - height) / 2
        this.opacity = 1
      })
    },
    /**
     * 初始化触摸区域边界
     */
    initBoundary ({wrapWidth, wrapHeight, width, height}) {
      // 偏移量，防止元素完全移出可视区域
      const offset = {
        x: 10,
        y: 10,
      }
      this.boundary.top = -height + offset.y
      this.boundary.right = wrapWidth - offset.x
      this.boundary.bottom = wrapHeight - offset.y
      this.boundary.left =  -width + offset.x
    },
    isInApp: function () {
      return !!navigator.userAgent.match(/org\.geekbang\.GeekTime/i)
    },
    isMobile () {
      const ua = navigator.userAgent.toLowerCase()
      // APP 内展示移动端版本
      return this.isInApp() || (/iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(ua) && !/ipad/i.test(ua)) || document.body.clientWidth <= 768
    },
    // 检查当前是否是 ie 浏览器（Edge 除外）
    isIE () {
      const ua = navigator.userAgent.toLowerCase()
      return ((ua.indexOf('trident') > -1 && ua.indexOf('rv') > -1) || ua.match(/msie/i))
    },
    /**
     * 阻止默认事件 和 冒泡行为
     */
    pauseEvent (e){
      if(e.stopPropagation) e.stopPropagation()
      if(e.preventDefault) e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      return false
    },
    /**
     * 节流函数
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event
     * @param {Function} callback 执行函数
     * @param {Number}   time     间隔时间
     */
    throttle (callback) {
      let ticking = false
      return function () {
        if (!ticking) {
          ticking = true
          requestAnimationFrame(function () {
            callback && callback()
            ticking = false
          })
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.img {
  width: 100%;
  >img {
    cursor: zoom-in;
  }
}
.zoom-img-dialog {
  box-sizing: border-box;
  position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 999;
  width: 100%;
  height: 100%;
  margin: auto;
  -webkit-tap-highlight-color: transparent;
}
.modal-mask {
  position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 1;
  width: 100%;
  height: 100%;
  margin: auto;
  background: rgba(0, 0, 0, .6);
  pointer-events: all;
}
.modal-header {
  box-sizing: border-box;
  position: absolute; top: 0; left: 0; z-index: 1;
  display: flex;
  width: 100%;
  min-height: 20px;
  align-items: center;
}

.modal-main {
  box-sizing: border-box;
  position: relative; top:50%; z-index: 2;
  transform: translate(0, -50%);
  min-width: 180px;
  width: 80%;
  height: 80%;
  margin: 0 auto 0;
  padding: 30px 20px 20px;
  border-radius: 4px;
  background: #fff;
}

.close {
  position: absolute; right: 5px; top: 5px; z-index: 2;
  cursor: pointer;
  >span {
    display: block;
    width: 20px;
    height: 20px;
    background: url(./img/i_close.png) no-repeat center / 10px;
    &:hover {
      background-image: url(./img/i_close_hover.png);
    }
  }
}
.mobile {
  .close {
    &:hover {
      background-image: url(./img/i_close.png);
    }
  }
}

.modal-content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
img {
  display: block;
}
.img-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
}

.img-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // pointer-events: stroke;
  > img {
    min-width: 100px;
    min-height: 100px;
    width: 80%;
    height: auto;
    transform-origin: center;
    cursor: move;
    &.init {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }
}
.modal-footer {
  box-sizing: border-box;
  position: absolute; bottom: 0; left: 0; z-index: 1;
  display: flex;
  width: 100%;
  min-height: 0;
  align-items: center;
}
.tool-group {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0 20px 0;
}
.zoom-in {
  width: 26px;
  height: 26px;
  background: url(./img/zoom-in.png) no-repeat center/12px 12px rgba(92,134,255,.1);
  border-radius: 4px;
  cursor: pointer;
}
.zoom-text {
  width: 82px;
  line-height: 14px;
  font-size: 14px; font-weight: 400;
  text-align: center;
  color: #4C4C4C;
}
.zoom-out {
  width: 26px;
  height: 26px;
  background: url(./img/zoom-out.png) no-repeat center/12px 2px rgba(92,134,255,.1);
  border-radius: 4px;
  cursor: pointer;
}
</style>