<template>
  <div class="shape-trapezoid" :style="style">
    <slot/>
  </div>
</template>

<script>
// @see https://www.zhangxinxu.com/wordpress/2013/09/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3css3-gradient%E6%96%9C%E5%90%91%E7%BA%BF%E6%80%A7%E6%B8%90%E5%8F%98/
export default {
  data () {
    return {
      smoothing: 0.1, // 平滑过渡
      style: {}
    }
  },
  props: {
     // 盒子尺寸
    boxWidth: [String, Number],
    boxHeight: [String, Number],
    // 空白区域 高度
    width: [Number],
    // 空白区域 高度
    height: [Number],
    // 阴影区域颜色
    color: {
      type: String,
      default: '#422A1C'
    },
    // 空白区域方向
    direction: {
      type: String,
      default: '',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['', 'top-right', 'top-left', 'bottom-left', 'bottom-right'].includes(value)
      }
    },
    quadrant: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(()=> {
        this.initStyle(this.direction)
      })
    },

    initStyle (direction = '') {
      if (!direction) {
        // 无渐变
        this.$set(this.style, 'background', `${this.color}`)
      } else {
        const gradientLineLength = this.getGradientLineLength()

        let deg = this.getDeg()
    
        switch (direction) {
          case 'top-right':
          default:
            deg = deg
            break;
          case 'bottom-right': 
            deg = 180 - deg
            break;
          case 'bottom-left': 
            deg = 360 - deg
            break;
          case 'top-left': 
            deg = -180 + deg 
            break;
        }

        this.setStyle(deg, gradientLineLength)
      }
    },

    setStyle (deg, width) {
      const { h } = this.getSize()
      const c = (width + h * Math.abs(Math.cos(this.degToRad(this.getDeg()))))
      const precent = width / c * 100
      this.$set(this.style, 'background', `linear-gradient( ${deg}deg, rgba(66, 42, 28, 1) ${precent}%, rgba(66, 42, 28, 0) ${this.smoothing ? precent + this.smoothing : precent}%)`)

    },

    changeColor () {
      let color = 'rgba(66, 42, 28, 1)'

      return color
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

      const rad = Math.atan(height / width)
      const result = this.radToDeg(rad)

      // console.log('deg:', result, this.quadrant)

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
  -webkit-transform-style: preserve-3d;
  -webkit-perspective: 1000;
  // transform: rotate(.1deg) translateZ(0);
}
</style>
