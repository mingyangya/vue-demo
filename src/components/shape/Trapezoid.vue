<template>
  <div class="shape-trapezoid" :style="style">
    <slot/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      style: {}
    }
  },
  props: {
    width: {
      type: [Number],
      default: 30
    },
    color: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(()=> {
        this.initStyle()
      })
    },

    initStyle () {
      const GradientLineLength = this.getGradientLineLength()

      const deg = this.getDeg() + 90

      this.$set(this.style, 'background-image', `linear-gradient( ${deg}deg, red 0, red ${GradientLineLength}px, transparent ${GradientLineLength}px)`)
    },
    getSize () {
      const {clientWidth, clientHeight} = this.$el
      return {
        w: clientWidth,
        h: clientHeight
      }
    },

    // 获取盒子上边界（c）、梯度线（a）、盒子左上角与梯度线的线（称为b）, a、b、c构成直角三角形，获取a和c的夹角deg
    // 返回a的长度
    getGradientLineLength () {
      const c = this.getSize().w
      const deg = this.getDeg()
      return c * Math.abs(Math.sin(this.degToRad(deg)))
    },

    // 空白区域和盒子构成的阴影三角形
    getDeg () {
      const { h } = this.getSize()
      const height = this.height || h
      const width = this.width

      console.log({height, width}, height / width, Math.tan(height / width), Math.atan(height / width))
      const rad = Math.atan(height / width)
      const result = this.radToDeg(rad)

      console.log('deg:', result)

      return result
    },

    // 弧度转角度
    radToDeg (rad) {
      return rad * 180 / Math.PI
    },

    // 角度转弧度
    degToRad (deg) {
      return Math.PI * deg / 180
    }
  }
}
</script>

<style scoped lang="scss">
.shape-trapezoid {
  width: 100%;
  height: 100%;
  min-height: 10px;
}
</style>
