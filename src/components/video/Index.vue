<template>
  <div class="video-wrapper" @click="wrapClick">
    <video :src="src" @click.stop="videoClick"></video>
    <component v-if="com" :is="com" v-bind="{ wrapClick }" ref="videoPointRef"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: require('./1.mp4')
    }
  },
  props: {
    videoPointElement: Object
  },
  computed: {
    com () {
      return this.videoPointElement ? this.videoPointElement : ''
    },
  },
  mounted () {
    // console.log(this.videoPointElement)
  },
  methods: {
    videoClick () {
      console.log('++video++')
      console.log(this)
      console.log(this.videoPointElement)
      console.log(this.$refs.videoPointRef)
      // this.videoPointElement && this.videoPointElement.updateInfo('ss')
      this.$refs.videoPointRef.updateInfo('11111')
    },

    wrapClick () {
      console.log('从子组件点击触发')
      this.$emit('video-point-click')
    }
  },
  
}
</script>

<style scoped lang="scss">
video {
  width: 500px;
}
</style>
