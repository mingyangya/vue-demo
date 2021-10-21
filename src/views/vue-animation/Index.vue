<template>
  <div>
    <div class="animation">
      <div class="animation-item" v-for="(item, i) in list" :key="i"></div>
    </div>
    <Bounce bg="red"/>
  </div>
</template>

<script>
import Bounce from './Bounce'
export default {
  data () {
    return {
      list: [{
        name: 1
      }, {
        name: 2
      }, {
        name: 3
      }]
    }
  },
  components: {
    Bounce
  }
}
</script>

<style lang="scss" scoped>
.animation {
  display: flex;
  width: max-content;
  align-items: flex-end;
  margin: 0 auto;
  height: 100px;
}

.animation-item {
  position: relative;
  width: 20px;
  margin-left: 10px;
  background: red;
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