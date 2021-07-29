// 防抖
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    console.log('timer1 ' + timer);
    if (timer) clearTimeout(timer)
    console.log('timer2 ' + timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}