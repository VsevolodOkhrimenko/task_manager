// const humanMonths = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December'
// ]

const MAX_TEXT_LEN = 20

const humanMonthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const weekDays = [
  'SU',
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
  'SA'
]

export const getIdArray = (array) => {
  const result = []
  for (let i = 0, length = array.length; i < length; i += 1) {
    result.push(array[i].id)
  }
  return result
}

export const getByIdFromArray = (array, id) => {
  for (let i = 0, length = array.length; i < length; i += 1) {
    if (array[i].id === id) {
      return array[i]
    }
  }
  return null
}

export const replaceByTargetFromArray = (array, target) => {
  const arrayCopy = [...array]
  for (let i = 0, length = arrayCopy.length; i < length; i += 1) {
    if (arrayCopy[i].id === target.id) {
      arrayCopy[i] = target
      return arrayCopy
    }
  }
  return arrayCopy
}

export const removeByIdFromArray = (array, targetId) => {
  const arrayCopy = [...array]
  for (let i = 0, length = arrayCopy.length; i < length; i += 1) {
    if (arrayCopy[i].id === targetId) {
      arrayCopy.splice(i, 1)
      return arrayCopy
    }
  }
  return arrayCopy
}

export const removeByValueFromArray = (array, value) => {
  const arrayCopy = [...array]
  for (let i = 0, length = arrayCopy.length; i < length; i += 1) {
    if (arrayCopy[i] === value) {
      arrayCopy.splice(i, 1)
      return arrayCopy
    }
  }
  return arrayCopy
}

export const setFirstInArrayById = (array, id) => {
  const arrayCopy = [...array]
  for (let i = 0, length = arrayCopy.length; i < length; i += 1) {
    if (arrayCopy[i].id === id) {
      let first = arrayCopy.splice(i, 1)
      return [...first, ...arrayCopy]
    }
  }
  return arrayCopy
}

export const setNullAttrByKeyAndValue = (array, key, value) => {
  const arrayCopy = [...array]
  for (let i = 0, length = arrayCopy.length; i < length; i += 1) {
    if (arrayCopy[i][key] === value) {
      arrayCopy[i][key] = null
      return arrayCopy
    }
  }
  return arrayCopy
}

export const updateAttrByIdArray = (array, ids, key, value) => {
  const arrayCopy = [...array]
  for (let i = 0, length = arrayCopy.length; i < length; i += 1) {
    if (ids.includes(arrayCopy[i].id)) {
      arrayCopy[i][key] = value
      console.log(arrayCopy[i])
    }
  }
  console.log(arrayCopy)
  return arrayCopy
}

export const getUniqueArrayById = (array) => {
  return array.filter((item, index, self) =>
    index === self.findIndex((itemTarget) => (
      itemTarget.id === item.id
    ))
  )
}

export const arraysEqual = (array1, array2) => {
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort())
}

export const pythonDateTimeToJs = (datetime) => {
  if (!datetime) {
    return null
  }
  const jsDate = datetime.split('T')[0]
  const jsTime = datetime.split('T')[1].slice(0,-1)
  const jsDateObj = new Date(jsDate + 'T' + jsTime)
  let day = jsDateObj.getDate()
  if (day < 10) {
    day = `0${day}`
  }
  return day + ' ' + humanMonthsShort[jsDateObj.getMonth()] + ' ' + jsDateObj.getFullYear()
}

export const getWeekdayByIndex = (index) => {
  return weekDays[index]
}

export const pythonDateTimeToJsObj = (datetime) => {
  if (!datetime) {
    return null
  }
  const jsDate = datetime.split('T')[0]
  const jsTime = datetime.split('T')[1].slice(0,-1)
  return new Date(jsDate + 'T' + jsTime)
}

export const dateStringToJsObj = (dateStr) => {
  if (!dateStr) {
    return null
  }
  return new Date(dateStr)
}

export const getDateString = (date) => {
  if (!date) {
    return null
  }
  return date.getDate() + ' ' + humanMonthsShort[date.getMonth()] + ' ' + date.getFullYear()
}

export const getDatePathString = (date) => {
  if (!date) {
    return null
  }
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }
  let day = date.getDate()
  if (day < 10) {
    day = `0${day}`
  }
  return year + '-' + month + '-' + day
}

export const getQueryParam = (search, target) => {
  return new URLSearchParams(search).get(target)
}

export const setQueryParams = (params) => {
  const serachParams = new URLSearchParams()
  Object.keys(params).forEach(function(key) {
    if (params[key]) {
      serachParams.set(key, params[key])
    }
  })
  return serachParams
}

export const renderLongText = (text, length) => {
  if (!text) {
    return null
  }
  if (length && text.length > length) {
    return text.substring(0, length - 1) + '...'
  }
  if (text.length > MAX_TEXT_LEN) {
    return text.substring(0, MAX_TEXT_LEN - 1) + '...'
  }
  return text
}

export function findIndexById(array, id) {
  for (let i = 0, length = array.length; i < length; i = i + 1) {
    if (array[i].id === id) {
      return i
    }
  }
  return -1
}

export function moveToFirstById(arrayInit, id) {
  const array = [...arrayInit]
  const elementToMove = array.find((element) => {
    return element.id === id
  })
  const index = array.indexOf(elementToMove)
  array.splice(index, 1)
  array.unshift(elementToMove)
  return array
}

export function handleTZOffset(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line no-mixed-operators
  )
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function generateAndDownloadFile(filename, text) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export function getShowNameFromUser(user) {
  return user.name || user.email
}
