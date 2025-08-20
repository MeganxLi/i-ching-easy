import { createContext } from 'react'

const PageContext = createContext<PageContextType>({
  changePage: () => { },
})

export default PageContext
