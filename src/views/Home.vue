<template>
  <div class="home">
    <!-- <button @click="show">gkModal图</button> -->
    <button @click="show2">图</button>
    <!-- <ZoomImg ref='zoomImgEle' /> -->
    <ZoomImg2 ref='zoomImgEle2' />
  </div>
</template>

<script>
// import ZoomImg from '@/components/common/zoom-img/ZoomImg'
import ZoomImg2 from '@/components/common/zoom-img/index'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    // ZoomImg,
    ZoomImg2
  },
  created () {
    this.$nextTick(() => {
      // this.show2()
    })
  },
  methods: {
    show () {
      // this.$refs.zoomImgEle.open()
    },
    show2 () {
      this.$refs.zoomImgEle2.open()
    }
  }
}
</script>
<style lang="scss" scoped>
button{

  margin: 0 50px;
  padding: 10px 30px;
  cursor: pointer;
}
img {
  width: 200px;
  cursor: pointer;
}
</style>