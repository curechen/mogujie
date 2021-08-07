<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
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
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { debounce } from 'common/utils'

import { mapActions } from 'vuex'

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
    DetailBottomBar,
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
      themeTopYs: [],
      currentIndex: 0
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

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        // console.log(this.$refs.swiper.$el.offsetTop);
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
      }, 100)
    })

    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 500)

      
    this.$bus.$on('detailItemImgLoad', () => {
      // console.log('zhixi');
      refresh()
    })
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // refresh是该组件的自定义方法，并不是原生自带的，若用自带的，其实在这里要再获得到scroll组件里的scroll对象
      this.$refs.scroll.refresh()

      this.getThemeTopY()

    },
    // 滚动内容显示对应标题
    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y
      for (let i = 0; i < this.themeTopYs.length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    // 添加到购物车
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })

      this.addCart(product).then(res => {
        this.$toast.show(res, 1500)
      })
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
    height: calc(100% - 102px);
    overflow: hidden;
  }
</style>
