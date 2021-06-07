<template>
  <div class="barrage-area" :style="{'height': areaH +'px'}">
    <ul :class="['barrage-list', {'init': init, 'animate-translate-y': hasAnimate}]" :style="ulStyle">
      <li v-for="(item, i) in barrageList" :key="i" ref="itemEle">
        {{item.content}}
      </li>
    </ul>

    <ul :class="['barrage-list', {'init': init, 'animate-translate-y': hasAnimate}]" :style="ulStyle">
      <li v-for="(item, i) in barrageList" :key="i">
        {{item.content}}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: null,
      t: 1000,
      index: 0,
      barrageList: [],
      areaH: 0,
      itemH: 0,
      init: false,
      hasAnimate: true,
    }
  },
  props: {
    list: Array,
    showNumber: {
      type: Number,
      default: 4
    }
  },
  computed: {
    ulStyle () {
      console.log(this.barrageList.length, this.showNumber * this.itemH)
      const endY = (this.barrageList.length - this.showNumber) * this.itemH
      return {
        top: this.init ?  -endY + 'px' : '100%',
        transform: `translateY(${- this.index * this.itemH}px)`
      }
    }
  },
  created () {
    this.initList() 
  },
  mounted () {
    this.initAnimate()
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    initList () {
      this.barrageList = [...this.list]
    },

    initAnimate () {
      this.$nextTick(() => { 
        this.getHeight()
        this.timer = setInterval(this.moveBarrage, this.t)
      })
    },
    getHeight () {
      this.itemH = this.$refs.itemEle[0].clientHeight
      this.areaH = this.itemH * this.showNumber
    },

    moveBarrage () {
     
      if (this.index <= this.barrageList.length - 1) {
        console.log(this.index)
        this.index ++;
      } else {
        this.hasAnimate = false
        this.reset()
        this.initList()
        // this.moveBarrage ()
        setTimeout(()=> {
          this.hasAnimate = true
        }, 300)
        this.initAnimate()
       
      } 
    },

    reset () {
      this.init = true
      this.index = 0
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">

.barrage-area {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 190px;
  padding: 0;
  background: #999;
  overflow: hidden;
}

.barrage-list {
  position: relative;
  &.animate-translate-y{
    transition: transform .3s ease;
  }
  > li {
    box-sizing: border-box;
    height: 28px;
    padding-top: 8px;
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