<template>
  <div>
    <!-- detail要销毁，否则每次进入都是同一个商品，因为是在created阶段发起请求 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
  @import "assets/css/base.css";
</style>
