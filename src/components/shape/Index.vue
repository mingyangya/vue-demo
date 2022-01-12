<template>
  <TrapezoidGroup :list="list">
    <template #shape1>
      1
    </template>
    <template #shape2>
      2
    </template>
  </TrapezoidGroup>
</template>

<script>
import TrapezoidGroup from '../shape/TrapezoidGroup'

export default {
  data () {
    return {
      list: [{
        width: 48,
        quadrant: 2,
        color: 'red'
      },
      {
        width: 48,
        quadrant: 3,
        offset: 48,
        color: 'blue'
      }]
    }
  },
  components: {
    TrapezoidGroup
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
