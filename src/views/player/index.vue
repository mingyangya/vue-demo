<template>
  <Layout :content="content">
    <Player v-bind="{ type, src, marks }" />
  </Layout>
</template>
<script>
import Layout from '@/layout/index'
import Player from './player.vue'

export default {
  data() {
    return {
      content: '音视频打点',
      type: 'video',
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
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