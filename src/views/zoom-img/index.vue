<template>
<Layout :content="content">
  <div class="zoom-img">
    <img :src="src" alt="" class="image mx-auto" @click="preview(src)">
    <ZoomImg ref='imgModel' :img="src" @open="open" @close="close" title="点击查看大图"/>
  </div>
</Layout>
</template>

<script>
import Layout from '@/layout/index'
import ZoomImg from '@/components/common/zoom-img/Img.vue'

export default {
  data () {
    return  {
      content: '图片预览',
      src: 'https://avatars.githubusercontent.com/u/20461557?v=4',
      imgUrl: ''
    }
  },
  components: {
    Layout,
    ZoomImg
  },
  methods: {
    preview (url) {
      this.imgUrl = url
      this.$refs.imgModel.open()
    },
    open (e) {
      // console.log('预览图片', e)
    },
    close () {
      // console.log('关闭')
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