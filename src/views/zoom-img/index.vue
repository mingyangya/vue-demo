<template>
<Layout>
  <div class="zoom-img">
    <ZoomImg ref='zoomImgEle' :src="src" @open="open" @close="close" title="点击查看大图"/>
  </div>
</Layout>
</template>

<script>
import Layout from '@/components/layout/index'
import ZoomImg from '@/components/common/zoom-img/index'

export default {
  data () {
    return  {
      src: 'https://cn.vuejs.org/images/logo.png'
    }
  },
  components: {
    Layout,
    ZoomImg
  },
  methods: {
    open (e) {
      console.log('图片地址', e)
    },
    close () {
      console.log('关闭')
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