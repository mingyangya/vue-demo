<template>
  <div class="custom-barrage">
    <div class="barrage-box">
      <div class="barrage-box-item" ref="ele" :style="itemStyle" v-for="(item, i) in barrageList" :key="i">
        <slot/>
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
// 跑马灯，可控制区域内显示个数。控制滚动的速度/距离
export default {
  data () {
    return {
      barrageList: [],
      timer: null,
      t: 100,
    }
  },
  props: {
    list: Array,
    grap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    itemStyle () {
      // const { top, right, bottom, left } = this.grap || {}

      return this.normalizeData({ margin: 0 })
    }
  },
  watch: {
    list: {
      handler (newList, oldList) {
        if (newList) {
          this.barrageList = newList
        }
      },
      immediate: true,
    }
  },
  beforeDestroy () {
    this.clear()
  },
  methods: {
    
    render () {

    },

    normalizeData (data) {
      return Object.keys(data)
      .filter((key) => data[key] !== null && data[key] !== undefined && data[key] !== '')
      .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
    },

    getSize () {
      const wrapSize = {}
    },

    clear () {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped >
.custom-barrage {
  // width: 200px;
  height: 200px;
  margin: 50px auto 0;
}

.barrage-box {
  width: 100%;
  height: 100%;
  background: #333;
  overflow: hidden;
}

.barrage-box-item {
  height: 50px;
  line-height: 50px;
  background: rgb(224, 94, 7);
  font-size: 14px;
  color: #fff;
  text-align: center;
}
</style
>