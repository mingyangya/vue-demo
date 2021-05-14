<template>
  <div :class="debug ? 'block-with-text' : 'moreText'" ref="textEle">
    {{content}}
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  name: 'moreText',
  data () {
    return {
      text: '',
      debug: false
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
    initDom () {
      this.fix()
      this.$nextTick(() => {
        html2canvas(this.textEle).then(function (canvas) {
          let oImg = document.querySelector('.preview')
          if (!oImg) {
            oImg = new Image();
            oImg.className = 'preview'
            oImg.src = canvas.toDataURL();  // 导出图片
            document.body.appendChild(oImg); 
          } else {
            oImg.src = canvas.toDataURL();  // 导出图片
          }
        })
      })  
    },
    fix () {
      // @see https://github.com/niklasvh/html2canvas/issues/2401
      this.debug = true
    }
  }
}
</script>

<style scoped lang="scss">
.moreText {
  position: relative;
  width:300px;
  text-align: justify;
  background: #fff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.block-with-text {
  width:300px;
  overflow: hidden;
  position: relative; 
  line-height: 1.2em; /* use this value for height */
  max-height: 2.4em;  /* max-height = line-height (1.2) * number of lines (2) */
  text-align: justify;  
  padding-right: 1em;
}
.block-with-text:before {
  content: '…';
  position: absolute;
  right: 0;
  bottom: 0;
}
.block-with-text:after {
  content: "";
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white; /* use necessary background-color */
}
</style>
<style lang="scss">
  .preview {
    width: 300px;
    border: 1px solid #333;
  }
</style>