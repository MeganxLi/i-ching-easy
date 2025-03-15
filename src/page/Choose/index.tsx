import { useEffect, useState } from 'react'

import randomFlip from '../../utils/random'

const Choose = () => {
  const [actionLog, setActionLog] = useState<boolean[] | null>(null)

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
      <button type="button">第二次</button>
    </div>
  )
}

export default Choose
