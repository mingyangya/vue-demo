<template>
  <div class="layout">
    <Header/>
    <slot></slot>
  </div>
</template>

<script>
import Header from '@/components/layout/header'
export default {
  data () {
    return {
    }
  },
  components: {
    Header
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.layout {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: $headerH;
}
</style>