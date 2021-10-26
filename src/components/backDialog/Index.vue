<template>
  <div class="home-back">
    <div @click="toggle" class="home-icon" ref="homeEle"></div>
    <BackDialog :show="show" ref="dialog" />
  </div>
</template>

<script>
import DragClass from './drag.class'
import BackDialog from './BackDialog'
export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    BackDialog
  },
  mounted () {
    this.$nextTick(() => {
      this.dragClass = new DragClass({
        $drag: this.$refs.homeEle,
        scroll: false,
        touch: true,
        auto: true,
        range: {
          xmin: 0,
          xmax: 300,
          ymin: 0,
          ymax: 300
        },
        inertia: true,
        syncStart: (x, y, ev) => {
          this.$emit('start', x, y, ev)
        },
        syncMove: (x, y, left, top, ev) => {
          this.$emit('move', x, y, left, top, ev)
        },
        syncEnd: () => {
          this.$emit('end')
        }
      })
    })
    
  },
  methods: {
    toggle () {
      this.$refs.dialog.open()
    }
  }
}
</script>

<style scoped lang="scss">

.home-icon {
  position: fixed;
  bottom: 69px;
  right: 9px;
  z-index: 10;
  width: 62px;
  height: 62px;
  background: url('./img/home-icon.png') no-repeat center / 100%;
}

/deep/ .common-dialog {
  z-index: 11;
}

.fade-enter-active, 
.fade-leave-active {
  // transition: opacity .5s;
  transition: all 5s;
}

.fade-enter, 
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  font-size: 30px;
}
</style>
