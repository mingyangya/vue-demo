<template>
  <gkDrag :touch="touch" :range="thumbRange" @click-event="clickEvent" :auto="auto" @move="handleThumbMove">
    <div class="home-back" :style="thumbStyle" @click="clickHome">
      <!-- drag用于标示拖拽元素 ，默认为根元素-->
      <div class="home-icon" ref="homeEle" drag></div>
      <BackWxtime ref="dialog" @close="close" @open="open"/>
    </div>
  </gkDrag>
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
      left: Number
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
      return this.$el.clientWidth
    },

    height () {
      return this.$el.clientHeight
    },

    wrapWidth () {
      return document.documentElement.clientWidth
    },

    wrapHeight () {
      return document.documentElement.clientHeight
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
    // 设置拖动范围
    initRange () {
      const range = {
        xmin: 0,
        xmax: this.wrapWidth - this.width,
        ymin: 0,
        ymax: this.wrapHeight - this.height
      }
      this.thumbRange = {...range, ...this.range}
    },

    initStyle () {
      const bottom = 69
      const right = 9

      let left = 0
      let top = 0

      const keys = Object.keys(this.position)

      if (keys && keys.length > 0) {
        left = this.position.left || 0
        top = this.position.top || 0
      } else {
        left = this.wrapWidth - this.width - right
        top = this.wrapHeight - this.height - bottom
      }

      this.top = top
      this.left = left
    },

    /**
     * 移动时的事件
     */
    handleThumbMove (x, y, left, top) {
      this.top = top
      this.left = left
    },

    clickHome () {
      // 点击事件绑定在外层包裹元素或于clickEvent中处理
    },

    clickEvent () {
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

<style lang="scss" scoped>

.home-back {
  position: fixed;
  top: 69px;
  left: 9px;
  z-index: 10;
  width: 62px;
  height: 62px;
}

.home-icon {
  width: 100%;
  height: 100%;
  background: url('https://static001.geekbang.org/resource/image/df/46/dffe62714d89f5e77d7b57d377a7a746.png') no-repeat center / 100%;

  &.move {
    opacity: .7;
  }
}

::v-deep .common-dialog {
  z-index: 11;
}
</style>
