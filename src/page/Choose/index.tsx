import { useEffect, useState } from 'react'

import hexagramsData from '../../constants/hexagrams.json'
import {
  randomFlip, calcInitialHexagram, total, calcChangingHexagram,
  changingNumber,
} from '../../utils/function'

const Choose = () => {
  const [actionLog, setActionLog] = useState<boolean[] | null>(null)
  const [coinsList, setCoinsList] = useState<(number | null)[]>(
    [null, null, null, null, null, null])
  const [coinsNo, setCoinsNo] = useState<number>(0)
  const [resultHexagram, setResultHexagram] = useState<GetHexagramType>({
    initial: undefined,
    changing: undefined,
    hasChanging: false,
  })

  const [isFlipping, setIsFlipping] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const exceedLength = (): boolean => coinsList[5] !== null

  const handleTossCoins = () => {
    if (exceedLength()) return
    setActionLog(randomFlip(3))
  }

  const showLineClassName = (key: string | null): string => {
    switch (key) {
      case '1':
        return 'symbol-line-yang'
      case '0':
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
    if (actionLog === null || coinsNo === 6) return
    setCoinsNo((prev) => prev + 1)
    const tempCoinsList = coinsList
    const tempTotal = total(actionLog)
    tempCoinsList[coinsNo] = tempTotal

    console.log('tempCoinsList', tempCoinsList)
    // 獲得結果，處理本卦和變卦
    if (coinsNo === 5) {
      // 判斷是否有變卦
      const hasChangingLines = tempCoinsList.some(
        (num) => num === changingNumber[0] || num === changingNumber[1],
      )

      const initialBinary = tempCoinsList.map((num) => calcInitialHexagram(num)).join('')
      const changeBinary = tempCoinsList.map((num) => calcChangingHexagram(num)).join('')
      console.log('initialBinary', initialBinary, 'changeBinary', changeBinary)

      const findBinary = (
        binary: string,
      ): HexagramType | undefined => hexagramsData.find((g) => g.binary === binary)

      const getBinary = {
        initial: findBinary(initialBinary),
        changing: findBinary(changeBinary),
        hasChanging: hasChangingLines,
      }
      setResultHexagram(getBinary)
      console.log('getBinary', getBinary)
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
      <div className={exceedLength() && !isFlipping ? 'animation-fade-top' : ''}>
        <div className="symbol-list">
          {resultHexagram.initial?.binary.split('').map((item, i) => (
            <div key={i} className={`symbol-item ${showLineClassName(item)}`}>
              <span />
              <span />
            </div>
          ))}
        </div>
        <div className={`judgment ${exceedLength() && !isFlipping ? '' : 'display-none'}`}>
          <p className="judgment-title">
            {`第${resultHexagram.initial?.id}卦 · ${resultHexagram.initial?.name}`}
          </p>
          <p className="judgment-text">
            {resultHexagram.initial?.judgment}
          </p>
        </div>

        {resultHexagram.hasChanging && (
          <>
            <div className="symbol-list">
              {resultHexagram.changing?.binary.split('').map((item, i) => (
                <div key={i} className={`symbol-item ${showLineClassName((item))}`}>
                  <span />
                  <span />
                </div>
              ))}
            </div>
            <div className={`judgment ${exceedLength() && !isFlipping ? '' : 'display-none'}`}>
              <p className="judgment-title">
                {`${resultHexagram.changing?.id}. ${resultHexagram.changing?.name}`}
              </p>
              <p className="judgment-text">
                {resultHexagram.changing?.judgment}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Choose
