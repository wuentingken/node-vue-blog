export function timeExchange(utctime) {
  const time = new Date(utctime)
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}