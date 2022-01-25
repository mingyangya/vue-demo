<template>
  <div class='shape-demo'>
    <TrapezoidGroup :list="list" class="shape-group-wrap">
      <template #shape1>
        <div class="shape-1">
          <div class="text-1">
            <div class="sale"><span class="num">{{499}}</span> 元 / 年</div>
            <div class="market"><span class="num">{{699}}</span> 元 / 年</div>
          </div>
        </div>
      </template>
      <template #shape2>
        <div class="shape-2">
          <div class="desc">立即续费</div>
          <div class="icon-finger"></div>
        </div>
      </template>
    </TrapezoidGroup>

    <img src="https://static001.geekbang.org/static/time/img/buy-2.03df6a4.jpg" alt="" class="preview">
  </div>
  
</template>

<script>
import TrapezoidGroup from '../shape/TrapezoidGroup'

export default {
  data () {
    return {
      list: [{
        width: 24,
        direction: 'bottom-right',
        color: '#422A1C'
      }, {
        boxWidth: '100%',
        boxHeight: '100%',
        width: 24,
        direction: 'bottom-left',
        color: '#ceaa6e'
      }]
    }
  },
  components: {
    TrapezoidGroup
  }
}
</script>

<style scoped lang="scss">
.shape-demo {
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
}

.shape-group-wrap {
  width: auto;
  height: 43px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-family: PingFang SC;
}

/deep/ .shape-item-1 {
  width: (280 / 375) * 100%;
}

.shape-1 {
  height: 100%;

  .text-1 {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding-right: 53px;
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


/deep/ .shape-item-2 {
  width: 0;
  flex: 1;
  margin-left: -24px;
}

.shape-2 {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}


.desc {
  font-size: 15px;
  font-weight: 600;
  color: #26190E;
}

.icon-finger {
  position: relative;
  left: 6px;
  width: 12px;
  height: 16px;
  background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAfCAYAAAAMeVbNAAAACXBIWXMAAAsTAAALEwEAmpwYAAACIElEQVRIibXWS4iOcRTH8c87M8SYyEIyJkbRYDkpG1GMBTU1yoRMoiQ2FpMsJBEbC7JRlmbhshJKuU1uRaakqLEwCNNMLg3KuIWx+D+veb2ey7xz+W3+/845z7fz/P/nnOfJtVXXSlAO01GBHvxOCkxSWYxtJS6iH714jT6cxaLhwitxGlfRiA+4gTsYwDp04AjKS4GX4zw2oBMNqMFyLMU0tOAtWnGiFHircBz3sRjtUbZ5/cSpyNeNrWjOgufaqmsrowcmoE444zQ14BqeYGFW5iswFWdiwEuwWqicvK7jERZgfhZ8brTvKPIdEC7zEg4V+e5Ga2bmU6L9tyLf5oJ9Y5Hva7RWZcG7o31dWmCR5kVrbxb8plAZ6zFuCOBq4Z6+4F4WvAuXMQd7M8DlOI6JOInPWXDYgXfYh/qU+DVowlPsyUjkL/wl1uKTMAZgUkz8eGGINUWxqaoo2N8WBtOPGF9eD4U3e5MF5v+p2IVXCbFVwojYgpmRbRZ2CvOH0GwtQuPFZhenGVHW+YbbLZz5YUyObEeFmb9LqL7mXMrH4qPBBhuOOvPHUlOQ1Wipqky4xOdCeT1Q4tcmTWVYZbAz63ELy0YLfgXfC2yVaDP0y06Fd2B7kX22+CYqGU6YE8dGCkuCE+qzfazgv4Sx+2ws4PBemHz9YwGHx9jk31+LUYPDORwcIbsnCQ77cWGY4F5sS2uUAWyU8W+SoBfo+wPJ1GiLxvsPTAAAAABJRU5ErkJggg==) 50%/100% auto;
  animation: move 1s infinite;
}

.preview {
  display: block;
  width: 100%;
}

@keyframes move {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

</style>
