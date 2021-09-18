<template>
  <div class="video-point">
    <div class="video-point-container">
      <slot name="prefix">
        <template v-if="isMobile">
        </template>
        <template v-else>
          <span class="icon icon-prev" @click.stop="clickPrev"></span>
        </template>
      </slot>

      <ul class="list" @scroll="scroll" ref="ulEle">
        <li v-for="(item, i) in list" :key="i" @click.stop="clickItem(item)" :class="{'active': item.time === currentTime}" :style="{'width': liWidth + '%' }">{{item.time | formatSecond}} {{item.text}}</li>
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
      list: [],
      showLen: 5,
      currentTime: 0,
      scrollLeft: 0
    }
  },
  props: {
    vm: Object,
    wrapClick: Function,
    customEvent: Object
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
        console.log(time)
        this.currentTime = Math.floor(time)
        // todo 处理激活项的位置
        this.timeupdate(this.currentTime)
      },
      immediate: true
    }
  },
  computed: {
    isMobile () {
      return utils.isMobile
    },
    ulWidth () {
      return this.$refs.ulEle.clientWidth
    },
    liWidth () {
      return (100 / parseFloat(this.showLen)).toFixed(2)
    },
    scroolMax () {
      const totalWidth = ((this.list && this.list.length - this.showLen) || 0) * Math.round(this.ulWidth * this.liWidth / 100)
      return totalWidth
    },
    scrollDistance () {
      return Math.round(this.ulWidth * this.liWidth / 100)
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    init () {
      this.getList() 
    },

    getList () {
      this.list = [{
        time: 1,
        text: '君不见黄河之水天上来，奔流到海不复回'
      },
      {
        time: 2,
        text: '君不见高堂明镜悲白发，朝如青丝暮成雪。'
      }, {
        time: 3,
        text: '人生得意须尽欢，莫使金樽空对月。'
      }, {
        time: 4,
        text: '天生我材必有用，千金散尽还复来。'
      }, {
        time: 5,
        text: '烹羊宰牛且为乐，会须一饮三百杯。'
      }, {
        time: 6,
        text: '岑夫子，丹丘生，将进酒，君莫停。'
      }, {
        time: 7,
        text: '与君歌一曲，请君为我侧耳听。'
      }, {
        time: 8,
        text: '钟鼓馔玉不足贵，但愿长醉不愿醒。'
      }, {
        time: 9,
        text: '古来圣贤皆寂寞，惟有饮者留其名。'
      }, {
        time: 10,
        text: '陈王昔时宴平乐，斗酒十千恣欢谑。'
      }, {
        time: 11,
        text: '主人何为言少钱，径须沽取对君酌。'
      }, {
        time: 12,
        text: '五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。'
      }, {
        time: 13,
        text: '13'
      }, {
        time: 14,
        text: '14'
      }]
    },

    clickItem ({ time }){
      console.log('clickItem')
      console.log(this.vm)
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
      const index = this.list.findIndex(item => item.time === time)

      if (index > this.showLen - 1 && index !== -1) {
        const distance = (index + 1 - this.showLen) * this.scrollDistance
        this.scrollTo(distance)
      }
      
    },

    scrollTo (distance) {
      const ulEle = this.$refs.ulEle
      console.log('is:', window.getComputedStyle(ulEle).scrollBehavior)
      if (window.getComputedStyle(ulEle).scrollBehavior) {
        ulEle.scrollLeft = distance
      } else {
        this.scrollSmoothTo(distance)
      }
    },

    reset () {
      this.list = []
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
  bottom: 56px;
  left: 0;
  width: 100%;
  height: $h;
  padding: 0 30px;
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
  border-radius: 10px;
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