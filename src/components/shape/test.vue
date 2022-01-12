<template>
  <div class="idex">
    <div class="shape-group">
      <Trapezoid class="shape-item shape-item-1" color="red" :width="width" :quadrant="quadrant">
        <template #shape1>
          1
        </template>
        <template #shape2>
          2
        </template>
      </Trapezoid>
      <Trapezoid class="shape-item shape-item-2" color="blue" :width="width" :quadrant="quadrant2"/>
    </div>

    <button @click="quadrant++">add</button>
    <button @click="quadrant--">reduce</button>
    <button @click="quadrant = 1">reset</button>
    quadrant-{{quadrant}}
  
    <br>
    <button @click="quadrant2++">add</button>
    <button @click="quadrant2--">reduce</button>
    <button @click="quadrant2 = 3">reset</button>
    quadrant2-{{quadrant2}}
  </div>
</template>

<script>
import Trapezoid from '../shape/Trapezoid'
// import Trapezoid2 from '../shape/Trapezoid'

export default {
  data () {
    return {
      width: 48,
      quadrant: 2,
      quadrant2: 3
    }
  },
  components: {
    Trapezoid
    // Trapezoid2
  },
  created () {
    // this.setStyle()
  },
  methods: {
    setStyle () {
      this.quadrant = 1

      // this.width = 511
      // this.height = 86
      // this.wrapH = 511
    }
  }
}
</script>

<style scoped lang="scss">

.shape-group {
  display: flex;
  // width: 750px;
  height: 86px;
  flex-wrap: nowrap;
}

.shape-item {
  flex-shrink: 0;
}

.shape-item-1 {
  width: 511px;
}

.shape-item-2 {
  width: 287px;
  margin-left: -48px;
}

</style>
