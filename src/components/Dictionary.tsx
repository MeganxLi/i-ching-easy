import { useState } from 'react'

import {
  BookOpen, Eye, Search, X,
} from 'lucide-react'

import hexagramsData from '../constants/hexagrams.json'
import { searchHexagrams, showLineClassName } from '../utils/function'

const Dictionary = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number>(1)

  const clickDialog = () => setIsOpen(!isOpen)
  const getSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)

  const findIndex = (
    no: number,
  ): HexagramType | undefined => hexagramsData.find((g) => g.id === no)

  const resultSearch = searchHexagrams(searchText)

  return (
    <>
      <button id="Has-sidebar" className="icon-button" type="button" onClick={clickDialog}>
        <BookOpen />
      </button>
      <div id="Dictionary" className={isOpen ? 'open' : ''}>
        <button className="icon-button" type="button" onClick={clickDialog}>
          <X />
        </button>
        <div className="dictionary-content">
          <div className="search-bar">
            <span className="icon-button">
              <Search />
            </span>
            <input type="text" name="search" placeholder="搜尋卦名或卦序..." autoComplete="off" onChange={getSearchValue} value={searchText} />
            <span className="icon-button">
              {searchText !== '' && <X onClick={() => setSearchText('')} />}
            </span>
          </div>
          <div className="dictionary-card">
            <h5 className="dictionary-title">{findIndex(selectedIndex)?.name}</h5>
            <span className="dictionary-subtitle">
              第
              {findIndex(selectedIndex)?.id}
              卦
            </span>
            <div className="symbol-list">
              {findIndex(selectedIndex)?.binary.split('').map((item, i) => (
                <div key={i} className={`symbol-item ${showLineClassName((item))}`}>
                  <span />
                  <span />
                </div>
              ))}
            </div>
            <div className="dictionary-trigram">
              <p>
                {`上 ${findIndex(selectedIndex)?.upper}`}
              </p>
              <p>
                {`下 ${findIndex(selectedIndex)?.lower}`}
              </p>
            </div>
            <div className="dictionary-judgment-box">
              <p className="dictionary-judgment-title">
                <Eye size={16} />
                卦辭：
              </p>
              <p className="dictionary-judgment-content">
                {findIndex(selectedIndex)?.judgment}
              </p>
            </div>

          </div>
          <div className="dictionary-list">
            <h5 className="dictionary-title">
              卦象列表 (
              {resultSearch.length}
              )
            </h5>
            <div className="dictionary-list-content">
              {resultSearch.map((item: HexagramType, key) => (
                <div className={`dictionary-list-item ${selectedIndex === item.id ? 'clicked' : ''}`} key={key} onClick={() => setSelectedIndex(item.id)}>
                  <span className="dictionary-item-index">{String(item.id).padStart(2, '0')}</span>
                  <span className="dictionary-item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dictionary
