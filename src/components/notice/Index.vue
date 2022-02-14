<template>
  <transition name="slide-up">
    <div class="com-notice" :class="isMobile ? 'app-layout-type-mobile' : 'app-layout-type-pc'" v-if="noticeShow && content && content.length > 0">
      <div ref="noticeEle" class="content-container" :style="noticeStyle">
        <div ref="noticeContentEle" class="content" :style="style">
          <div class="content-item" v-for="(item, i) in content" :key="i" :style="itemStyle">
            {{item}}
          </div>
        </div>
      </div>
      <span class="close-btn" @click="close"></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'com-notice',
  props: {
    content: {
      type: Array,
      default: []
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    distance: {
      type: Number,
      default: 1
    },
    direction: {
      type: String,
      default: 'x',
      validator: value => ['x', 'y'].includes(value)
    }
  },
  data () {
    return {
      noticeShow: true,           // 通知栏显示（需要同时有内容）
      hasScrollAnimation: false,  // 通知栏文字是否滚动
      timer: null,                // 通知栏文字动画延时器
      contentTranslate: 0,
      oneScreen: true             // 一个占一屏
    }
  },
  computed: {
    noticeSize () {
      const ele = this.$refs.noticeEle
      return {
        width: ele.clientWidth,
        height: ele.clientHeight
      }
    },
    noticeContentSize () {
      const ele = this.$refs.noticeContentEle
      return {
        width: ele.clientWidth,
        height: ele.clientHeight
      }
    },
    noticeStyle () {
      if (!this.hasScrollAnimation) return
      let style = {}
      if (this.direction === 'x') {
        // style = this.oneScreen ? { "min-width": '100%' } : {}
        // style.justifyContent =  'flex-start'
        // style.flexDirection =  'row'
      } else {
        // style = this.oneScreen ? { "min-height": '100%' } : {}
        // style.justifyContent =  'flex-start'
        // style.flexDirection =  'column'
      }
      return style
    },
    style () {
      return {
        flexDirection: this.direction === 'x' ? 'row' : 'column',
        transform: this.direction === 'x' ? `translateX(${this.contentTranslate}px)` : `translateY(${this.contentTranslate}px)`
      }
    },
    itemStyle () {
      return this.direction === 'x' ? (this.oneScreen ? { "min-width": '100%' } : { "width": 'max-content'}) : (this.oneScreen ? { "min-height": '100%' } : { "height": 'max-content'})
    },
    len () {
      return this.oneScreen ? this.content.length - 1 : 1
    }
  },
  mounted () {
    window.addEventListener('resize', this.initAnimation)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initAnimation)
  },
  watch: {
    content: {
      immediate: true,
      handler () {
        this.getNotice()
      }
    }
  },
  methods: {
    // 获取通知栏信息
    getNotice () {
      this.$nextTick(() => {
        this.initAnimation()
      })
    },

    initAnimation () {
      if (this.noticeShow && this.content && this.content.length) {
        this.tickStop()

        if (this.direction === 'x') {
          const { width } =  this.noticeSize
          const { width: contentWidth } =  this.noticeContentSize

          // 通知栏内容长度超过父容器时，滚动展示内容
          if (contentWidth * this.len > width) {
            this.tickStart()
          }
        } else {
          const { height } =  this.noticeSize
          const { height: contentHeight } =  this.noticeContentSize
          // 通知栏内容高度超过父容器时，滚动展示内容
          if (contentHeight * this.len > height) {
            this.tickStart()
          }
        }
      }
    },

    tickStart () {
      this.hasScrollAnimation = true
      // 初始位置设定在右侧或者顶部
      this.contentTranslate = this.direction === 'x' ? this.noticeContentSize.width : this.noticeContentSize.height
      this.timer = true
      this.tick()
    },

    tickStop () {
      if (this.hasScrollAnimation) {
        this.hasScrollAnimation = false
        this.contentTranslate = 0
        cancelAnimationFrame && cancelAnimationFrame(this.timer)
        this.timer = null
      }
    },

    tick () {
      this.contentTranslate -= this.distance

      if (this.direction === 'x') {
        // 滚动到左侧消失在屏幕外后，重置到右侧初始位置
        if (this.contentTranslate < -this.noticeContentSize.width * this.len) {
          this.contentTranslate = this.noticeContentSize.width
        }
      } else {
        // 滚动顶部侧消失在屏幕外后，重置到顶部侧初始位置
        if (this.contentTranslate < -this.noticeContentSize.height * this.len) {
          this.contentTranslate = this.noticeContentSize.height
        }
      }

      if (this.timer) {
        this.timer = requestAnimationFrame(this.tick)
      }
    },

    close () {
      this.noticeShow = false
      this.tickStop()
    }
  }
}
</script>

<style lang="scss" scoped>
$orange: #FA8919;
$gray: #888;

.com-notice {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; height: 45px;
  background: #FFF8F1;
  font-size: 16px;
  font-weight: 400;
  color: $orange;
  overflow: hidden;
}

.content-container {
  display: flex;
  justify-content: center;
  width: 960px;
  height: 100%;
  overflow: hidden;
}

.content {
  position: relative;
  display: flex;
  min-width: 101%;
  height: 100%;
  width: max-content;
  white-space: nowrap;
  align-items: center;
}

.content-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 100%;
}

.notice-dialog {

  & .iconfont {
    line-height: 30px;
    font-size: 14px;
    color: #999;
  }
  & /deep/ .gkui-dialog-container {
    box-sizing: border-box;
    padding: 40px 0 30px;
    border-radius: 5px;
  }

  & /deep/ .gkui-dialog-footer {
    padding: 0;
  }

  & .dialog-content {
    text-align: center;
    color: $gray;

    & .orange {
      color: $orange;
    }

    & .small {
      font-size: 14px;
    }
  }
}

.close-btn {
  position: absolute; z-index: 10; left: 50%; top: 12px;
  margin-left: 550px;
  width: 20px; height: 20px;
  cursor: pointer;
  transform: rotate(45deg);

  &:before,
  &:after {
    content: '';
    position: absolute; left: 50%; top: 50%;
    width: 15px;
    border-top: 1px solid $orange;
    transform: translate(-50%, -50%);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}

.app-layout-type-mobile {
  &.com-notice {
    box-sizing: border-box;
    height: 30px;
    padding: 0 29px 0 15px;
    background: #f3ded1;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #684735;
  }

  .notice-dialog {
    & /deep/ .gkui-dialog-container {
      padding: 51px 0 45px;
      border-radius: 8px;
    }

    & /deep/ .gkui-dialog-close-wrap {
      top: 5px; right: 5px;
    }

    & .iconfont {
      font-size: 11px; font-weight: 300;
    }

  }

  .content-container {
    width: 100%;
  }

  .close-btn {
    left: auto; right: 6px; top: 8px;
    width: 15px; height: 15px;
    background: #d0d0d0;
    border-radius: 50%;

    &:before,
    &:after {
      width: 9px;
      border-color: #fff;
    }
  }
}

.slide-up-active, .slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter {
  height: 50px;
  opacity: 1;
}

.slide-up-leave-to {
  height: 0;
  opacity: 0;
}

</style>
