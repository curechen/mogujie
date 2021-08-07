<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>  
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    // 第一种写法
    ...mapGetters(['cartLength', 'cartList']),

    // 第二种写法
    // ...mapGetters({
    //   length: 'cartLength',
    //   list: 'cartList'
    // })
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
    overflow: hidden;
  }
</style>
