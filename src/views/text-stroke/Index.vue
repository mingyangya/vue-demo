<template>
<Layout>
  <div class="text-stroke-page">
    <TextStroke ref='TextStrokeEle' class="text-stroke-box" :text="text"/>
  </div>
</Layout>
</template>

<script>
import Layout from '@/components/layout/index'
import TextStroke from '@/components/common/text-stroke/TextStroke'
// import Mock from 'mockjs'
export default {
  data () {
    return  {
      text: 'test',
      src: 'https://webpack.docschina.org/icon-square-small.85ba630cf0c5f29ae3e3.svg'
    }
  },
  components: {
    Layout,
    TextStroke
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