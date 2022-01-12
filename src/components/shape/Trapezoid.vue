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
    },
    // 象限
    quadrant: {
      type: Number,
      default: 1
    }
  },
  watch: {
    quadrant (newVal) {
      this.$nextTick(()=> {
        this.initStyle()
      })
    } 
  },
  mounted () {
    this.init()
    console.log(this)
  },
  methods: {
    init () {
      this.$nextTick(()=> {
        this.initStyle()
      })
    },

    initStyle (quadrant = this.quadrant) {
      const gradientLineLength = this.getGradientLineLength()

      let deg = this.getDeg()
  
      switch (quadrant) {
        case 1:
        default:
          deg = deg
          break;
        case 2: 
          deg = 180 - deg
          break;
        case 3: 
          deg = 360 - deg
          break;
        case 4: 
          deg = -180 + deg 
          break;
      }

      console.log('---', deg)
      // deg = quadrant > 1 ? quadrant * 90 - deg : deg

      console.log('+++', deg)

      this.setStyle(deg, gradientLineLength)
    },

    setStyle (deg, width) {
      // this.$set(this.style, 'background-image', `-webkit-linear-gradient( ${deg}deg, ${this.color} ${width}px, transparent ${width}px)`)
      // this.$set(this.style, 'background-image', `-moz-linear-gradient( ${deg}deg, ${this.color} ${width}px, transparent ${width}px)`)
      // this.$set(this.style, 'background-image', `-o-linear-gradient( ${deg}deg, ${this.color} ${width}px, transparent ${width}px)`)
      this.$set(this.style, 'background-image', `linear-gradient( ${deg}deg, ${this.color} ${width}px, transparent ${width}px)`)
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
}
</style>
