<template>
  <div class="meeting-player">
    <div class="meeting-player-container w-full">
      <div :class="['player-area', type +'-area']">
        <components :src="playerSrc" :is="type" ref="refPlayer" @timeupdate="timeupdate" @loadedmetadata="loadedmetadata">
        </components>
      </div>

      <div class="ctrl-area flex items-center">
        <div class="btn-group">
          <i class="ctrl-btn prev el-icon-arrow-left" @click="prev"></i>
          <i :class="['ctrl-btn play ml-2', paused ? 'el-icon-video-play' : 'el-icon-video-pause']"
            @click="handleClick"></i>
          <i class="el-icon-arrow-right ctrl-btn  next ml-2" @click="next"></i>
        </div>

        <div class="progress flex-1 ml-4">
          <customSlider :value="sliderValue" :marks="marks" :duration="duration" @change="sliderChange"></customSlider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customSlider from './custom-slider.vue'

export default {
  data () {
    return {
      // playerSrc: 'https://raw.githubusercontent.com/djlxiaoshi/Audio/master/mp3/%E6%A8%8A%E5%87%A1%20-%20%E4%B8%8D%E8%A6%81%E5%B0%B1%E8%BF%99%E6%A0%B7%E7%A6%BB%E5%BC%80%E6%88%91.mp3',
      playerSrc: '',
      duration: 0,
      currentTime: 0,
      sliderValue: 0, // 滑块的值 【0-100】
      paused: true, // 音频播放状态
      initialPlay: false,
      step: 15, // 快进、快退的秒数
    }
  },
  components: {
    customSlider
  },
  props: {
    src: String,
    marks: Array,
    type: {
      type: String,
      default: 'audio',
      validator: function (value) {
        return ['audio', 'video'].includes(value.toLowerCase())
      }
    }
  },
  watch: {
    src: {
      handler: function (newSrc) {
        console.log(newSrc, 'newSrc')
        this.playerSrc = newSrc
      },
      immediate: true
    },
  },
  methods: {
    handleClick () {
      this.paused ? this.play() : this.pause()
    },
    play () {
      this.paused = false
      this.$refs.refPlayer.play()
    },
    pause () {
      this.paused = true
      this.$refs.refPlayer.pause()
    },

    loadedmetadata (event) {
      const { duration, currentTime, paused } = event.target

      this.paused = paused
      this.duration = duration
      this.currentTime = currentTime

      console.log('loadedmetadata')
    },

    canplay () {
      const { duration } = event.target

      console.log('canplay')

      this.duration = duration
    },

    timeupdate (event) {
      const { paused, currentTime } = event.target

      this.currentTime = currentTime
      this.paused = paused
      this.setSliderValue()

      console.log('timeupdate')

      this.$emit('timeupdate', currentTime)
    },


    prev () {
      const currentTime = this.currentTime - this.step <= 0 ? 0.01 : this.currentTime - this.step

      this.setCurrentTime(currentTime)
    },

    next () {
      const currentTime = this.currentTime + this.step >= this.duration ? this.duration : this.currentTime + this.step

      this.setCurrentTime(currentTime)
    },

    setCurrentTime (time) {
      this.currentTime = time
      this.$refs.refPlayer.currentTime = time
    },

    setSliderValue () {
      // 获取进度百分比
      const value = Math.round(this.currentTime * 100 / this.duration)

      this.sliderValue = value
    },

    sliderChange (value) {
      const currentTime = Math.round((parseFloat(this.duration) * value / 100).toFixed(2))

      this.setCurrentTime(currentTime)
    }
  }
}
</script>

<style scoped lang="scss">
$width: 500px;
$height: $width * 3 / 4;

.meeting-player {
  width: $width;
  margin: 0 auto;
}

.meeting-player-container {
  background-color: #000;
}


.btn-group {
  @apply flex;

  .el-button {
    all: unset;
    background-color: transparent;
    cursor: pointer;

    ::v-deep>span {
      display: block;
      width: 100%;
      // height: 100%;
    }
  }

  .el-button--prev {
    .el-image {
      width: 18px;
      height: 21px;
    }
  }

  .el-button--ctrl {
    .el-image {
      width: 30px;
      height: 30px;
    }
  }

  .el-button--next {
    .el-image {
      width: 18px;
      height: 21px;
    }
  }
}

.ctrl-area {
  background-color: #e5e2e2;
  @apply px-3;
}

.ctrl-btn {
  color: #3A8DFF;
  font-size: 24px;
  cursor: pointer;
}

.player-area {
  width: 100%;
  height: auto;

  >audio,
  video {
    width: 100%;
    height: $height;
  }

  audio {
    min-height: 30px;
  }
}

.progress {
  @apply px-2;

  @include deep('.el-slider__marks') {
    display: none;
  }

  @include deep('.el-slider__runway') {
    background-color: #9CC6FF;
  }

  @include deep('.el-slider__bar') {
    background-color: #3A8DFF;
  }

  @include deep('.el-slider__button') {
    background-color: #3A8DFF;
    border-color: #9CC6FF;
  }
}
</style>
