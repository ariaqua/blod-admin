import request from '@/utils/request'

export function unlink(data) {
  console.log(data)
  return request({
    url: 'album/unlink',
    method: 'delete',
    data
  })
}

export function find(filetype, pictureType) {
  const params = pictureType ? { pictureType } : {}
  return request({
    url: `album/${filetype}`,
    method: 'get',
    params
  })
}

export function findOne(filetype, id) {
  return request({
    url: `article/${filetype}/${id}`,
    method: 'get'
  })
}

export function remove(filetype, data) {
  return request({
    url: `article/${filetype}`,
    method: 'delete',
    data
  })
}

export function update(filetype, id, data) {
  return request({
    url: `article/${filetype}/${id}`,
    method: 'put',
    data
  })
}
