<template>
  <div class="test-voideo">
    <Player :extensions="extensions" @video-point-click="videoPointClick" ref="playerEle"/>
  </div>
</template>

<script>

import Player from '../components/player/GkPlayer.vue'
import VideoPoint from '../components/player/components/VideoPoint.vue'
import Pop from '../components/player/components/Pop.vue'
export default {
  data () {
    return {
      // videoConfig: null
    }
  },
  components: {
    Player
  },
  computed: {
    extensions () {
      return [{ 
        com: VideoPoint, 
        name: 'video-point', 
        customEvent: { 
          clickPrev: this.clickPrev,
          clickNext: this.clickNext,
          clickItem: this.clickItem
        } 
      }, 
      { 
        com: Pop
      }]
    }
  },
  created () {
    this.videoConfig = {
      title: '视频标题',
      points: [
        {time: 20, text: '剧情提示'},
        {time: 30, text: '剧情提示2'},
        {time: 40, text: '剧情提示3'}
      ],
      quality: {
        name: '标清',
        order: 1,
        size: 8507752,
        type: 'sd',
        url: 'https://media001.geekbang.org/dd0f0f11940f4e73b7ef171bf1bb75e5/abbe364597044e1b8f0d14562bf7ac42-592fa3e75b55bce06ec0ea336435cd43-ld.m3u8'
      },
      qualityList: [
        {
          name: '高清',
          order: 2,
          size: 26242920,
          type: 'hd',
          url: 'https://media001.geekbang.org/dd0f0f11940f4e73b7ef171bf1bb75e5/abbe364597044e1b8f0d14562bf7ac42-06c48b8bc9a15a6a70d601049b384fee-hd.m3u8'
        },
        {
          name: '标清',
          order: 1,
          size: 13720992,
          type: 'sd',
          url: 'https://media001.geekbang.org/dd0f0f11940f4e73b7ef171bf1bb75e5/abbe364597044e1b8f0d14562bf7ac42-1d7921ec9f653c9e5e9347720d0d54bd-sd.m3u8'
        },
        {
          name: '普清',
          order: 0,
          size: 8507752,
          type: 'ld',
          url: 'https://media001.geekbang.org/dd0f0f11940f4e73b7ef171bf1bb75e5/abbe364597044e1b8f0d14562bf7ac42-592fa3e75b55bce06ec0ea336435cd43-ld.m3u8'
        }
      ],
      poster: 'https://media001.geekbang.org/65674f6dea1748de8ae6edfa8e934b32/snapshots/c2f7ae812ce64ce997bd11d83866ba89-00005.jpg',
      playedSeconds: 0,
      rate: '1.0',
      // 非加密部分
      Hls: window.Hls,
      source: 'https://media001.geekbang.org/dd0f0f11940f4e73b7ef171bf1bb75e5/abbe364597044e1b8f0d14562bf7ac42-592fa3e75b55bce06ec0ea336435cd43-ld.m3u8',
      // 加密部分
      isEncrypt: false,
      encryptId: null,
      getEncryptVideoPlayAuth: () => {},
      // 字幕
      subtitles: [{
        src: 'https://static001.geekbang.org/files/resource/7/6/756c2109593385d1e220434b4aac49d6.vtt', // 字幕文件地址
        srclang: 'cn', // 字幕语言，eg: cn
        label: '2.郑德惠0911（改）' // 字幕显示的标签名
      }],
      enablePictureInPicture: true, // 开启画中画按钮功能，默认 false 关闭
      enableVolume: true, // 开启音量控制按钮功能，默认 false 关闭
      enableRate: true, // 开启速率控制按钮功能，默认 true 打开
      enableWebFullScreen: true, // 开启网页全屏控制按钮功能，默认 true 打开
      primaryColor: '#5C86FF' // 播放器主题色（默认 #FA8919）
    }
  },
  mounted () {
    this.$refs.playerEle.init(this.videoConfig)
  },
  methods: {
    videoPointClick () {
      // 
      console.log('点击知识点的回调')
    },

    clickPrev () {
      console.log('外click prev')
    },

    clickNext () {
      console.log('外click next')
    },
    clickItem () {
      console.log('外click item')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
