export const randomFlip = (frequency: number) => Array(frequency)
  .fill(null)
  .map(() => Math.random() > 0.5)

// true = 正面 = 3 分，false = 反面 = 2 分
export const total = (coins: boolean[]) => coins.reduce((sum, coin) => sum + (coin ? 3 : 2), 0)
