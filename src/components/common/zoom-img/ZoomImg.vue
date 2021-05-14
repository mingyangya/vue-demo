<template>
  <gkModal :class="['zoon-img', isMobile ? 'mobile' : 'pc']" v-model="show" transition="gk-fade-up" @ok="handleOK" @close="close" color="unset" :needBtn="false" >
    <template slot="close">
      <span class="close"></span>
    </template>
    <div class="img-wrapper" ref="imgEle">
      <img :src="img || defaultImg" alt="" :style="imgStyle">
    </div>
    <div class="tool-group">
      <span class="zoom-out" @click="zoomOut"></span>
      <span class="zoom-text">{{ratio}}%</span>
      <span class="zoom-in" @click="zoomIn"></span>
    </div>
  </gkModal>
</template>

<script>
import gkModal from 'gkSrc/v2/modal'
export default {
  name: 'zoon-img',
  data () {
    return {
      show: false,
      initRatio: 100, // 初始缩放比
      ratio: 100, // 每次缩放的比列
      add: 10, // 增量
      min: 10, // 最小缩放比
      max: 200, // 最大缩放比
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
    img: String,
    isMobile: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    // ...mapState(['isMobile']),
    imgEle () {
      return this.$refs.imgEle
    },
    imgStyle () {
      return {
        transform: `scale(${this.ratio / 100}) translate(${this.x},${this.y})`
      }
    }
  },
  components: {
    gkModal
  },
  beforeDestroy () {
    this.handleEvent(false)
    this.stopBodyScroll(false)
    this.resetData()
  },
  methods: {
    open () {
      this.handleEvent(true)
      // this.stopBodyScroll(true)
      this.show = true
    },
    close () {
      this.handleEvent(false)
      this.stopBodyScroll(false)
      this.show = false
      this.resetData()
    },
    resetData () {
      this.ratio = this.initRatio
    },
    handleOK () {
      console.log('handleok')
      this.close()
    },
    handleEvent (add = true) {
      this.$nextTick(() => {
        // FF doesn't recognize mousewheel as of FF3.x
        if (!this.imgEle) return
        const mousewheelEvent = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel'
        if (add) {
          this.imgEle.addEventListener(mousewheelEvent, this.mouseWheel)
          this.imgEle.addEventListener('mousedown', this.mousedown)
          this.imgEle.addEventListener('mousemove', this.mousemove)
          this.imgEle.addEventListener('mouseup', this.mouseup)
          this.imgEle.addEventListener('mouseleave', this.mouseleave)
        } else {
          this.imgEle.removeEventListener(mousewheelEvent, this.mouseWheel)
          this.imgEle.removeEventListener('mousedown', this.mousedown)
          this.imgEle.removeEventListener('mousemove', this.mousemove)
          this.imgEle.removeEventListener('mouseup', this.mouseup)
          this.imgEle.removeEventListener('mouseleave', this.mouseleave)
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
    mouseWheel (e) {
      e.preventDefault()
      const $event = e
      clearTimeout(this.timer)
      // todo 节流 https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
      this.timer = setTimeout(() => {
        // FF use detail, other use wheelDelta
        const delta = $event.detail ? $event.detail * (-120) : $event.wheelDelta
        if (delta % 120 === 0) {
          delta > 0 ? this.zoomIn() : this.zoomOut()
        } else {
          // console.log(delta, $event)
        }
      }, 0)
    },
    mousedown (e) {
      this.isMove = true
      this.startPoint = {x: e.x, y: e.y}
    },
    mousemove (e) {
      if (this.isMove) {
        this.endPoint = {x: e.x, y: e.y}
        const dx = (this.startPoint.x - this.endPoint.x) / this.ratio
        const dy = (this.startPoint.y - this.endPoint.y) / this.ratio
        this.x = dx
        this.y = dy
      }
    },
    mouseup (e) {
      if (this.isMove) {
        this.endPoint = {x: e.x, y: e.y}
        const dx = (this.startPoint.x - this.endPoint.x) / this.ratio
        const dy = (this.startPoint.y - this.endPoint.y) / this.ratio
        this.x = dx
        this.y = dy
        this.isMove = false
      }
    },
    mouseleave (e) {
      this.isMove = false
    },
    // 页面不滚动
    stopBodyScroll (isFixed = true) {
      if (isFixed) {
        this.top = window.scrollY || 0
        this.bodyEl.style.position = 'fixed'
        this.bodyEl.style.top = -this.top + 'px'
      } else {
        this.bodyEl.style.position = ''
        this.bodyEl.style.top = ''
        window.scrollTo(0, this.top) // 回到原先的top
      }
    }
  }
}
</script>

<style scoped lang="scss">
.zoon-img {
  ::v-deep [gk-modal-close] {
    display: flex;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    &:before,&:after{
      display: none;
    }
    .close {
      display: block;
      width: 10px;
      height: 10px;
      cursor: pointer;
      background: url(./img/i_close.png) no-repeat center / 100%;
      &:hover {
        background-image: url(./img/i_close_hover.png);
      }
    }
  }
  &.pc {
    ::v-deep [gk-modal-main] {
      position: relative;
      box-sizing: border-box;
      width: 740px;
      height: 562px;
      padding: 60px 0 0;
      background: #FFFFFF;
      border-radius: 4px;
    }
    .img-wrapper {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 40px);
      height: 420px;
      margin: 0 auto;
      // padding: 0 40px;
      background: #333;
      overflow: hidden;
      > img{
        width: 100%;
        height: auto;
        transform-origin: center;
        cursor: move;
      }
    }
    .tool-group {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      font-size: 14px;
      font-weight: 400;
      color: #4C4C4C;
      line-height: 14px;
      text-align: center;
    }
    .zoom-out {
      width: 26px;
      height: 26px;
      background: url(./img/zoom-out.png) no-repeat center/12px 2px rgba(92,134,255,.1);
      border-radius: 4px;
      cursor: pointer;
    }
  }
  &.mobile {
    ::v-deep [gk-modal-main] {
      position: relative;
      box-sizing: border-box;
      width: 305px;
      height: 319px;
      border-radius: 6px;
      padding: 40px 0 0;
      background: #FFFFFF;
    }
    ::v-deep [gk-modal-close] {
      display: block;
      top: 14px;
      right: 14px;
      width: 10px;
      height: 10px;
      &:before,&:after{
        display: none;
      }
      > img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .img-wrapper {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      padding: 0 40px;
      height: 208px;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      overflow: hidden;
      > img{
        width: 100%;
        height: auto;
        transform-origin: center;
        cursor: move;
      }
    }
    .tool-group {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      font-size: 14px;
      font-weight: 400;
      color: #4C4C4C;
      line-height: 14px;
      text-align: center;
    }
    .zoom-out {
      width: 26px;
      height: 26px;
      background: url(./img/zoom-out.png) no-repeat center/12px 2px rgba(92,134,255,.1);
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
