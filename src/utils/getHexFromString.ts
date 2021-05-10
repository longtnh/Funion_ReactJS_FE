import { COLOR_CHAT } from '@/constants/styles'

const getHexFromString = (value: string) => {
  let num = parseInt(value, 36)
  return COLOR_CHAT[num % COLOR_CHAT.length]
}
export default getHexFromString
