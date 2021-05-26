<template>
<div class="box">
  <div class="barrage-area">
    <ul class="barrage-list">
      <li v-for="(item, i) in barrageList" :key="i" :class="item.type | formatBarrageType">
        <div class="text">
          {{item.content}}
          <span v-if="item.type === 1" class="number">x {{item.counts}}</span>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      timer: null,
      t: 300,
      index: 0,
      barrageList: [],
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
        counts: 0,
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
        counts: 0,
        type: 0,
        content: '我要拿奖励'
      }]
    }
  },
  computed: {

  },
  filters: {
    formatBarrageType (type) {
      // 0 自己自定义弹幕 1默认弹幕 2 自定义弹幕
      console.log(type)
      return type === 1 ? 'common' : type === 2 ? 'custom' : 'self'
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      this.barrageList = this.list.slice(0, 4)
      this.index = 3
      this.moveBarrage()
    },
    moveBarrage (number = 1, t = 1000) {
      if (this.index > this.list.length) clearTimeout(this.timer)
      const index =  this.index + number
      console.log('index:', index)
      this.timer = setTimeout(() => {
        if (this.barrageList.length === 0) clearTimeout(this.timer)
        this.barrageList.splice(0, number, ...this.list.slice(index, index + number))
        console.log(this.barrageList)
        this.index = index
        this.moveBarrage()
      }, t)
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  position: relative;
  height: 190px;
  background: #ccc;
}
.barrage-area {
  box-sizing: border-box;
  position: absolute; left: 13px; bottom: 12px; z-index: 2;
  height: 173px;
  padding: 28px 0 0 0;
  overflow: hidden;
  .barrage-shadow {
    box-sizing: border-box;
    position: absolute; left: 0; top: 0;
    height: 28px;
    background: rgba(252, 130, 44, .6);
  }
}

.barrage-list {
  display: flex;
  flex-direction: column-reverse;
  > li {
    box-sizing: border-box;
    height: 28px;
    margin-top: 8px;
    border-radius: 14px;
    line-height: 28px;
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
  }

  .text {
    display: inline-flex;
    box-sizing: border-box;
    padding: 0 12px;
    border-radius: 14px;
    background: rgba(48, 41, 34, 0.6);
    > span {
      display: inline-block;
      position: relative; top: 2px; left: 3px;
      font-size: 20px;
      font-weight: 500;
      color: #FC822C;
      -webkit-text-stroke: 1px #F5E7CD;
      text-stroke: 1px #F5E7CD;
    }
    &:last-child {
      margin-top: 0;
    }
  }

  .self {
    .text {
      border: 1px solid rgba(252, 130, 44, 1);
    }
    
  }
}

</style>