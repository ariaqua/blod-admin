import request from '@/utils/request'

export function getCategories() {
  return request({
    url: 'category',
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: 'category',
    method: 'post',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: `category/${id}`,
    method: 'delete'
  })
}

export function updateCategory(id, data) {
  return request({
    url: `category/${id}`,
    method: 'put',
    data
  })
}
