<template>
  <div :class="['moreText',{'more': more}]" ref="textEle" :style="{'line-height': lineH + 'px', height: more ? (lineH * lineNum + 'px') : 'auto' }">
    {{content}}
    <template v-if="more">
      <span class="collapse-btn collapse-text">...<span @click="toggle(false)"> 展开</span></span>
    </template>
    <span v-else class="collapse-btn collapse-text" @click="toggle(true)">收起</span>
  </div>
</template>

<script>
export default {
  name: 'moreText',
  data () {
    return {
      text: '',
      lineH: 30,
      lineNum: 2,
      more: false,
    }
  },
  props: {
    content: String
  },
  watch: {
    content: {
      handler: function (newV){
        this.initDom(newV)
      },
      immediate: true
    }
  },
  computed: {
    textEle () {
      return this.$refs.textEle
    },
  },
  methods: {
    initDom (content) {
      this.$nextTick(() => {
        // 超过对应行数高度
        this.more = this.textEle.clientHeight > this.lineH * this.lineNum
      })
      // tips 可能会 文字显示不全
    },
    toggle (more) {
      this.more = more 
    }
  }
}
</script>

<style scoped lang="scss">
.moreText {
  position: relative;
  width:300px;
  text-align: justify;
  overflow: hidden;
  background: #fff;
  span {
    background: #fff;   
  }
  .collapse-text {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #409eff;
    cursor: pointer;
    background: #fff;
  }
  .collapse-text:active {
    color: #3a8ee6;
  }
}
</style>

