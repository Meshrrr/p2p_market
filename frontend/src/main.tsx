import { createRoot } from 'react-dom/client'
import './scss/normalize.scss'
import './scss/index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
