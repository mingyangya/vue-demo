<template>
  <TrapezoidGroup :list="list" class="shape-group-wrap">
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
        color: '#422A1C'
      },
      {
        width: 48,
        quadrant: 3,
        offset: 48,
        color: '#D6A965'
      }]
    }
  },
  components: {
    TrapezoidGroup
  }
}
</script>

<style scoped lang="scss">
.shape-group-wrap {
  height: 86px;
  text-align: center;
  color: #fff;

  ::v-deep .shape-item-1 {
    width: 511px;
  }

  ::v-deep .shape-item-2 {
    width: 287px;
  }
}

</style>
