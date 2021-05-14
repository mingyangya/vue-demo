<template>
  <div class="moreText" ref="rootELe">
    <span ref="textEle" class="text">
      {{text}}
      <template v-if="more">
        <span>...</span>
        <span class="collapse-btn collapse-text" data-spread="false" @click="toggle(false)"> 展开</span>
      </template>
      <span v-else class="collapse-btn collapse-text" data-spread="true" @click="toggle(true)">收起</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'moreText',
  data () {
    return {
      text: '',
      sourceText: '',
      more: false,
      changeText: '',
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
    }
  },
  methods: {
    // 计算文本行数
    getLength (rects){
      let line = 0, lastBottom = 0;
      for(let i = 0, len = rects.length; i < len; i++){
        if(rects[i].bottom === lastBottom){
          continue
        }
        lastBottom = rects[i].bottom
        line ++
      }
      return line;
    },
    getLengthAsync () {
      return new Promise(resolve => {
        this.$nextTick(_ => {
          // console.log(this.$refs.textEle.getClientRects())
          resolve(this.getLength(this.$refs.textEle.getClientRects()))
        })
      }) 
    },
    async formatText (content, len = 2) {
      let h = await this.getLengthAsync()
      while (h > len) {
        !this.more && (this.more = true)
        this.text = this.text.slice(0, -1)
        h = await this.getLengthAsync()
      }
      return {
        text: this.text
      }
    },
    initDom (content) {
      this.text = content
      this.sourceText = content
      this.more = false

      console.time()
      this.$nextTick(() => {
        console.time()
        this.formatText(this.content)
        .then(res => {
          // 缓存截取后结果
          this.changeText = res.text
          console.timeEnd()
        })
      })
      console.timeEnd()
    },

    toggle (more) {
      this.more = more
      console.log(this.changeText, more)
      if(more){
        this.text = this.changeText
      }else {
        this.text = this.sourceText 
      } 
    }
  }
}
</script>

<style scoped lang="scss">
.moreText {
  position: relative;
  width:300px;
  text-align: justify;
  .disabled {
    position: fixed;
    top: -100%;
    left: -100%;
  }
  .collapse-text {
    color: #409eff;
    cursor: pointer;
  }
  .collapse-text:active {
    color: #3a8ee6;
  }
}
</style>
