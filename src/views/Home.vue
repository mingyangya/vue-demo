<template>
  <div class="home">
    <h1>demo演示</h1>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in menuList" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.cover" class="image">
          <div style="padding: 14px;">
            <span>{{ item.nickname }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" @click="jump(item)">进入</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { routerMenuList } from '@/config/router.conf'
export default {
  name: 'Home',
  data () {
    return {
      // menuList: [{
      //   name: '查看大图',
      //   path: '/zoom-img'
      // }, {
      //   name: '测试',
      //   path: '/test'
      // }, {
      //   name: 'animation',
      //   path: '/animation'
      // }, {
      //   name: '弹幕',
      //   path: '/barrage'
      // }],
      menuList: routerMenuList,
      currentDate: new Date()
    }
  },
  methods: {
    jump (item) {
      this.$router.push(item.path)
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 2em;
}

.el-col {
  margin-top: 20px;

  &:nth-child(-n+3) {
    margin-top: 0
  }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>