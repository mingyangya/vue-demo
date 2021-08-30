<template>
  <div class="step-line">
    <div class="content">
      <div class="horizontal-line" :style="bgStyle">
        <div :class="['point', 'point-' + p.direction]" v-for="(p, index) in points" :key="index" :style="{ left: p.left + 'px'}">
          <div :class="['point-item', 'point-item-' + p.direction]">
            <span class="index">{{p.index}}</span>
            <span class="text">{{p.text}}</span>
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      width: 1200,
      points: [
        {
          left: 67,
          index: '01',
          text: '主题调研',
          direction: 'top'
        },
        {
          left: 141,
          index: '02',
          text: '课程设计',
          direction: 'bottom'
        },
        {
          left: 259,
          index: '03',
          text: '打磨大纲',
          direction: 'top'
        },
        {
          left: 329,
          index: '04',
          text: '讲师备课',
          direction: 'bottom'
        },
        {
          left: 452,
          index: '05',
          text: '打磨课件',
          direction: 'top'
        },
        {
          left: 518,
          index: '06',
          text: '讲师培训',
          direction: 'bottom'
        },
        {
          left: 645,
          index: '07',
          text: '课程试讲',
          direction: 'top'
        },
        {
          left: 715,
          index: '08',
          text: '收集反馈',
          direction: 'bottom'
        },
        {
          left: 838,
          index: '09',
          text: '再次试讲',
          direction: 'top'
        },
        {
          left: 922,
          index: '10',
          text: '内容标准化',
          direction: 'bottom'
        },
        {
          left: 1031,
          index: '11',
          text: '总编室品控',
          direction: 'top'
        },
        {
          left: 1120,
          index: '12',
          text: '交付',
          direction: 'bottom'
        }
      ]
    }
  },
  props: {

  },
  computed: {
    bgStyle () {
      const start = this.points[0].left / this.width * 100
      return {
        width: this.width + 'px',
        background: `linear-gradient(to right, rgba(30, 176, 251,0) 0, rgba(30, 176, 251, 1) ${start.toFixed(2)}% , rgba(30, 176, 251, 1) ${100 - start.toFixed(2)}%, rgba(30, 176, 251,0) 100%)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(./css/style.scss);


$btnH: 49px; // 按钮高度
$verticalLineH: 45px; // 竖线高度

.step-line {
  color: rgb(30, 176, 251);
  padding: 77px 0 80px;
}

.content {
  display: flex;
  width: 1200px;
  justify-content: center;
  align-items: center;
  height: ($btnH * 2) + (2 * $verticalLineH);
  margin: 52px auto 0;
}

.horizontal-line {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #1EB0FB;
}

.point {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  border: 5px solid #89cdff;
  border-radius: 50%;
  background-color: #fff;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    width: 0px;
    height: 36px;
    border-left: 1px dashed #c1d9d3;
  }
}

.point-top {
  &:before {
    top: -($verticalLineH - 5px);
  }
}

.point-bottom {
  &:before {
    bottom: -($verticalLineH - 5px);
  }
}

.point-item {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  height: 44px;
  padding: 14px 21px 14px 23px;
  background: #0992F7;
  // background: $background;
  box-shadow: 0px 0px 15px 0px rgba(129, 181, 192, 0.32);
  border-radius: 10px;

  > span {
    display: inline-block;
    white-space: nowrap;
  }

  .arrow {
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    width: 0;
    height: 0;
    border-bottom: 5px solid #0992F7;
    border-right: 5px solid transparent;
  }
}

.point-item-top {
  top: -($verticalLineH + $btnH);
  .arrow {
    bottom: -2px;
    transform: translateX(-50%) rotate(-45deg);
  }
}

.point-item-bottom {
  bottom: -($verticalLineH + $btnH - 3);

  .arrow {
    top: -2px;
    transform: translateX(-50%) rotate(135deg);
    border-bottom: 5px solid #0992F7;
    border-right: 5px solid transparent;
  }
}

.index {
  position: relative;
  top: 3px;
  margin-right: 7px;
  font-size: 26px;
  line-height: 1;
  font-weight: 900;
  color: #FFFFFF;
  font-family: DIN_Condensed_Bold;
}

.text {
  line-height: 1;
  font-size: 18px;
  font-weight: 500;
  color: #FFFFFF;
}
</style>
