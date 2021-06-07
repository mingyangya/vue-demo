<template>
  <div class="barrage-box-item" ref="ele" :style="listStyle" v-if="show">{{content}}</div>
</template>

<script>
export default {
  data () {
    return {
      boxH: 200,
      itemH: 50,
      t: 1000,
      tranlateY: 250,
      listStyle: {
        transform: `translate3d(0, ${200}px ,0)`
      }
    }
  },
  props: {
    show: true,
    content: {
      type: String,
      default: '弹幕'
    },
    startTime: {
      type: Number,
      default: 1000
    }
  },
  created () {
    this.init()
  },

  beforeDestroy () {
    this.clear()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        setTimeout(() => {
          // this.initPostion()
          
          this.timer = setInterval(this.animate, this.t)
        }, this.startTime)
      }) 
    },

    animate () {
      const max = 0
      if(-this.tranlateY <= max) {
        this.setPosition(this.tranlateY - this.itemH)
      } else {
        this.clear()
      }
    },

    setPosition (tranlateY, duration) {
      this.tranlateY = tranlateY
      this.setListStyle(tranlateY, duration)
    },

    setListStyle (tranlateY, duration = 0.3) {
      this.setListStyles({
        transition: `transform ${duration}s ease`,
        transform: `translate3d(0, ${tranlateY}px ,0)`
      })
    },

    // 设置多个css样式
    setListStyles (styleObj) {
      const styles = styleObj && Object.keys(styleObj) || []
      styles.forEach(key => {
        this.$set(this.listStyle, key, styleObj[key])
      })
    },

    clear () {
      clearInterval(this.timer)
      this.setListStyles({ transition: `transform 0s ease` })
      this.$emit('clear')
    }
  }
}
</script>

<style lang="scss" scoped >
.barrage-box {
  width: 200px;
  height: 200px;
  background: #333;
}

.barrage-box-item {
  position: absolute; top: 0; left: 0;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background: rgb(224, 94, 7);
  font-size: 14px;
  color: #fff;
  text-align: center;
}
</style
>