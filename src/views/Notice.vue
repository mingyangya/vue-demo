<template>
  <Notice :content="content" :direction="direction" :isMobile="isMobile" :distance="distance"></Notice>
</template>

<script>
import Notice from '@/components/notice/Index'
export default {
  data () {
    return {
      content: [{
        "nickname": "1",
        "uid": 0,
        "score": 1644485880
      },
      {
        "nickname": "2",
        "uid": 0,
        "score": 1644464228
      },
      {
        "nickname": "3",
        "uid": 0,
        "score": 1644400854
      },
      {
        "nickname": "Lu***",
        "uid": 0,
        "score": 1644400727
      },
      {
        "nickname": "Lu***",
        "uid": 0,
        "score": 1644400726
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644395722
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644395721
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644395721
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644395720
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644395720
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644395719
      },
      {
        "nickname": "Lu***",
        "uid": 0,
        "score": 1644395715
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644308949
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644302593
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644289149
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644228534
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644226021
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1644222188
      },
      {
        "nickname": "Lu***",
        "uid": 0,
        "score": 1644200340
      },
      {
        "nickname": "Lu***",
        "uid": 0,
        "score": 1643451655
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1643249876
      },
      {
        "nickname": "Ge***",
        "uid": 0,
        "score": 1643109229
      },
      {
        "nickname": "Ge***",
        "uid": 0,
        "score": 1643104315
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1643103373
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1643102906
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1643098574
      },
      {
        "nickname": "Ge***",
        "uid": 0,
        "score": 1643097329
      },
      {
        "nickname": "Ge***",
        "uid": 0,
        "score": 1643097203
      },
      {
        "nickname": "极客***",
        "uid": 0,
        "score": 1643096107
      },
      {
        "nickname": "gu***",
        "uid": 0,
        "score": 1643079880
      }],
      distance: 0.5,
      direction: 'y',
      isMobile: true
    }
  },
  components: {
    Notice
  },
  mounted () {
    this.content = this.content.map((item, i) => `${i + 1} 购买了超级会员`).slice(0, 5)
  }
}
</script>

<style lang="scss" scoped>
</style>
