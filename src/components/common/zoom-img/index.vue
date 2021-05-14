<template>
  <div class="zoom-img-dialog" v-if="show">
    <transition name="fade">
      <div modal-mask class="modal-mask">
      </div>
    </transition>
    <transition :name="transition">
      <div class="modal-main">
        <div class="modal-head"></div>
        <div class="modal-content">
          <div class="img-area" :style="zoomArea">
            <div class="img-box" ref="imgBoxEle">
              <div class="img-wrap" ref="imgWrapEle" :style="imgWrapStyle">
                <img ref="imgEle" :src="src || defaultImg" :style="imgStyle" alt="zoom-img">
              </div>
            </div>
          </div>
        </div>

        <slot name="footer">
          <div class="tool-group">
            <span class="zoom-out" @click="zoomOut"></span>
            <span class="zoom-text">{{ratio}}%</span>
            <span class="zoom-in" @click="zoomIn"></span>
          </div>

        </slot>
        <slot name="extra" >
          <span @click="reset50">{{this.x}}-{{this.y}}</span>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'zoon-img',
  data () {
    return {
      show: true,
      initRatio: 100, // 初始缩放比
      ratio: 100, // 每次缩放的比列
      add: 10, // 增量
      min: 10, // 最小缩放比
      max: this.option.x || 200, // 最大缩放比
      defaultImg: require('./img/demo.png'),
      timer: null,
      bodyEl: document.body,
      top: 0,
      isMove: false,
      startPoint: {},
      endPoint: {},
      x: 0,
      y: 0
    }
  },
  props: {
    transition: {
      type: String,
      default () {
        return 'fade'
      }
    },
    src: String,
    zoomArea: {
      // 图片区域
      type: Object,
      default () {
        return {
          width: '100%',
          height: '420px'
        }
      }
    },
    option: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    imgBoxEle () {
      return this.$refs.imgBoxEle
    },
    imgWrapEle () {
      return this.$refs.imgWrapEle
    },
    imgEle () {
      return this.$refs.imgEle
    },
    imgWrapStyle () {
      return {
        transform: `scale(${this.ratio / 100})`,
      }
    },
    imgStyle () {
      return {
        transform: `translate(${this.x}px, ${this.y}px)`,
      }
    }
  },
  beforeDestroy () {
    this.handleEvent(false)
    this.resetData()
  },
  created () {
    this.handleEvent(true)
  },
  methods: {
    open () {
      this.handleEvent(true)
      this.show = true
      this.init = true
    },

    close () {
      this.handleEvent(false)
      this.show = false
      this.resetData()
    },

    resetData () {
      this.init = true
      this.ratio = this.initRatio
    },

    mousewheelEvent (add = true) {
       // FF doesn't recognize mousewheel as of FF3.x
      const _mousewheelEvent = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel'
      add ? this.imgBoxEle.addEventListener(_mousewheelEvent, this.mouseWheel) : this.imgBoxEle.removeEventListener(_mousewheelEvent, this.mouseWheel)
    },

    handleEvent (add = true) {
      const eventGroup = [{name: 'mousedown', e: this.mousedown}, {name: 'mousemove', e: this.mousemove}, {name: 'mouseup', e: this.mouseup}, {name: 'mouseleave', e: this.mouseleave}]
      const eventKey = add ? 'addEventListener' : 'removeEventListener'
      this.$nextTick(() => {
        // 监听 eventGroup中的事件，控制图片的移动
        eventGroup.forEach(item => {
          this.imgWrapEle[eventKey](item.name, item.e)
        })

        // 初始化图片位置，默认水平、垂直居中
        this.imgEle.onload = () => {
          this.initPostion()
        }

        // 监听滚轮事件
        this.mousewheelEvent(add)
      })
    },

    mouseWheel (e) {
      this.pauseEvent(e)
      // todo 待完善
      // @see https://segmentfault.com/a/1190000017390159?utm_source=tag-newest
      this.throttle(() => {
        const delta = e.detail ? e.detail * (-120) : e.wheelDelta
        if (delta % 120 === 0) {
          delta > 0 ? this.zoomIn() : this.zoomOut()
        } else {
          // console.log(delta, e)
        }
      })
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
      console.log('up')
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
      console.log('leave')
      if (this.isMove) {
        this.endPoint = {x: e.x, y: e.y}
        const dx = (this.startPoint.x - this.endPoint.x)
        const dy = (this.startPoint.y - this.endPoint.y)
        this.x = this.x - dx 
        this.y = this.y - dy
      }
      this.isMove = false
    },

    getStyle (ele, style) {
      // 获取元素样式
      return ele.currentStyle ? ele.currentStyle[style] : window.getComputedStyle(ele, null)[style];
    },

    initPostion () {
      this.$nextTick (() => {
        const width = parseFloat(this.getStyle(this.imgEle, 'width'))
        const height = parseFloat(this.getStyle(this.imgEle, 'height'))
        
        const wrapWidth = parseFloat(this.getStyle(this.imgEle.parentElement, 'width'))
        const wrapHeight = parseFloat(this.getStyle(this.imgEle.parentElement, 'height'))

        this.x = (wrapWidth - width) / 2
        this.y = (wrapHeight - height) / 2
      })
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
          window.requestAnimationFrame(function () {
            console.log('sss')
            callback && callback()
            ticking = false
          })
        }
      }
    },
    reset50 () {
      this.ratio = 50
    }
  }
}
</script>
<style lang="scss" scoped>
.zoom-img-dialog {
  position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 999;
  width: 100%;
  height: 100%;
  margin: auto;
}
.modal-mask {
  position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 1;
  width: 100%;
  height: 100%;
  margin: auto;
  background: rgba(0, 0, 0, .6);
  pointer-events: all;
}
.modal-main {
  box-sizing: border-box;
  position: relative; top:50%; z-index: 2;
  transform: translate(0, -50%);
  // width: 100%;
  min-width: 180px;
  width: 80%;
  margin: 0 auto 0;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
}
.main-content {
  box-sizing: border-box;
  width: 100%;
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
  background: #333;
  // pointer-events: stroke;
  > img {
    // position: absolute;
    // width: 100%;
    width: 300px;
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

.tool-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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