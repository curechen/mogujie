<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/common/backTop/BackTop'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import { debounce } from 'common/utils'

  import { getHomeMultidata, getHomeGoods } from 'network/home'



  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        // 上拉回顶部
        isShowBackTop: false,
        // tab-control距离顶部的距离
        tabOffsetTop: 0,
        // 流行，新款，精选的适配
        isTabFixed: false,
        // 在离开路由时，保存Y值
        saveY: 0,
        
      }
    },
    created () {
      // 请求多个数据
      this.getHomeMultidata()
      
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted () {
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      this.$bus.$on('homeItemImgLoad', () => {
        // console.log('zhixi');
        refresh()
      })
    },
    // 路由处于活跃状态时
    activated () {
      // console.log('acacaca');
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()


    },
    deactivated () {
      this.saveY  = this.$refs.scroll.getScrollY()
    },
    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      // 跟网络请求相关的方法
      // 获取轮播图数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          // console.log(this.recommends)
        })
      },
      // 获得各种商品信息
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          // 数组解构赋值
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // 监听内容滚动
      contentScroll(position) {
        // 是否显示backTop
        this.isShowBackTop = (-position.y) > 1000

        // 决定tab-control是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 加载更多图片
      loadMore() {
        // console.log('woshi');
        this.getHomeGoods(this.currentType)
      },
      // 轮播图图片加载完成后，就取一次tab-control到顶部的高度
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  /* .home {
    height: 100vh;
  } */

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 1;
  } */

  .tab-control {
    position: relative;
    /* z-index属性只对定位的元素有效 */
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
