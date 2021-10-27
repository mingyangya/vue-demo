<template>
  <div>
    <gkDrag :touch="touch" :range="thumbRange" :auto="auto" @move="handleThumbMove">
      <div class="home-back home-icon" @click="clickHome" :style="thumbStyle" ref="homeEl"></div>
    </gkDrag>

    <BackWxtime ref="dialog" @close="close" @open="open"/>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import gkDrag from './drag/drag'
import BackWxtime from './back-wxtime'
export default {
  data () {
    return {
      top: 0,
      left: 0,
      auto: true,
      thumbRange: {}
    }
  },
  props: {
    // 初始位置
    position: VueTypes.shape({
      top: Number,
      left: Number,
    }).def({}).loose,
    // 移动范围
    range: VueTypes.shape({
      xmin: Number,
      xmax: Number,
      ymin: Number,
      ymax: Number
    }).def({}).loose,
    touch: VueTypes.bool.def(true)
  },
  computed: {
    width () {
      return this.$refs.homeEl.clientWidth
    },

    height () {
      return this.$refs.homeEl.clientHeight
    },

    screenWidth () {
      return window.screen.width
    },

    screenHeight () {
      return window.screen.height
    },

    thumbStyle () {
      return {left: `${this.left}px`, top: `${this.top}px`}
    }
  },
  components: {
    BackWxtime,
    gkDrag
  },
  mounted () {
    this.initRange()
    this.initStyle()
  },
  methods: {
    //设置拖动范围
    initRange () {
      const range = {
        xmin: 0,
        xmax: this.screenWidth - this.width,
        ymin: 0,
        ymax: this.screenHeight - this.height
      }
      this.thumbRange = {...range, ...this.range}
    },

    initStyle () {
      const bottom = 69
      const right = 9

      let left = 0
      let top = 0

      const keys = Object.keys(this.position)

      if (keys && keys.length > 0)  {
        left = this.position.left || 0
        top = this.position.top || 0
      } else {
        left = this.screenWidth - this.width - right
        top = this.screenHeight - this.height - bottom
      }

      this.top = top
      this.left = left
    },

    /**
     * 滚动条移动时的事件
     */
    handleThumbMove (x, y, left, top, ev) {
      this.top = top
      this.left = left
    },
    
    clickHome () {
      this.$refs.dialog.open()
    },

    open () {
      this.$emit('open')
    },

    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">

.home-icon  {
  position: fixed;
  top: 69px;
  left: 9px;
  z-index: 10;
  width: 62px;
  height: 62px;
  background: url('./img/home-icon.png') no-repeat center / 100%;
}

/deep/ .common-dialog {
  z-index: 11;
}
</style>
