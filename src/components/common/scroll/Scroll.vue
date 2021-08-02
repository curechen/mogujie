<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      // 最好采用父传子的方式设置属性，方便于组件的复用

      // 是否开启滚动检测
      probeType: {
        type: Number,
        default: 0,
      },
      // 是否开启上拉加载
      pullUpLoad: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 监听是否滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    updated() {
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {
      //     click: true,
      //     probeType: this.probeType,
      //     pullUpLoad: this.pullUpLoad,
      //   })
      // })
    },
    methods: {
      scrollTo(x, y, time = 600) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 刷新，重新计算高度
      refresh() {
        console.log('执行一次');
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
  }
</script>

<style scoped>
</style>
