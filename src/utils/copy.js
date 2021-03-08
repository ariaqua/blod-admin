import { Message } from 'element-ui'

export default function(txt) {
  const textarea = document.createElement('textarea')
  textarea.readOnly = 'readonly'
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  textarea.value = txt
  document.body.appendChild(textarea)
  textarea.select()
  const result = document.execCommand('Copy')
  if (result) {
    Message.success('copy successfully')
  }
  document.body.removeChild(textarea)
}
