import dayjs from 'dayjs'

export function formatTime(value) {
  return dayjs(value).format('YYYY-MM-DD A HH:mm:ss')
}
