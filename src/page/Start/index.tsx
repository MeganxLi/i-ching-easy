import { useContext } from 'react'

import PageContext from '../../context/Page'

const Start = () => {
  const { changePage } = useContext(PageContext)
  return (
    <main id="Start">
      <h2>冥想問題後按下開始</h2>
      <button type="button" onClick={changePage}>開始</button>
    </main>
  )
}

export default Start
