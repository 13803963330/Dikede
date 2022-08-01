import request from '@/utils/request'

export const gitYzm=(clientToken)=> {
  return request({
    url: '/user-service/user/imageCode/'+clientToken,
  })
}
export const login=(data)=> {
  return request({
    url: '/user-service/user/login',
    method: 'post',
    data
  })
}

