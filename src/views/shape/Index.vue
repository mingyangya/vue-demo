<template>
  <div class="shape-wrapper">
    <TrapezoidGroup :list="list" class="shape-group-wrap">
      <template #shape1>
        <div class="text-1">
          <div class="sale"><span class="num">{{ 499 }}</span> 元 / 年</div>
          <div class="market"><span class="num">{{ 699 }}</span> 元 / 年</div>
        </div>
      </template>
      <template #shape2>
        <div class="desc">立即续费</div>
      </template>
    </TrapezoidGroup>

    <img src="https://static001.geekbang.org/static/time/img/buy-2.03df6a4.jpg" alt="" width="750">
  </div>
</template>

<script>
import TrapezoidGroup from '@/components/shape/TrapezoidGroup'

export default {
  data() {
    return {
      list: [{
        boxWidth: '100%',
        boxHeight: '100%',
        width: 285,
        direction: 'top-right',
        color: '#422A1C'
      }, {
        boxWidth: '100%',
        boxHeight: '100%',
        width: 90,
        direction: 'bottom-right',
        color: '#422A1C'
      }, {
        boxWidth: '100%',
        boxHeight: '100%',
        width: 100,
        direction: 'top-left',
        color: '#422A1C'
      }, {
        width: 48,
        direction: 'top-left',
        color: '#422A1C'
      }]
    }
  },
  components: {
    TrapezoidGroup
  }
}
</script>

<style scoped lang="scss">
.shape-group-wrap {
  width: auto;
  // justify-content: center;
  height: 85px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-family: PingFang SC;

  @include deep('.shape-item-1') {
    width: 559px;
  }

  @include deep('.shape-item-2') {
    width: 239px;
  }

  @include deep('.shape-item-3') {
    width: 100px
  }

  .text-1 {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding-right: 30px;
  }

  .sale,
  .market {
    display: flex;
    align-items: center;
  }

  .sale {
    margin-right: 7px;
    font-size: 14px;
    font-weight: 400;
    color: #FAE2B4;

    >.num {
      margin-right: 8px;
      font-size: 30px;
      font-weight: 500;
      color: #FAE2B4;
    }
  }

  .market {
    font-size: 14px;
    font-weight: 500;
    color: rgba(207, 169, 148, .7);
    text-decoration: line-through;
  }
}


img {
  display: block;
}
</style>
