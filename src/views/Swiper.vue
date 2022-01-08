<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptions" class="course-swiper">
      <swiperSlide :class="['course-swiper-item']">
        12124323
      </swiperSlide>
      <swiperSlide :class="['course-swiper-item']">
        5656r765
      </swiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
// require('swiper/dist/css/swiper.css')
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOptions: {
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        // loop: this.data.list.length > 1,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        autoplay: false,
        // freeMode: true,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
