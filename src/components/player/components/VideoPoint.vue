<template>
  <div class="video-point">
    <ul class="list">
      <li v-for="(item, i) in list" :key="i" @click.stop="clickItem(item)" :class="{'active': item.time === currentTime}">{{item.time | formatSecond}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'com',
  data () {
    return {
      list: [],
      currentTime: 0
    }
  },
  props: {
    vm: Object,
    wrapClick: Function
  },
  filters: {
    formatSecond (second) {
      const add0 = num => (num < 10 ? '0' + num : '' + num)
      const hour = Math.floor(second / 3600)
      const min = Math.floor((second - hour * 3600) / 60)
      const sec = Math.floor(second - hour * 3600 - min * 60)
      return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
    }
  },
  watch: {
    'vm.current': {
      handler (time) {
        console.log(time)
        this.currentTime = Math.ceil(time)
        // todo 处理激活项的位置
      },
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getList() 
    },

    getList () {
      this.list = [{
        time: 1,
        text: '1'
      },
      {
        time: 2,
        text: '2'
      }, {
        time: 3,
        text: '3'
      }, {
        time: 4,
        text: '4'
      }, {
        time: 5,
        text: '5'
      }, {
        time: 6,
        text: '6'
      }, {
        time: 7,
        text: '7'
      }, {
        time: 8,
        text: '8'
      }, {
        time: 9,
        text: '9'
      }, {
        time: 10,
        text: '10'
      }, {
        time: 11,
        text: '11'
      }, {
        time: 12,
        text: '12'
      }, {
        time: 13,
        text: '13'
      }, {
        time: 14,
        text: '14'
      }]
    },

    clickItem ({ time }){
      console.log('clickItem')
      console.log(this.vm)
      this.vm.videoPointClick(time)
    },

    // timeupdate (time) {
    //   this.currentTime = Math.ceil(time)
    // }
  }
}
</script>

<style scoped lang="scss">
.video-point {
  position: absolute;
  bottom: 50px;
  left: 0;
}
  ul {
    display: flex;
  }

  li {
    padding: 5px 10px;
    background: #ff7b00;
    margin: 0 10px;
    cursor: pointer;
    &.active {
      background: red;
    }
  }
</style>
