const randomFlip = (frequency: number) => Array(frequency)
  .fill(null)
  .map(() => Math.random() > 0.5)

export default randomFlip
