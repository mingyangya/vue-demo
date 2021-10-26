<template>
  <div class="test-vue">
    <div class="play-gif">
      <div class="play-gif-item" v-for="(item, i) in list" :key="i"></div> 
    </div>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          start: 100,
          end: 30,
        },
        {
          start: 90,
          end: 20,
        },
        {
          start: 100,
          end: 10,
        }
      ]

    }
  },
  components: {
  },
  computed: {
    VideoPoint () {
      return VideoPoint
    }
  },
  mounted () {
    let a = utils.foo()
    console.log(a)
  },
  methods: {
    videoPointClick () {
      // 
      console.log('点击知识点的回调')
    }
  }
}
</script>

<style scoped lang="scss">
.play-gif {
  width: max-content;
  margin: 0 auto;
  height: 30px;
}

.play-gif-item {
  width: 2px;
  height: 100%;
  border-radius: .5px;
  background-color: red;

  &:nth-child(1) {
    animation: move1 1s infinite;
    animation-direction: alternate;
  }
}

@keyframes move1 {
  from {
    height: 20%
  }

  to {
    height: 100%;
  }
}
</style>
