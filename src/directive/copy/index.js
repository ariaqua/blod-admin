import copy from '@/utils/copy'

export default {
  bind(el, { value }) {
    el.$value = value
    el.handler = copy.bind(el, el.$value)

    el.addEventListener('click', el.handler)
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}
