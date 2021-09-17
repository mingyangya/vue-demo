<template>
  <div class="video-point">
    <ul class="list">
      <li v-for="(item, i) in list" :key="i" @click.stop="clickItem(i)">{{i}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
    }
  },
  props: {
    wrapClick: Function
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
        time: 32,
        text: '8'
      }, {
        time: 50,
        text: '9'
      }, {
        time: 50,
        text: '9'
      }, {
        time: 50,
        text: '9'
      }, {
        time: 50,
        text: '9'
      }, {
        time: 50,
        text: '9'
      }, {
        time: 50,
        text: '9'
      }]
    },

    clickItem (i){
      console.log('clickItem')
      this.wrapClick && this.wrapClick(i)
    },

    updateInfo (ss) {
      console.log('父组件点击触发', ss)
    }
  }
}
</script>

<style scoped lang="scss">
  ul {
    display: flex;
  }

  li {
    padding: 5px 10px;
    background: #ff7b00;
    margin: 0 10px;
    cursor: pointer;
  }
</style>
