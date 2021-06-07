<template>
<Layout>
  <div class="barrage">
    <Barrage ref='barrageEle' :list="list"/>
  </div>
</Layout>
</template>

<script>
import Layout from '@/components/layout/index'
import Barrage from '@/components/barrage/index'
// import Barrage from '@/components/barrage/barrage'

// import Mock from 'mockjs'
export default {
  data () {
    return  {
      list: [{
        counts: 3,
        type: 1,
        content: '这个月一定要坚持！'
      }, {
        counts: 1,
        type: 1,
        content: '参加新赛季啦'
      }, {
        counts: 3,
        type: 2,
        content: '冲啊！'
      }, {
        counts: 6,
        type: 0,
        content: '我要拿奖励'
      }, {
        counts: 3,
        type: 1,
        content: '这个月一定要坚持！'
      }, {
        counts: 1,
        type: 1,
        content: '参加新赛季啦'
      }, {
        counts: 3,
        type: 2,
        content: '冲啊！'
      }, {
        counts: 9,
        type: 0,
        content: '我要拿奖励'
      }]
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
.barrage {
  margin: 150px 0 0 30px;
}
</style>