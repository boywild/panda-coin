import Time from './time'

export function date(timeVal, format = 'Y-m-d H:i:s') {
  let timeUtil = new Time()
  return timeUtil.format(timeVal, format)
}
export default {
  date
}
