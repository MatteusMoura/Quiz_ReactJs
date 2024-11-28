import { useContext } from "react";
// USECONTEXT É OQUE EU PRECISO PARA USAR O CONTEXTO / E TEM O PROVIDER QUE VAI ME DEIXAR USAR ISSO
import { QuizContext } from "../context/quiz";
// É O MEU CONTEXTO
import Quiz from "../img/quiz.svg";

import "./Welcome.css";

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  // A variável quizState armazena o estado atual do quiz, eu pego os valores
  // A variável dispatch é uma função que permite modificar o estado do quizState, dispatch eu altero os valores

  return (
    <div id="welcome">
      <h2>Seja bem-vindo</h2>
      <p>Clique no botão abaixo para começar:</p>
      <button onClick={() => dispatch({ type: "CHANGE_STATE" })}>
        Iniciar
      </button>
      <img src={Quiz} alt="Início do Quiz" />
    </div>
  );
};

export default Welcome;
