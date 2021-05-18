<template>
  <div class="home">
    <button @click="show">图</button>
    <ZoomImg ref='zoomImgEle' />
  </div>
</template>

<script>
import ZoomImg from '@/components/common/zoom-img/index'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    ZoomImg
  },
  created () {
    this.$nextTick(() => {
      // this.show2()
    })
  },
  methods: {
    show () {
      this.$refs.zoomImgEle.open()
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