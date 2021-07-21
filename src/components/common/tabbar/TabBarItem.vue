<template>
  <div class="tab-bar-item">
    <div class="icon"><slot name="item-icon"></slot></div>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
};
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
  
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
