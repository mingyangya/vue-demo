<template>
  <div :class="[wrapClass, 'common-dialog']" v-if="showDialog">
    <div class="common-dialog-mask" @click="handleMask"></div>

    <transition name="fade">
      <div class="common-dialog-container">
        <div class="gkui-dialog-header">
          <slot name="header">
            {{title}}
          </slot>
        </div>

        <div class="common-dialog-body">
          <slot>
            <div class="menu">
              <div class="menu-item" v-for="(menu, i) in menu" :key="i" @click="clickMenu(menu)">
                <img class="icon" :src="menu.icon" />
                <div class="name"><span>{{menu.name}}</span></div>
              </div>
            </div>
          </slot>
        </div>

        <div class="common-dialog-footer">
          <slot name="footer">
            <div class="button" @click="close">关闭</div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDialog: this.show,
      defaultMenu: [{
        icon: require('./img/discover.png'),
        name: '发现',
        link: 'https://time.geekbang.org',
        eventName: ''
      }, {
        icon: require('./img/learn.png'),
        name: '学习',
        link: 'https://u.geekbang.org',
        eventName: ''
      }, {
        icon: require('./img/my.png'),
        name: '我的',
        link: 'https://b.geekbang.org',
        eventName: ''
      }],
      positionList: ['top', 'center', 'bottom']
    }
  },
  props: {
    title: String,
    wrapClass: String,
    show: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'center'
    },
    list: Array
  },
  computed: {
    menu () {
      return this.list || this.defaultMenu
    }
  },
  created () {

  },
  watch: {
    // show (val) {
    //   this.showDialog = val
    // }
  },
  methods: {
    open () {
      this.$emit('open')
      this.showDialog = true
    },

    close () {
      this.$emit('close')
      this.showDialog = false
    },

    handleMask () {
      this.$emit('click-mask')
      this.close()
    },

    clickMenu ({link, eventName}) {
      console.log(link, eventName)
      this.$emit(eventName)
      this.close()
      if (link) {
        window.location.href = link
      }
    }
  }
}
</script>

<style scoped lang="scss">
.common-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.common-dialog-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0,0,0, .5);
}

.common-dialog-container {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 138px;
  background: #FFFFFF;
  border-radius: 10px 10px 0px 0px;
}

.common-dialog-body {
  position: relative;
  width: 100%;
  height: 87px;
  border-radius: 10px 10px 0px 0px;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #F6F6F6;
  }
}

.menu {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.menu-item {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 23px;
}

.icon {
  display: block;
  width: 23px;
  height: 23px;
  margin-bottom: 4px;
}

.name {
  height: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
  line-height: 14px;
  text-align: center;

  > span {
    display: block;
    font-size: 12px;
    word-break: keep-all;
    transform: scale((10 / 12));
  }
}

.common-dialog-footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.button {
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #353535;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}
</style>
