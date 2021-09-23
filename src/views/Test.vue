<template>
  <div class="test-vue">
    <!-- <Video :video-point-element="VideoPoint" @video-point-click="videoPointClick" /> -->
    <!-- <Video /> -->
  </div>
</template>

<script>
import VideoPoint from '../components/video/VideoPoint'
import Video from '../components/video/Index.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    Video
  },
  computed: {
    VideoPoint () {
      return VideoPoint
    }
  },
  methods: {
    videoPointClick () {
      // 
      console.log('点击知识点的回调')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
