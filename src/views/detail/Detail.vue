<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  data() {
    return {
      iid: null,
      // 首页轮播图
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
    }
  },
  created() {
    // $route是当前活跃的路由对象
    this.iid = this.$route.params.iid

    // 根据iid请求商品的详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res)
      const data = res.result
      // 轮播图
      this.topImages = data.itemInfo.topImages

      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      // 店铺信息
      this.shop = new Shop(data.shopInfo)

      // 商品详情信息
      this.detailInfo = data.detailInfo

      // 尺码参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    })

    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 500)

      
    this.$bus.$on('detailItemImgLoad', () => {
      refresh()
    })
  },
  methods: {
    imageLoad() {
      // refresh是该组件的自定义方法，并不是原生自带的，若用自带的，其实在这里要再获得到scroll组件里的scroll对象
      this.$refs.scroll.refresh()
    },
    contentScroll(position) {
      console.log(position);
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
