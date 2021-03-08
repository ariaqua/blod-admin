import { Message } from 'element-ui'

export default {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) return

      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = el.$value
      document.body.appendChild(textarea)

      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        Message.success('copy successfully')
      }
      document.body.removeChild(textarea)
    }

    el.addEventListener('click', el.handler)
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}
