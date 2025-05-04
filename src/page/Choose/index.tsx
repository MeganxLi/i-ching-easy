import { useEffect, useState } from 'react'

import { randomFlip, symbolLine, total } from '../../utils/function'

const Choose = () => {
  const [actionLog, setActionLog] = useState<boolean[] | null>(null)
  const [coinsList, setCoinsList] = useState<number[]>([])
  const [isFlipping, setIsFlipping] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const exceedLength = (): boolean => coinsList.length === 6

  const handleTossCoins = () => {
    if (exceedLength()) return
    setActionLog(randomFlip(3))
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
    startFlip()
    setCoinsList([...coinsList, total(actionLog)])
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
        {coinsList.length + 1}
        爻
      </button>
      <div className={`symbol-list ${exceedLength() && !isFlipping ? 'animation-fade-top' : ''}`}>
        {coinsList.map((item, i) => (
          <div key={i} className={`symbol-item ${symbolLine(item) ? 'symbol-line-yang' : 'symbol-line-yin'}`}>
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Choose
