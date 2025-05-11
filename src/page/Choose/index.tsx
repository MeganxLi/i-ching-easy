import { useEffect, useState } from 'react'

import { randomFlip, symbolLine, total } from '../../utils/function'

const Choose = () => {
  const [actionLog, setActionLog] = useState<boolean[] | null>(null)
  const [coinsList, setCoinsList] = useState<(number | null)[]>(
    [null, null, null, null, null, null])
  const [coinsNo, setCoinsNo] = useState<number>(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const exceedLength = (): boolean => coinsList[5] !== null

  const handleTossCoins = () => {
    if (exceedLength()) return
    setActionLog(randomFlip(3))
  }

  const showLineClassName = (key: boolean | null): string => {
    switch (key) {
      case true:
        return 'symbol-line-yang'
      case false:
        return 'symbol-line-yin'

      default:
        return ''
    }
  }

  const startFlip = () => {
    setIsFlipping(true)

    // 1秒後停止
    setTimeout(() => {
      setIsFlipping(false)
    }, 1000)
  }

  const handleAnimationEnd = () => {
    // 動畫結束後延遲再隱藏元素
    setTimeout(() => {
      // 動畫結束後隱藏元素
      setIsHidden(true)
    }, 1000)
  }

  useEffect(() => {
    if (actionLog === null) return
    setCoinsNo((prev) => prev + 1)
    const tempCoinsList = coinsList
    tempCoinsList[coinsNo] = total(actionLog)

    startFlip()
    setCoinsList(tempCoinsList)
  }, [actionLog])

  useEffect(() => {
    setActionLog(randomFlip(3))
  }, [])

  return (
    <div id="Choose">
      <div
        className={`coin-main ${exceedLength() && !isFlipping ? 'animation-fadeOut-bottom' : ''}`}
        onAnimationEnd={handleAnimationEnd}
        style={{ visibility: isHidden ? 'hidden' : 'visible' }}
      >
        {actionLog?.map((logItem, idx) => (
          <img
            className={`coin-item ${isFlipping ? 'animation-flip-loop' : ''} ${logItem ? 'coin-front' : 'coin-back'}`}
            src="images/coin.png"
            alt="coin"
            key={idx}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleTossCoins}
        className={exceedLength() ? 'animation-shrink-out' : ''}
        onAnimationEnd={handleAnimationEnd}
        style={{ visibility: isHidden ? 'hidden' : 'visible' }}
      >
        擲第
        {coinsNo + 1}
        爻
      </button>
      <div className={`symbol-list ${exceedLength() && !isFlipping ? 'animation-fade-top' : ''}`}>
        {coinsList.map((item, i) => (
          <div key={i} className={`symbol-item ${showLineClassName(symbolLine(item))}`}>
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Choose
