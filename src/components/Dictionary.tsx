import { useState } from 'react'

import {
  BookOpen, Search, X,
} from 'lucide-react'

const Dictionary = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  const clickDialog = () => setIsOpen(!isOpen)
  const getSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)

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

        </div>
      </div>
    </>
  )
}

export default Dictionary
