import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { QuizProvider } from './context/quiz.jsx'
// Esse é o Provedor, o contexto, ele vai importar nos componentes que vai ser utilizado e o provedor aqui ele vai prover o contexto dos componentes

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>,
)
