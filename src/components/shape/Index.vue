<template>
  <div class="idex">
    <Trapezoid class="wrap" color="red" :width="100"/>
  </div>
</template>

<script>
import Trapezoid from '../shape/Trapezoid'

export default {
  data () {
    return {
    }
  },
  components: {
    Trapezoid
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .wrap {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
</style>
