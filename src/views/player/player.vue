<template>
  <div class="meeting-player">
    <div class="meeting-player-container w-full">
      <div :class="['player-area', type + '-area']">
        <components :src="playerSrc" :is="type" ref="refPlayer" :poster="poster" @timeupdate="timeupdate"
          @canplay="canplay" @loadedmetadata="loadedmetadata">
        </components>
      </div>

      <div class="ctrl-area">
        <div class="progress">
          <customSlider :value="sliderValue" :marks="marks" :duration="duration" @change="sliderChange"></customSlider>
        </div>

        <div class="flex item-center">
          <div class="btn-group flex item-center">
            <i class="ctrl-btn prev el-icon-arrow-left" @click="prev"></i>
            <i :class="['ctrl-btn play ml-2', paused ? 'el-icon-video-play' : 'el-icon-video-pause']"
              @click="handleClick"></i>
            <i class="el-icon-arrow-right ctrl-btn  next ml-2" @click="next"></i>
          </div>
          <div class="time flex items-center ml-2">
            <span>{{ currentTime | formatSecond }}</span>
            <span class="duration">/{{ duration | formatSecond }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 插件区域 -->
    <div class="plugin-area" v-if="pluginList?.length > 0">
      <VideoPoint ref="refVideoPoint" :list="list" :currentTime="currentTime" :duration="duration"
        @click-video-point="videoPointClick" />
    </div>
  </div>
</template>

<script>
import customSlider from './custom-slider.vue'
import VideoPoint from './video-point.vue'
import axios from '@/utils/request'

export default {
  data() {
    return {
      // playerSrc: 'https://raw.githubusercontent.com/djlxiaoshi/Audio/master/mp3/%E6%A8%8A%E5%87%A1%20-%20%E4%B8%8D%E8%A6%81%E5%B0%B1%E8%BF%99%E6%A0%B7%E7%A6%BB%E5%BC%80%E6%88%91.mp3',
      playerSrc: '',
      poster: '',
      duration: 0,
      currentTime: 0,
      sliderValue: 0, // 滑块的值 【0-100】
      paused: true, // 音频播放状态
      initialPlay: false,
      step: 2, // 快进、快退的秒数
      pluginList: [1],
      list: [{
        seconds: 1,
        time: 1,
        start: 1,
        end: 10,
        desc: '君不见黄河之水天上来，奔流到海不复回'
      },
      {
        seconds: 20,
        time: 20,
        start: 20,
        end: 30,
        desc: '君不见高堂明镜悲白发，朝如青丝暮成雪。'
      }, {

        seconds: 30,
        time: 30,
        start: 30,
        end: 40,
        desc: '人生得意须尽欢，莫使金樽空对月。'
      }, {
        seconds: 49,
        time: 49,
        start: 49,
        end: 55,
        desc: '天生我材必有用，千金散尽还复来。'
      }, {
        seconds: 59,
        time: 59,
        start: 59,
        end: 62,
        desc: '烹羊宰牛且为乐，会须一饮三百杯。'
      }, {
        seconds: 66,
        desc: '岑夫子，丹丘生，将进酒，君莫停。'
      }, {
        seconds: 79,
        desc: '与君歌一曲，请君为我侧耳听。'
      }, {
        seconds: 88,
        desc: '钟鼓馔玉不足贵，但愿长醉不愿醒。'
      }, {
        seconds: 99,
        desc: '古来圣贤皆寂寞，惟有饮者留其名。'
      }, {
        seconds: 100,
        desc: '陈王昔时宴平乐，斗酒十千恣欢谑。'
      }, {
        seconds: 111,
        desc: '主人何为言少钱，径须沽取对君酌。'
      }, {
        seconds: 120,
        desc: '五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。'
      }],
      customEvent: {
        clickPrev: this.clickPrev,
        clickNext: this.clickNext,
        clickItem: this.clickItem
      }
    }
  },
  components: {
    customSlider,
    VideoPoint
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
  filters: {
    // s（秒）转化为hh（时）:mm（分）:ss（秒）
    formatSecond(second) {
      const add0 = num => (num < 10 ? '0' + num : '' + num)
      const hour = Math.floor(second / 3600)
      const min = Math.floor((second - hour * 3600) / 60)
      const sec = Math.floor(second - hour * 3600 - min * 60)
      return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
    }
  },
  watch: {
    src: {
      handler: function (newSrc) {
        newSrc && this.handleSrc(newSrc)
      },
      immediate: true
    },
  },
  beforeDestroy() {
    URL?.revokeObjectURL && URL?.revokeObjectURL()
  },
  methods: {
    getBlobData(url) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          responseType: "blob",
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false,
          url
        }).then(({ data }) => {
          resolve(data)
        }).catch(err => reject(err))
      })
    },

    handleSrc(src) {
      console.log('src', src)
      // this.getBlobData(src).then((res) => {
      //   this.playerSrc = URL.createObjectURL(res)
      // }).catch(() => {
      //   this.playerSrc = src
      // })

      this.playerSrc = src
    },

    videoPointClick(time) {
      this.setCurrentTime(time)
    },

    clickPrev() {
      console.log('外click prev')
    },

    clickNext() {
      console.log('外click next')
    },
    clickItem() {
      console.log('外click item')
    },

    handleClick() {
      this.paused ? this.play() : this.pause()
    },

    play() {
      this.paused = false
      this.$refs.refPlayer.play()
    },

    pause() {
      this.paused = true
      this.$refs.refPlayer.pause()
    },

    loadedmetadata(event) {
      const { duration, paused, currentTime } = event.target

      this.paused = paused
      this.duration = duration
      this.currentTime = currentTime

      console.log('loadedmetadata')

      // this.getPosterImg()

      // this.setCurrentTime(1)
      // this.getPosterImg()
    },

    canplay() {
      if (!this.initialPlay) {
        this.initialPlay = true
      }
    },

    timeupdate(event) {
      const { paused, currentTime } = event.target

      this.currentTime = currentTime
      this.paused = paused
      this.setSliderValue()

      console.log('timeupdate')

      this.$emit('timeupdate', currentTime)
    },


    prev() {
      const currentTime = this.currentTime - this.step <= 0 ? 0.01 : this.currentTime - this.step

      this.setCurrentTime(currentTime)
    },

    next() {
      const currentTime = this.currentTime + this.step >= this.duration ? this.duration : this.currentTime + this.step

      this.setCurrentTime(currentTime)
    },

    setCurrentTime(time) {
      this.currentTime = time
      this.$refs.refPlayer.currentTime = time
    },

    getPosterImg() {
      const { videoWidth: width, videoHeight: height } = this.$refs.refPlayer

      console.dir(this.$refs.refPlayer)

      this.$refs.refPlayer.setAttribute('crossOrigin', 'anonymous'); 


      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')

      ctx.drawImage(this.$refs.refPlayer, 0, 0, canvas.width, canvas.height)

      console.log(canvas.toDataURL('image/png'))

      this.poster = canvas.toDataURL('image/png')

      console.log(this.poster)
    },

    setSliderValue() {
      // 获取进度百分比
      const value = Math.round(this.currentTime * 100 / this.duration)

      this.sliderValue = value
    },

    sliderChange(value) {
      const currentTime = Math.round((parseFloat(this.duration) * value / 100).toFixed(2))

      this.setCurrentTime(currentTime)
    }
  }
}
</script>

<style scoped lang="scss">
$width: 500px;
$height: $width * 9 / 16;

.meeting-player {
  width: $width;
  height: $height;
  margin: 0 auto;
}

.meeting-player-container {
  position: relative;
  height: 100%;
}

.player-area {
  width: 100%;
  height: 100%;

  >audio,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  audio {
    min-height: 30px;
  }
}


.btn-group {
  @apply flex items-center;
  height: 40px;

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
  background-color: rgba(0, 0, 0, .5);
  @apply absolute;
  bottom: 0;
  width: 100%;
}

.time {
  color: #fff;
}

.duration {
  color: #a4aab3;
}

.ctrl-btn {
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

// 插件区域
.plugin-area {
  position: relative;
  width: 100%;
}
</style>
