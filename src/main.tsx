import { createRoot } from 'react-dom/client'

import './styles/base/Reset.css'
import './styles/base/Base.css'
import './styles/base/Index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <App />,
)
