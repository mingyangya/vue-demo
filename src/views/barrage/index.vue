<template>
<Layout>
  <div class="barrage">
    <Barrage ref='barrageEle'/>
  </div>
</Layout>
</template>

<script>
import Layout from '@/components/layout/index'
import Barrage from '@/components/barrage/index'
// import Mock from 'mockjs'
export default {
  data () {
    return  {
    }
  },
  components: {
    Layout,
    Barrage
  },
  methods: {
    open (e) {
      this.$refs.ele.open()
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