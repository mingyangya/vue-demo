<template>
  <div class="text-stroke">
    <div class="text-bg">{{text || ''}}</div>
    <!-- <div class="text">{{text || ''}}</div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    text: String,
    textStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    textStroke: {
      type: Object,
      default () {
        return {
          len: 0,
          color: 'transparent'
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
$line-height: 14px;
.text-stroke {
  position: relative;
  display: inline-block;
  // line-height: $line-height;
  // font-size: 14px;
  // color: #999;
  text-align: center;
}

.text {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  text-align: center;
  font-size: 13px;
  line-height: $line-height - 1;
  color: #000;
}

.text-bg {
  font-size: 20px;
  color: #FC822C;
	background: #F6E7CD;
	-webkit-background-clip: text;
  // -webkit-text-fill-color: ;
	// -webkit-text-stroke: 1px #F6E7CD;
}
</style>
