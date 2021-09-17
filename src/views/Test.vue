<template>
  <div class="test-vue">
    <Video :video-point-element="VideoPoint" @video-point-click="videoPointClick" />
    <!-- <Video /> -->
    <!-- {{utils.foo()}} -->
  </div>
</template>

<script>
import VideoPoint from '../components/video/VideoPoint'
import Video from '../components/video/Index.vue'
import utils from './utils'
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
  mounted ( ) {
    let a = utils.foo()
    console.log(a)
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
