<template>
  <div class="video-point" v-show="showVideoPoint1" v-if="showVideoPoint">
    <div class="video-point-container">
      <slot name="prefix">
        <template v-if="isMobile">
        </template>
        <template v-else>
          <span class="icon icon-prev" @click.stop="clickPrev"></span>
        </template>
      </slot>

      <ul class="list" @scroll="scroll" ref="ulEle">
        <li v-for="(item, i) in points" :key="i" @click.stop="clickItem(item)" :class="{'active': item.seconds === currentTime}" :style="{'width': liWidth + '%' }">{{item.seconds | formatSecond}} {{item.desc}}</li>
      </ul>

      <slot name="suffix">
        <template v-if="isMobile">
        </template>
        <template v-else>
          <span class="icon icon-next" @click.stop="clickNext"></span>
          <!-- <span class="icon icon-next" @click.stop="customEvent.clickLeft"></span> -->
        </template>
      </slot>
    </div>

  </div>
</template>

<script>
import utils from '../lib/utils'
export default {
  name: 'point',
  data () {
    return {
      showVideoPoint1: true,
      showVideoPoint: true,
      points: [],
      showLen: 5,
      currentTime: 0,
      scrollLeft: 0
    }
  },
  props: {
    vm: Object,
    wrapClick: Function,
    customEvent: Object,
    list: Array,
  },
  filters: {
    formatSecond (second) {
      const add0 = num => (num < 10 ? '0' + num : '' + num)
      const hour = Math.floor(second / 3600)
      const min = Math.floor((second - hour * 3600) / 60)
      const sec = Math.floor(second - hour * 3600 - min * 60)
      return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
    }
  },
  watch: {
    'vm.current': {
      handler (time) {
        // 组件不渲染，不处理视频进度
        if(this.showVideoPoint) {
          this.currentTime = Math.floor(time)
          // 处理激活项的位置
          this.$nextTick(() => {
            this.timeupdate(this.currentTime)
          })
        }
      },
      immediate: true
    },
    'vm.list': {
      handler (list) {
        if(list && list.length) {
          this.points = list
        } else {
          this.points = []
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    isMobile () {
      return utils.isMobile
    },
    ulWidth () {
      return this.$refs.ulEle.clientWidth
    },
    // 每项的宽度占比，例如 20%， 30%，返回值为float类型的两位小数
    liWidth () {
      return (100 / parseFloat(this.showLen)).toFixed(2)
    },
    // 滑动的最大值
    scroolMax () {
      const totalWidth = ((this.list && this.list.length - this.showLen) || 0) * Math.round(this.ulWidth * this.liWidth / 100)
      return totalWidth
    },
    // 每次滑动的距离
    scrollDistance () {
      return Math.round(this.ulWidth * this.liWidth / 100)
    }
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    show () {
      this.showVideoPoint = true
    },

    hide () {
      this.showVideoPoint = false
    },

    clickItem ({ time }){
      this.vm.videoPointClick(time)

      this.customEvent && this.customEvent.clickItem && this.customEvent.clickItem()
    },

    clickPrev () {
      const distance = this.scrollLeft - this.scrollDistance

      if (this.scrollLeft !== 0) {
        this.scrollTo(distance > 0 ? distance : 0)
      }

      this.customEvent && this.customEvent.clickPrev && this.customEvent.clickPrev()
    },

    clickNext () {
      const distance = this.scrollLeft + this.scrollDistance

      console.log(this.scrollLeft, this.scroolMax)
      if (this.scrollLeft !== this.scroolMax) {
        this.scrollTo(distance > this.scroolMax ? this.scroolMax : distance)
      }

      this.customEvent && this.customEvent.clickNext && this.customEvent.clickNext()
    },

    scroll (e) {
      this.scrollLeft = e.target.scrollLeft
    },

    timeupdate (time) {
      // 视频正在播放的时间点 在视频点列表中的索引
      const index = this.points && this.points.findIndex(item => item.seconds === time)

      // 在时间点范围内
      if (index !== -1) {
        // 在0 - this.showLen个视频点子项间，如果有滑动距离，则设置为 0
        if(index > 0 && index <= this.showLen - 1) {
          this.scrollTo(0)
        } else if (index > this.showLen - 1) {
          // 超过this.showLen后 每次移动一个子项的距离
          const distance = (index + 1 - this.showLen) * this.scrollDistance
          this.scrollTo(distance)
        }
      }
    },

    scrollTo (distance) {
      const ulEle = this.$refs.ulEle
      if (window.getComputedStyle(ulEle).scrollBehavior) {
        ulEle.scrollLeft = distance
      } else {
        this.scrollSmoothTo(distance)
      }
    },

    reset () {
      this.points = []
      this.currentTime = 0
      this.scrollLeft = 0
    },

    // 模拟平滑滚动
    scrollSmoothTo (position) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
          return setTimeout(callback, 17)
        }
      }

      const ulEle = this.$refs.ulEle
      // 当前滚动高度
      let scrollLeft = this.scrollLeft

      // 滚动step方法
      const step = function () {
        // 距离目标滚动距离
        const distance = position - scrollLeft
        // 目标滚动位置
        scrollLeft = scrollLeft + distance / 5
        if (Math.abs(distance) < 1) {
          ulEle.scrollleft = position
        } else {
          ulEle.scrollLeft = scrollLeft
          requestAnimationFrame(step)
        }
      }

      step()
    }
  }
}
</script>

<style scoped lang="scss">
$h: 58px;
.video-point {
  box-sizing: border-box;
  position: absolute;
  z-index: 19;
  bottom: 56px;
  left: 0;
  width: 100%;
  height: $h;
  padding: 0 10px;
  font: 400 1em/1.8 PingFang SC,Avenir,Tahoma,Arial,Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,Helvetica,sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
}

.video-point-container {
  position: relative;
  width: 100%;
  height: 100%;
}

ul {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width:100%;
  height: 100%;
  padding: 12px 0;
  border-radius: 4px;
  border: 1px solid #49474E;
  background: rgba(15, 15, 15, .8);
  overflow-x: auto;
  overflow-y: hidden;
  transition: all .3s;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    opacity: 0;
  }
}

li {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: 20%;
  padding: 0 7px 0 27px;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;

  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 13px;
    width: 5px;
    height: 5px;
    background: #D8D8D8;
    border-radius: 50%;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 20px;
    transform: translateY(-50%);
    background: #C2C2C2;
  }

  &.active {
    color: #FA8919;

    &:before {
      top: -1px;
      left: 5px;
      width: 16px;
      height: 19px;
      background: url('../image/i-runing.gif') no-repeat center / 100% auto transparent;
      border-radius: 0;
    }

    .time {
      color: #FA8919;
    }
  }
}

.time {
  display: inline-block;
  color: #fff;
}

.icon {
  display: inline-block;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 28px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-prev {
  left: 0;
  background-image: url('../image/arrow-left.png');
}

.icon-next {
  right: 0;
  background-image: url('../image/arrow-right.png');
}
</style>
