<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<style scoped>
  

  #tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
    /* z-index: 9; */
  }

</style>
