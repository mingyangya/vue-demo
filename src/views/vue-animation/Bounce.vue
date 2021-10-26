<template>
  <div class="animation-bounce">
    <div class="animation-bounce-item" v-for="(item,i) in len" :key="i"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      len: 3,
      start: 0,
      end: 100,
      add: 10
    }
  },
  props: {
    bg: {
      type: String,
      default: '#f00'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initStyle()
    },

    initStyle () {
      this.$el.style.setProperty('--bg', this.bg)
    }
  }
}
</script>

<style lang="scss" scoped>
.animation-bounce {
  display: flex;
  width: max-content;
  align-items: flex-end;
  margin: 0 auto;
  height: 100px;
}

.animation-bounce-item {
  position: relative;
  width: 20px;
  margin-left: 10px;
  background: red;
  background: var(--bg);
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  &:nth-child(1) {
    animation-name:animation-bounce-1;
  }

  &:nth-child(2) {
    animation-name: animation-bounce-2;
  }

  &:nth-child(3) {
    animation-name: animation-bounce-3;
  }
}

@keyframes animation-bounce-1 {
   from {
    height: 0%;
  }

  to {
    height: 50%;
  }
}

@keyframes animation-bounce-2 {
  from {
    height: 10%;
  }
  
  to {
    height: 70%;
  }
}

@keyframes animation-bounce-3 {
  from {
    height: 20%;
  }
  
  to {
    height: 100%;
  }
}
</style>