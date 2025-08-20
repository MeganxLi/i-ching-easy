import { useEffect, useState } from 'react'

import hexagramsData from '../../constants/hexagrams.json'
import {
  randomFlip, calcInitialHexagram, total, calcChangingHexagram,
  changingNumber,
  showLineClassName,
} from '../../utils/function'

const Choose = () => {
  const [actionLog, setActionLog] = useState<boolean[] | null>(null)
  const [coinsList, setCoinsList] = useState<(number | null)[]>(
    [null, null, null, null, null, null])
  const [coinsNo, setCoinsNo] = useState<number>(5)
  const [resultHexagram, setResultHexagram] = useState<HexagramType | undefined>(undefined)

  const [isFlipping, setIsFlipping] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const exceedLength = (): boolean => coinsList[0] !== null

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
    if (actionLog === null || exceedLength()) return
    setCoinsNo((prev) => prev - 1)
    const tempCoinsList = coinsList
    const tempTotal = total(actionLog)
    tempCoinsList[coinsNo] = tempTotal

    // 獲得結果，處理本卦和變卦
    if (exceedLength()) {
      const findBinary = (
        binary: string,
      ): HexagramType | undefined => hexagramsData.find((g) => g.binary === binary)

      // 判斷是否有變卦
      const hasChangingLines: boolean = tempCoinsList.some(
        (num) => num === changingNumber[0] || num === changingNumber[1],
      )
      const initialBinary = tempCoinsList.map((num) => calcInitialHexagram(num)).join('')
      const changeBinary = tempCoinsList.map((num) => calcChangingHexagram(num)).join('')

      const getBinary = {
        initial: findBinary(initialBinary),
        changing: findBinary(changeBinary),
        hasChanging: hasChangingLines,
      }

      setResultHexagram(hasChangingLines ? getBinary.changing : getBinary.initial)
    }

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
            className={`coin-item   ${isFlipping ? 'animation-flip-loop' : ''} ${logItem ? 'coin-front' : 'coin-back'}`}
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
        {6 - coinsNo}
        爻
      </button>
      <div className={exceedLength() && !isFlipping ? 'animation-fade-top' : ''}>
        <div className="symbol-list">
          {coinsList.map((item, i) => (
            <div key={i} className={`symbol-item ${showLineClassName((item))}`}>
              <span />
              <span />
            </div>
          ))}
        </div>
        <div className={`judgment ${exceedLength() && !isFlipping ? '' : 'display-none'}`}>
          <p className="judgment-title">
            {`第 ${resultHexagram?.id} 卦 · ${resultHexagram?.name}`}
          </p>
          <p className="judgment-text">
            {resultHexagram?.judgment}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Choose
