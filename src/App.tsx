import { useMemo, useState } from 'react'

import PageSetting from './components/PageSetting'
import PageContext from './context/Page'

const App = () => {
  const [page, setPage] = useState<number>(1)
  const changePage = () => setPage((prevPage) => prevPage + 1)

  const contextValue = useMemo(() => ({ changePage }), [changePage])

  return (
    <PageContext.Provider value={contextValue}>
      {PageSetting[page]}
    </PageContext.Provider>
  )
}

export default App
