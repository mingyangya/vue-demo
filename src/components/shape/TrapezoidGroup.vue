<template>
  <div class="shape-group">
    <Trapezoid v-for="(item, i) in list"
      :key="i"
      :class="`shape-item shape-item-${i+1}`"
      v-bind="{ ...item }"
      :style="item.offset ? {'margin-left': `-${item.offset}px`} : {}"
      >
      <slot :name="`shape${i+1}`"/>
    </Trapezoid>
  </div>
</template>

<script>
import Trapezoid from './Trapezoid'
export default {
  props: {
    list: Array
  },
  components: {
    Trapezoid
  }
}
</script>

<style scoped lang="scss">
.shape-group {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}

.shape-item {
  flex-shrink: 0;
}

</style>
