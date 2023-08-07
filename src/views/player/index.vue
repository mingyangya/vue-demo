<template>
  <Layout :content="content">
    <h1 class="mb-3">视频测试</h1>
    <Player v-bind="{ type, src, marks }" />

    <h1 class="my-3">音频测试</h1>

    <Player v-bind="{ type: 'audio', src: audioSrc, marks }" />
  </Layout>
</template>
<script>
import Layout from '@/layout/index'
import Player from './player.vue'

export default {
  data () {
    return {
      content: '音视频打点',
      type: 'video',
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      audioSrc: 'https://raw.githubusercontent.com/djlxiaoshi/Audio/master/mp3/%E6%A8%8A%E5%87%A1%20-%20%E4%B8%8D%E8%A6%81%E5%B0%B1%E8%BF%99%E6%A0%B7%E7%A6%BB%E5%BC%80%E6%88%91.mp3',
      marks: [
        {
          name: '1-10秒精彩看点',
          time: 1,
          start: 1,
          end: 10
        },
        {
          name: '20-25秒精彩看点',
          time: 20,
          start: 20,
          end: 25
        },
        {
          name: '27-45秒精彩看点',
          time: 27,
          start: 27,
          end: 45
        }
      ],
    }
  },
  components: {
    Layout,
    Player
  },
}
</script>
<style lang="scss" scoped></style>