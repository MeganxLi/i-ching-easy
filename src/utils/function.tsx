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
 * 判斷陽(7、9)還是陰(6、8)
 */
export const symbolLine = (coin: number): boolean => {
  switch (coin) {
    case 7:
    case 9:
      return true

    default:
      return false
  }
}
