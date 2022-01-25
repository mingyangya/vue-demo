<template>
  <div class="barrage">
    <!-- <div class="bottom-btn-wrap">
    </div> -->
    <Trapezoid color="red" class="wrap"/>
  </div>
</template>

<script>
import Trapezoid from '../shape/Trapezoid'
export default {
  data () {
    return {
      btnW: 375,
      height: 43,
    }
  },
  components: {
    Trapezoid
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.barrage {
  background: #999;
}

.bottom-btn-wrap {
  width: 750px;
  height: 86px;
  background-image: linear-gradient( 134deg, red 0, red 464px, transparent 464px)
}

.wrap {
  width: 750px;
  height: 86px;
}
</style>
