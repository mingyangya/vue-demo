<template>
  <div :class="['video-point', {'video-point-mobile': isMobile, hide: !this.showVideoPoint}, orientation]" :orientation="orientation" v-if="this.points && this.points.length" @click.stop="">
    <template v-if="!isMobile">
      <div class="video-point-container" v-if="showVideoPoint">
        <slot name="prefix">
          <span class="icon icon-prev" @click.stop="clickPrev"></span>
        </slot>

        <ul class="list video-point-list" @scroll="scroll" ref="ulEle">
          <li v-for="(item, i) in points" :key="i" @click.stop="clickItem(item)" :class="{ 'paused' : vm.paused, 'active': (currentTime >= item.period[0]) && (currentTime < item.period[1])}" :style="{'width': liWidth + '%' }">{{item.seconds | formatSecond}} {{item.desc}}</li>
        </ul>

        <slot name="suffix">
          <span class="icon icon-next" @click.stop="clickNext"></span>
        </slot>
      </div>
    </template>

    <template v-else>
      <div class="video-point-container">
        <slot name="prefix">
          <!-- 折叠 -->
          <template v-if="fold">
            <div :class="['fold-area', orientation]" @click.stop="toggleFold(false)" v-show="showFoldIcon">
              <!-- 横屏 -->
              <template v-if="orientation === 'landscape'">
                <div class="icon-book"></div>
                <div class="landscape-fold-area-text">知识点</div>
              </template>

              <template v-else>
                <div class="fold-area-text">知识点</div>
                <div class="icon icon-next"></div>
              </template>
            </div>
          </template>

          <template v-else>
            <div :class="['unfold-area', orientation]" @click.stop="toggleFold(true)" v-show="showFoldIcon">
              <template v-if="orientation === 'landscape'">
                <div class="icon-book"></div>
                <div class="landscape-unfold-area-text">知识点</div>
              </template>

              <template v-else>
                <div class="unfold-area-text">知识点</div>
              </template>

            </div>
          </template>
        </slot>

        <ul class="list video-point-list" @scroll="scroll" ref="ulEle" v-if="showVideoPoint">
          <li v-for="(item, i) in points" :key="i" @click.stop="clickItem(item)" :class="{ 'paused' : vm.paused, 'active': (currentTime >= item.period[0]) && (currentTime < item.period[1])}" :style="{'width': liWidth + '%' }">{{item.seconds | formatSecond}} {{item.desc}}</li>
        </ul>

        <slot name="suffix"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import utils from '../lib/utils'
export default {
  name: 'point',
  data () {
    return {
      isMobile: false,
      showVideoPoint: true,
      points: [],
      showLen: 5,
      currentTime: 0,
      scrollLeft: 0,
      events: ['resize', 'orientationchange'],
      orientation: '', // portrait 竖屏，landscape 横屏
      fold: false, // 是否折叠, 默认展开
      showFoldIcon: true, // mobile 视频点图标
      scrollDistance: 0,
      scrollMax: 0,
      ulWidth: 0,
      nextScroll: 0 // 下次滚动的距离
    }
  },
  props: {
    vm: Object,
    wrapClick: Function,
    customEvent: Object,
    list: Array,
    show: Boolean
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
        if (this.showVideoPoint) {
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
        if (list && list.length) {
          const listLen = list.length
          this.points = list.map((item, i, arr) => Object.assign({}, item, { period: [item.seconds, i < listLen - 1 ? arr[i + 1].seconds : this.endTime]}))
        } else {
          this.points = []
          this.clear()
        }
      },
      immediate: true,
      deep: true
    },
    show (val) {
      this.showVideoPoint = val
      this.fold = !val
    }
  },
  computed: {
    // 每项的宽度占比，例如 20%， 30%，返回值为float类型的两位小数
    liWidth () {
      return parseFloat((100 / parseFloat(this.showLen)).toFixed(2))
    },
    endTime () {
      return this.vm.player.duration || Number.MAX_VALUE
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    open () {
      if (this.isMobile) {
        this.showVideoPoint = true
        this.fold = true
      } else {
        this.showVideoPoint = true
      }
    },

    close () {
      if (this.isMobile) {
        this.showVideoPoint = false
        this.fold = false
      } else {
        this.showVideoPoint = false
      }
    },

    // 列表数据为空, 隐藏知识点图标
    clear () {
      this.vm.setVideoPointIcon(true)
    },

    init () {
      this.addEvents()
      this.checkMobile()
      this.orientationChange()
      this.setShowLen()
      this.initSize()
    },

    // 计算滑动的距离，滑动区域的宽度，更新激活视频点的位置
    initSize () {
      this.$nextTick(() => {
        this.ulWidth = this.getUlWidth()
        this.scrollDistance = this.getScrollDistance()
        this.scrollMax = this.getScroolMax()

        this.moveItem(this.currentTime)
        this.setVideoPointStatus()
      })
    },

    // 视频点区域宽度
    getUlWidth () {
      return this.$refs.ulEle.clientWidth
    },

    // 滑动的最大值
    getScroolMax () {
      const totalWidth = ((this.points && this.points.length - this.showLen) || 0) * Math.round(this.ulWidth * this.liWidth / 100)
      return totalWidth
    },

    // 每次滑动的距离
    getScrollDistance () {
      return Math.round(this.ulWidth * parseFloat(this.liWidth) / 100)
    },

    clickItem ({ seconds }) {
      this.vm.videoPointClick(seconds)

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

      if (this.scrollLeft !== this.scroolMax) {
        this.scrollTo(distance > this.scroolMax ? this.scroolMax : distance)
      }

      this.customEvent && this.customEvent.clickNext && this.customEvent.clickNext()
    },

    scroll (e) {
      this.scrollLeft = e.target.scrollLeft
    },

    timeupdate (time) {
      console.log('time', time)
      // 视频正在播放的时间点 在视频点列表中的索引
      const index = this.points && this.points.findIndex(item => time === item.seconds)

      // 在时间点范围内
      if (index !== -1) {
        const distance = index * this.scrollDistance
        console.log('scroll:', {index, distance, scrollLeft: this.scrollLeft})
        this.scrollTo(distance)
      }
    },

    // 激活时间点（time）所处的项，并移动视频点的到相对位置
    moveItem (time) {
      // 视频正在播放的时间点 在视频点所处区间的索引
      const index = this.points && this.points.findIndex(item => (time >= item.period[0] && time < item.period[1]))
      const distance = index * this.scrollDistance
      if (index !== -1) {
        this.scrollTo(distance)
      }
    },

    scrollTo (distance) {
      const ulEle = this.$refs.ulEle
      const style = window.getComputedStyle(ulEle)
      this.scrollLeft = distance
      if (style && style.scrollBehavior) {
        ulEle.scrollLeft = distance
      } else {
        this.scrollSmoothTo(distance)
      }
    },

    reset () {
      this.points = []
      this.currentTime = 0
      this.scrollLeft = 0

      this.removeEvents()
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
    },

    // 展开知识点
    toggleFold (status) {
      this.fold = status
      this.showVideoPoint = !status
    },

    // 校验是否为手机端
    checkMobile () {
      this.isMobile = utils.isMobile
      return this.isMobile
    },

    addEvents () {
      window.addEventListener(this.events[0], this.resize)
      window.addEventListener(this.events[1], this.orientationChange)
    },

    removeEvents () {
      window.addEventListener(this.events[0], this.resize)
      window.addEventListener(this.events[1], this.orientationChange)
    },

    resize () {
      console.log('resize')
      return utils.throttle(() => {
        this.checkMobile()
        this.setShowLen()
        this.initSize()
      })()
    },

    // 屏幕旋转
    orientationChange () {
      let result = ''
      switch (window.orientation) {
        // 横屏
        case 180:
        case 0:
          result = 'portrait'
          break
        // 竖屏
        case 90:
        case -90:
          result = 'landscape'
          break
        default:
          result = ''
          break
      }
      this.orientation = result
    },

    // 设置显示知识点的个数
    setShowLen () {
      if (document.body.clientWidth <= 768 || this.isMobile) {
        // 小屏, 横屏5个，竖屏3个
        this.showLen = this.orientation === 'landscape' ? 5 : 3
      } else {
        this.showLen = 5
        // 大屏
      }
    },

    // 设置视频播放器视频点图标显示状态
    // mobile： 隐藏pc视频点图标
    // pc：依据showVideoPoint设置pc视频点图标的状态
    setVideoPointStatus () {
      if (this.points && this.points.length) {
        this.vm.setVideoPointIcon(this.checkMobile())
      } else {
        this.vm.setVideoPointIcon(true)
      }
      this.vm.showVideoPoint = this.showVideoPoint
    },

    // mobile 视频点图标状态
    setIconStatus (status) {
      // 折叠状态下， 随视频进度条显隐
      if (this.fold) {
        this.showFoldIcon = status
      }
    }
  }
}
</script>

<style scoped lang="scss">
$h: 58px;
.video-point {
  box-sizing: border-box;
  position: absolute;
  bottom: 56px;
  left: 0;
  width: 100%;
  height: $h;
  padding: 0 10px;

  &.hide {
    display: none;
  }
}

.video-point-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

ul {
  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: nowrap;
  flex: 1;
  flex-shrink: 0;
  height: 100%;
  padding: 12px 0;
  border-radius: 4px;
  border: 1px solid #49474E;
  background: rgba(15, 15, 15, .8);
  overflow-x: auto;
  overflow-y: hidden;
  transition: all .3s;
  scroll-behavior: smooth;
  scrollbar-width: none; // 不显示滚动条,兼容火狐

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

  &:last-child {
    &:after {
      display: none;
    }
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

    &.paused {
      &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 13px;
        width: 5px;
        height: 5px;
        background: #FA8919;
        border-radius: 50%;
      }
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

// 移动端相关样式

.fold-area {
  position: relative;
  // top: -1px;
  // left: -1px;
  box-sizing: border-box;
  width: 33px;
  height: 48px;
  flex-shrink: 0;
  background: rgba(14, 21, 29, 0.7);
  border-radius: 5px;

  .icon-next {
    right: -9px;
    width: 9px;
    height: 18px;
    border-radius: 0 9px 9px 0;
    background: no-repeat url('../image/icon-next.png') center right 2px / 9px auto rgba(14, 21, 29, 0.7);
  }

  // 横屏
  &.landscape {
    display: flex;
    align-items: center;
    // justify-content: center;
    flex-direction: column;
    height: 32px;
  }
}

.fold-area-text {
  transform: scale(0.5) translateY(-10px);
  line-height: 33px;
  font-size: 20px;
  color: #FFFFFF;
  writing-mode: vertical-lr;
  word-break: keep-all;
}

.unfold-area {
  position: relative;
  box-sizing: border-box;
  width: 33px;
  height: 50px;
  flex-shrink: 0;
  background: rgba(14, 21, 29, 0.7);
  border-radius: 6px 0 0 6px;
  border: 1px solid #49474E;
  border-right: none;

  // 横屏
  &.landscape {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 32px;
  }
}

.unfold-area-text {
  transform: scale(0.5) translateY(-10px);
  line-height: 33px;
  font-size: 20px;
  color: #FFFFFF;
  writing-mode: vertical-lr;
  word-break: keep-all;
}

.landscape-fold-area-text {
  width: 60px;
  height: 28px;
  font-size: 20px;
  transform: scale(.25);
  font-weight: 400;
  color: #FFFFFF;
  word-break: keep-all;
}

.landscape-unfold-area-text {
  width: 60px;
  height: 28px;
  font-size: 20px;
  transform: scale(.25);
  font-weight: 400;
  color: #FFFFFF;
  word-break: keep-all;
}

.icon-book {
  flex-shrink: 0;
  width: 10px;
  height: 11px;
  margin: 6px 0 -11px 0;
  background: no-repeat url('../image/book.png') center / 100% auto;
}

.video-point-mobile {

  &.hide {
    display: block;
    width: 53px;
  }

  .list {
    height: 50px;
    padding: 9px 0;
    border-left: none ;
    border-radius: 0 6px 6px 0;
  }

  // 横屏
  &.landscape{
    .list {
      height: 32px;
      padding: 7px 0;
    }
  }
}

</style>
