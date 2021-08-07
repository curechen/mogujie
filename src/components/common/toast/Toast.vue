<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 10px 15px;
    color: white;
    background-color: rgba(0, 0, 0, .7);
    z-index: 9;
  }
</style>
