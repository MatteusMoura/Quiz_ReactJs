// react , componentes, estáticos
import { useContext, useEffect } from 'react'
// Estágio inicial do meu estado
import { QuizContext } from './context/quiz'

import Welcome from './components/Welcome'
import Question from './components/Question'
import GameOver from './components/GameOver'
import PickCategory from './components/PickCategory'

import './App.css'

function App() {
  const [quizState, dispatch] = useContext(QuizContext);
  // quizState eu pego os valores
  // dispatch eu altero os valores

  return (
    <div className='App'>
      <h1>Quiz de Programação</h1>
      {quizState.gameStage === "Start" && <Welcome/>}
      {quizState.gameStage === "Category" && <PickCategory/>}
      {quizState.gameStage === "Playing" && <Question/>}
      {quizState.gameStage === "End" && <GameOver/>}
    </div> 
  )
}

export default App
