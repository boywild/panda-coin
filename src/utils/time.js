import { typeOf } from './assist'

const $timeRange = Symbol('$timeRange')
const $checkTimeType = Symbol('$checkTimeType')
const $unitRange = Symbol('$unitRange')
const $checkUnitRange = Symbol('$checkUnitRange')
const $timeRefer = Symbol('$timeRefer')
const $addSubstract = Symbol('$addSubstract')

export default class Time {
  [$timeRange] = ['string', 'number', 'date'];
  [$unitRange] = ['y', 'm', 'd', 'h', 'i', 's', 'ms'];
  [$timeRefer] = {
    'y': 'year',
    'm': 'month',
    'd': 'date',
    'h': 'hours',
    'i': 'minutes',
    's': 'seconds'
  }
  /**
   * 传入时间值，返回指定格式的时间显示
   * @param {String|Number|Date} timeVal
   * @param {String} format
   */
  format (timeVal, format = 'y-m-d h:i:s') {
    if (!timeVal) return ''
    const timeObject = this.getTimeObject(timeVal)
    const lowFormat = format.toLowerCase()
    return lowFormat
      .replace('y', timeObject.year)
      .replace('m', timeObject.month)
      .replace('d', timeObject.date)
      .replace('h', timeObject.hours)
      .replace('i', timeObject.minutes)
      .replace('s', timeObject.seconds)
  }
  /**
   * 传入时间值，返回时间date类型
   * @param {String|Number|Date} timeVal
   */
  parse (timeVal) {
    const timeType = this[$checkTimeType](timeVal)
    if (timeType === 'string') {
      const timeStr = timeVal.replace(/[^0-9]/ig, '')
      const timeObject = this.getTimeObject(timeStr)
      return new Date(timeObject.year, timeObject.month - 1, timeObject.date, timeObject.hours, timeObject.minutes, timeObject.seconds)
    } else {
      return new Date(timeVal)
    }
  }
  /**
   * 传入时间值，返回时间戳
   * @param {String|Number|Date} timeVal
   */
  getTimestamp (timeVal) {
    const timeType = this[$checkTimeType](timeVal)
    let timestamp = 0
    switch (timeType) {
      case 'string':
        timestamp = this.parse(timeVal).getTime()
        break
      case 'number':
        timestamp = timeVal
        break
      case 'date':
        timestamp = timeVal.getTime()
        break
    }
    return timestamp
  }
  /**
   * 传入时间值，返回以year、month、date、hours、minutes、seconds为键的对象
   * @param {String|Number|Date} timeVal
   */
  getTimeObject (timeVal) {
    const timeType = this[$checkTimeType](timeVal)
    let timeObject = {
      year: '',
      month: '',
      date: '',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
    if (timeType === 'string') {
      timeObject.year = timeVal.substring(0, 4)
      timeObject.month = timeVal.substring(4, 6)
      timeObject.date = timeVal.substring(6, 8)
      if (timeVal.length === 14) {
        timeObject.hours = timeVal.substring(8, 10)
        timeObject.minutes = timeVal.substring(10, 12)
        timeObject.seconds = timeVal.substring(12, 14)
      }
    } else {
      const timeDate = timeType === 'number' ? new Date(timeVal) : timeVal
      timeObject.year = timeDate.getFullYear()
      timeObject.month = timeDate.getMonth() + 1
      timeObject.date = timeDate.getDate()
      timeObject.hours = timeDate.getHours()
      timeObject.minutes = timeDate.getMinutes()
      timeObject.seconds = timeDate.getSeconds()
    }
    Object.keys(timeObject).forEach((key) => {
      timeObject[key] = timeObject[key].toString().padStart(2, '0')
    })
    return timeObject
  }
  /**
   * 传入时间值，返回对应单位的时间差
   * @param {String|Number|Date} startTimeVal
   * @param {String|Number|Date} endTimeVal
   * @param {String} unit
   */
  getTimeDiff (startTimeVal, endTimeVal, unit = 'ms') {
    const unitLow = this[$checkUnitRange](unit)
    const start = this.parse(startTimeVal < endTimeVal ? startTimeVal : endTimeVal)
    const end = this.parse(startTimeVal < endTimeVal ? endTimeVal : startTimeVal)
    const timeGap = this.getTimestamp(end) - this.getTimestamp(start)
    let timeDiff = 0
    switch (unitLow) {
      case 'y':
        timeDiff = end.getFullYear() - start.getFullYear()
        break
      case 'm':
        timeDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        break
      case 'd':
        timeDiff = Math.floor(timeGap / 86400000)
        break
      case 'h':
        timeDiff = Math.floor(timeGap / 3600000)
        break
      case 'i':
        timeDiff = Math.floor(timeGap / 60000)
        break
      case 's':
        timeDiff = Math.floor(timeGap / 1000)
        break
      default:
        timeDiff = timeGap

    }
    return timeDiff
  }
  /**
   * 传入时间差的天、时、分、秒的对象
   *
   * @param {String|Number|Date} startTimeVal
   * @param {String|Number|Date} endTimeVal
   * @returns
   * @memberof Time
   */
  getTimeDiffObj (startTimeVal, endTimeVal) {
    const timeGap = this.getTimeDiff(startTimeVal, endTimeVal, 's')
    return {
      days: Math.floor(timeGap / 86400).toString(),
      hours: this.padStart(Math.floor((timeGap % 86400) / 3600)),
      minutes: this.padStart(Math.floor((timeGap % 3600) / 60)),
      seconds: this.padStart(timeGap % 60)
    }
  }
  padStart (num) {
    return num.toString().padStart(2, '0')
  }
  /**
   * 过去的时间，用于消息的时间显示
   *
   * @param {*} pastTimeVal
   * @param {*} [nowTimeVal=new Date()]
   * @returns
   * @memberof Time
   */
  timeAgo (pastTimeVal, nowTimeVal = new Date()) {
    let minutesGap = this.getTimeDiff(pastTimeVal, nowTimeVal, 'i')
    if (minutesGap < 1) {
      return '刚刚'
    } else if (minutesGap >= 1 && minutesGap < 60) {
      return `${minutesGap}分钟前`
    } else if (minutesGap >= 60 && minutesGap < 1440) {
      return `${Math.floor(minutesGap / 60)}小时前`
    } else {
      return this.format(pastTimeVal, 'm月d号')
    }
  }
  /**
   * 增加时间(增加年、月、日、时、分、秒)
   *
   * @param {Number|String|Date} [timeValue=new Date()] 时间基数
   * @param {number} [value=0] 增加的值
   * @param {string} [unit='s'] 增加的单位，默认秒
   * @returns
   * @memberof Time
   */
  add (timeValue = new Date(), value = 0, unit = 's') {
    if (typeOf(value) !== 'number') throw new TypeError('增加的时间必须为Number类型')
    let changeValue = Math.abs(value)
    return this[$addSubstract](timeValue, changeValue, unit)
  }
  /**
   * 减少时间(增加年、月、日、时、分、秒)
   *
   * @param {Number|String|Date} [timeValue=new Date()] 时间基数
   * @param {number} [value=0] 增加的值
   * @param {string} [unit='s'] 增加的单位，默认秒
   * @returns
   * @memberof Time
   */
  reduce (timeValue = new Date(), value = 0, unit = 's') {
    if (typeOf(value) !== 'number') throw new TypeError('减少的时间必须为Number类型')
    let changeValue = -Math.abs(value)
    return this[$addSubstract](timeValue, changeValue, unit)
  }
  [$addSubstract] (timeValue = new Date(), changeValue = 0, unit = 's') {
    const timeObject = this.getTimeObject(timeValue)
    const unitLow = this[$checkUnitRange](unit)
    const key = this[$timeRefer][unitLow]
    timeObject[key] = Number(timeObject[key]) + changeValue
    return new Date(timeObject.year, timeObject.month - 1, timeObject.date, timeObject.hours, timeObject.minutes, timeObject.seconds)
  }
  [$checkUnitRange] (unit) {
    if (typeOf(unit) !== 'string') throw new TypeError('指定的时间单位必须为String类型')
    if (!this[$unitRange].includes(unit.toLowerCase())) throw new RangeError('指定的时间单位必须为y、m、d、h、i、s、ms中的一种')
    return unit.toString()
  }
  [$checkTimeType] (timeVal) {
    const timeType = typeOf(timeVal)
    if (!this[$timeRange].includes(timeType)) throw new TypeError('传入的时间类型必须为String、Number或Date类型')
    return timeType
  }
}