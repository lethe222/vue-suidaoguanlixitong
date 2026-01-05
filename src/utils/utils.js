export function dateFormater(value) {
  let date = new Date(value)
  let year = date.getFullYear()
  // 修正2：使用反引号 ``
  // 逻辑：如果月份小于10 (比如9月 -> 9+1=10)，不需要加0；如果小于10 (比如1月 -> 1+1=2)，前面拼个0变成 '02'
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1

  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

  // 修正3：返回值也要用反引号
  return `${year}-${month}-${day}`
}
