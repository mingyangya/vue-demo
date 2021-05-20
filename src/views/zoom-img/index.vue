<template>
<Layout>
  <div class="zoom-img">
    <ZoomImg ref='zoomImgEle' class="image" :src="src" @open="open" @close="close" title="点击查看大图"/>
  </div>
</Layout>
</template>

<script>
import Layout from '@/components/layout/index'
import ZoomImg from '@/components/common/zoom-img/index'
// import Mock from 'mockjs'
export default {
  data () {
    return  {
      src: 'https://webpack.docschina.org/icon-square-small.85ba630cf0c5f29ae3e3.svg'
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
.image {
  width: 200px;
  cursor: pointer;
}

</style>