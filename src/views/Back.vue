<template>
  <div class="home-back-wrap">
    <BackDialog />
  </div>
</template>

<script>
import BackDialog from '@/components/backDialog/Index'
export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    BackDialog
  }
}
</script>

<style scoped lang="scss">
</style>
