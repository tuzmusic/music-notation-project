import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ScoreProvider } from './contexts/ScoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </StrictMode>,
)
