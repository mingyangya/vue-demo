<template>
  <div>
    <TrapezoidGroup :list="list" class="shape-group-wrap">
      <template #shape1>
        <div class="text-1">
          <div class="sale"><span class="num">{{499}}</span> 元 / 年</div>
          <div class="market"><span class="num">{{699}}</span> 元 / 年</div>
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
import TrapezoidGroup from '../shape/TrapezoidGroup'

export default {
  data () {
    return {
      list1: [{
        width: 48,
        quadrant: 2,
        color: '#422A1C'
      },
      {
        width: 48,
        quadrant: 3,
        offset: 48,
        color: '#D6A965'
      }],
      list: [{
        width: 48,
        quadrant: 2,
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

  /deep/ {
    .shape-item-1 {
      width: 559px;
    }

    .shape-item-2 {
      width: 239px;
      display: none;
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

}

img {
  display: block;
}

</style>
