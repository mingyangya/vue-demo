<template>
  <div class="custom-slider">
    <div class="custom-slider-container" ref="refContent">
      <ul class="mark" v-if="markList?.length">
        <li v-for="(mark, i) in markList" :key="i" class="mark-li" :style="{ left: `${mark.position}%` }"
          @click.stop="clikMark(mark)">
        </li>

        <div class="custom-tips" :style="{ left: `${tipsX}%` }" v-show="showTip">
          <div v-html="tips"></div>
        </div>
      </ul>
      <el-slider v-model="inputValue" class="progress-slider" :show-tooltip="false" @change="input">
      </el-slider>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    duration: Number,
    marks: Array,
  },
  data() {
    return {
      inputValue: 0,
      // markList: [{desc: '', time: 0, start: 0, end: 0}],
      markList: [],
      startLeft: 0,
      showTip: false,
      tips: '',
      tipsX: 0, // x坐标
    }
  },
  watch: {
    value(newV) {
      this.inputValue = newV
    },

    marks: {
      handler: function (newList) {
        this.formatData(newList, this.duration)
      },
      deep: true,
    },

    duration(newV) {
      this.formatData(this.marks, newV)
    }
  },

  mounted() {
    this.$refs.refContent.addEventListener('mousemove', this.mousemove)
    this.$refs.refContent.addEventListener('mouseleave', this.mouseleave)

    let position = this.$refs.refContent.getBoundingClientRect();

    // 鼠标移动区域据页面左侧的距离
    this.startLeft = position.left
  },

  beforeDestroy() {
    this.$refs.refContent.removeEventListener('mousemove', this.mousemove)
    this.$refs.refContent.removeEventListener('mouseleave', this.mouseleave)
  },

  methods: {
    mouseleave() {
      this.tips = ''
      this.showTip = false
    },

    // 获取滑动位置位于那个mark区间
    getMarkIndexByDistance(distance) {
      const x = distance - this.startLeft // 滑动位置相对于滑动区域（refContent）x 坐标
      const width = this.$refs.refContent.clientWidth

      // 相对百分比值
      const xVal = Math.round((parseFloat(x * 100) / width).toFixed())
      this.tipsX = xVal

      return this.markList.findIndex(item => this.isInWithin(xVal, item.start, item.end,))
    },

    // 是否在区间内
    isInWithin(val, start, end) {
      return (val >= start) && (val <= end)
    },

    mousemove(event) {
      const index = this.getMarkIndexByDistance(event.clientX)

      if (index !== -1) {
        // 显示tips

        this.showTip = true
        this.tips = this.markList[index].name
      } else {
        this.showTip = false
      }
    },

    input(val) {
      // console.log('滑块的值发生变化', val)
      this.$emit('change', val)
    },

    formatData(list, duration) {
      this.markList = (list || []).map(item => {
        // 百分比位置，相对于（refContent）
        const start = Math.round((parseFloat(item.start * 100) / duration).toFixed())
        const end = Math.round((parseFloat(item.end * 100) / duration).toFixed())

        return {
          ...item,
          position: start,
          start,
          end
        }
      })
    },

    clikMark(mark) {
      this.inputValue = mark
    }
  },
}
</script>

<style scoped lang="scss">
.custom-slider {
  $sliderInnerH: 20px; // 进度条高度

  .custom-slider-container {
    position: relative;
    pointer-events: all;
    width: 100%;
    height: 100%;
    // background: no-repeat url('~@/assets/images/meeting/audio-bg.png') top center/100% 22px;
  }

  .custom-slider-bg {
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    height: 22px;
    // background-image: url(../../assets/images/meeting-summary/slider-bg.png);
    background-size: cover;
  }

  // .progress {
  // background-color: #355678;

  ::v-deep .el-slider__marks {
    display: none;
  }

  ::v-deep .el-slider__runway {
    background-color: #9CC6FF;
  }

  ::v-deep .el-slider__bar {
    background-color: #3A8DFF;
  }

  ::v-deep .el-slider__button {
    // background-color: #3A8DFF;
    // border-color: #9CC6FF;

    // background-color: #3A8DFF;
    // // border-color: #3A8DFF;
    background-color: #3A8DFF;
    border-color: #3A8DFF;
    width: 2px !important;
    height: 15px !important;
    border: none !important;
    border-radius: 0 !important;
    margin-top: -4px;
  }

  // }


  .mark {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    @apply flex;
    width: 100%;
    height: 0;
    pointer-events: all;
  }

  .mark-li {
    position: absolute;
    top: 0;
    transform: translate(-3px, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    pointer-events: all;
  }

  .custom-tips {
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
    width: 200px;
    height: auto;
    @apply p-3;
    background-color: #3A8DFF;
    border-radius: 6px;
    color: #fff;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 100%);
      width: 0;
      height: 0;
      border: 6px solid;
      border-color: #3A8DFF transparent transparent transparent;
    }

  }
}
</style>

<style lang="scss">
// .mark-tooltip {
//   &.el-tooltip__popper {
//     width: 400px;
//     background: #3A8DFF;
//     border: none;

//     &.is-light {
//       .popper__arrow {
//         border-top-color: #3A8DFF;
//       }
//     }

//   }

//   .markdown-body {
//     background-color: transparent;
//     font-size: 14px;
//     color: #fff;
//   }

//   .popper__arrow {
//     border-top-color: #3A8DFF;
//   }
// }
</style>
