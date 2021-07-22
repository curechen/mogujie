import {request} from "./request"

export function getHomeMultidata() {
  return request({
    // 会自动加在baseURL之后，除非url是个绝对路径
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}