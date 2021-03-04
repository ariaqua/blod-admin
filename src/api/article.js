import request from '@/utils/request'

export function getArticles() {
  return request({
    url: 'article',
    method: 'get'
  })
}

export function getArticle(id) {
  return request({
    url: `article/${id}`,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: 'article',
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `article/${id}`,
    method: 'delete'
  })
}

export function updateArticle(id, data) {
  return request({
    url: `article/${id}`,
    method: 'put',
    data
  })
}
