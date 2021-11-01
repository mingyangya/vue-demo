<template>
  <div class="home-back-wrap">
    <BackWxtime/>
  </div>
</template>

<script>
import BackWxtime from '@/components/back-wxtime/index'
export default {
  data () {
    return {
      touch: true
    }
  },
  components: {
    BackWxtime
  }
}
</script>

<style scoped lang="scss">
</style>
