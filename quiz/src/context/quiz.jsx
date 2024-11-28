import { createContext, useReducer } from "react";
// Contexto,(quiz.jsx) Destina um arquivo para trabalhar com a lógica e diminui a lógica dos componentes
// createContext, Vai me permitir criar um Contexto
// Provider Vai me permitir usar o Contexto/Conteúdo em todos os componentes da aplicação
// useReducer, Gerenciar estados mais complexos e tambem fazer alterações com base em ações do meu projeto
import questions from "../data/questions_complete";

const STAGES = ["Start", "Category", "Playing", "End"];
// Estágios do meu jogo

const initialStage = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
  help: false,
  optionToHide: null,
};

const quizReducer = (state, action) => {
  // quizReducer = Possibilidade de mudar o estado
  console.log(state, action);
  // State = Quando eu entro nessa função, eu tenho o estado que está o jogo (SPE),
  // Action = E depois eu posso ter uma ação que pode mudar o estado do jogo
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state,
        // ( ... ) Mantém o estágio da aplicação, o anterior ao que estava
        gameStage: STAGES[1],
      };

    case "START_GAME":
      let quizQuestions = null;

      state.questions.forEach((question) => {
        if (question.category === action.payload) {
          quizQuestions = question.questions;
        }
      });

      return {
        ...state,
        questions: quizQuestions,
        gameStage: STAGES[2],
      };

    case "REORDER_QUESTIONS":
      const reorderedQuestions = state.questions.sort(() => {
        return Math.random() - 0.5;
      });

      return {
        ...state,
        questions: reorderedQuestions,
      };

    case "CHANGE_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      let endGame = false;

      if (!state.questions[nextQuestion]) {
        // Se não houver mais perguntas futuros, endGame vira true
        endGame = true;
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        answerSelected: false,
        help: false,
      };

    case "NEW_GAME":
      return initialStage;

    case "CHECK_ANSWER":
      if (state.answerSelected) return state;

      const answer = action.payload.answer;
      const option = action.payload.option;
      let correctAnswer = 0;

      if (answer === option) correctAnswer = 1;

      return {
        ...state,
        score: state.score + correctAnswer,
        // conta + 1 na pontuação
        answerSelected: option,
        // exibição do botão
      };

    case "SHOW_TIP":
      return {
        ...state,
        help: "tip",
      };

    case "REMOVE_OPTION":
      const questionWithoutOption = state.questions[state.currentQuestion];

      let repeat = true;
      let optionToHide;

      questionWithoutOption.options.forEach((option) => {
        if (option !== questionWithoutOption.answer && repeat) {
          optionToHide = option;
          repeat = false;
        }
      });

      return {
        ...state,
        optionToHide,
        help: true,
      };

    default:
      return state;
  }
};

export const QuizContext = createContext();
// Contexto onde eu consumo

export const QuizProvider = ({ children }) => {
  // Provedor onde eu vou habilitar o contexto
  const value = useReducer(quizReducer, initialStage);
  // useReducer vai receber o quizReducer para poder fazer a modificação de estado e também saber qual estado está atualmente
  // E passo o initialStage para padronizar alguns estados iniciais
  // Agora no value consigo saber qual o estado está o jogo, ação que pode ocorrer para mudar o estado, e como ele vai começar inicialmente, dado vindo do initialStage

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
  // Quando utiliza o children, consigo ter componentes dentro de componentes
};
