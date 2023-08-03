<template>
  <div class="layout-header">
    <a href="/">返回首页</a>
  </div>
</template>

<script>
export default {
  name: 'layout-header',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.layout-header {
  position: absolute; top: 0; left: 0; z-index: 99;
  width: 100%;
  height: $headerH;
  a {
    position: absolute; top: 50%; transform: translateY(-50%); left: 20px;
    display: block;
    color: #1abc9c;
    text-decoration: underline;
  }
}
</style>