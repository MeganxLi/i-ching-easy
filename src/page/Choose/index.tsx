import { useEffect, useState } from 'react'

import { randomFlip, symbolLine, total } from '../../utils/function'

const Choose = () => {
  const [actionLog, setActionLog] = useState<boolean[] | null>(null)
  const [coinsList, setCoinsList] = useState<number[]>([])

  const exceedLength = (): boolean => coinsList.length === 6

  const handleTossCoins = () => {
    if (exceedLength()) return
    setActionLog(randomFlip(3))
  }

  useEffect(() => {
    if (actionLog === null) return
    setCoinsList([...coinsList, total(actionLog)])
  }, [actionLog])

  useEffect(() => {
    setActionLog(randomFlip(3))
  }, [])

  return (
    <div id="Choose">
      <div className="coin-main">
        {actionLog?.map((logItem, idx) => (
          <img
            className="coin-item"
            src="images/coin.png"
            style={{ opacity: logItem ? 1 : 0.45 }}
            alt="coin"
            key={idx}
          />
        ))}
      </div>
      <button type="button" onClick={handleTossCoins}>
        擲第
        {coinsList.length + 1}
        爻
      </button>
      <div className="symbol-list">
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
