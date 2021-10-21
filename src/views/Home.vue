<template>
  <div class="home">
    <h1>demo演示</h1>
    <br>
    <ul>
      <li v-for="(menu, i) in menuList" :key="i"><a :href="menu.path">{{menu.name}}</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      menuList: [{
        name: '查看大图',
        path: '/zoom-img'
      }, {
        name: '测试',
        path: '/test'
      }, {
        name: 'animation',
        path: '/animation'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 2em;
}
</style>