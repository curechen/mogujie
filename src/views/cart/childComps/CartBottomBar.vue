<template>
  <div class="bottom-bar">
    <div class="check-place">
      <check-button 
          class="check-button" 
          :is-checked="isSelectAll"
          @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{ totalPrice }}
    </div>
    <div class="calculate" @click="calcClick">
      购买({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return  item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      
      if (this.cartList.filter(item => !item.checked).length === this.cartList.length) {
        this.$toast.show('请选择要购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: absolute;
    display: flex;
    bottom: 49px;
    left: 0;
    right: 0;
    height: 40px;
    align-items: center;
    background-color: #eee;
    overflow: hidden;
  }

  .bottom-bar .check-place {
    display: flex;
    width: 60px;
    margin-left: 5px;
    /* align-items: center; */
    /* line-height: 20px; */
  }

  .bottom-bar .check-button {
    width: 20px;
    height: 20px;
  }

  .bottom-bar .price {
    flex: 1;
    margin-left: 10px;
  }

  .bottom-bar .calculate {
    width: 90px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: pink;
  }
</style>
