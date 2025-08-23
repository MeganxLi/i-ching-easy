export const randomFlip = (frequency: number) => Array(frequency)
  .fill(null)
  .map(() => Math.random() > 0.5)

/**
 * @param true 正面 = 3 分
 * @param false 反面 = 2 分
 * @returns 硬幣總分
 */
export const total = (coins: boolean[]) => coins.reduce((sum, coin) => sum + (coin ? 3 : 2), 0)

/**
 * 本卦
 * 判斷陽-(7、9)，還是陰--(6、8)
 */
export const calcInitialHexagram = (coin: number | null): number | null => {
  switch (coin) {
    case 7:
    case 9:
      return 1

    case 6:
    case 8:
      return 0

    default:
      return null
  }
}

/**
 * 變卦
 * 僅有6和9
 */
export const changingNumber = [6, 9]
export const calcChangingHexagram = (coin: number | null): number | null => {
  switch (coin) {
    case 7:
    case changingNumber[0]:
      return 1

    case 8:
    case changingNumber[1]:
      return 0

    default:
      return null
  }
}

/**
 * 卦象，如果是變爻，將回傳紅色樣式的類別。
 * @param key number | string | null
 * @typedef 1, 7, 6 為陽
 * @typedef 0, 8, 9 為陰
 * @returns className
 */
export const showLineClassName = (key: number | string | null): string => {
  const yang = 'symbol-line-yang'
  const yin = 'symbol-line-yin'
  const change = 'symbol-line-red'

  switch (key) {
    case '1':
    case 7:
      return yang
    case changingNumber[0]:
      return `${yang} ${change}`

    case '0':
    case 8:
      return yin
    case changingNumber[1]:
      return `${yin} ${change}`

    default:
      return ''
  }
}
