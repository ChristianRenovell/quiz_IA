import { create } from 'zustand';
import { Question } from '../services/models/ResQuestions';
import { environment } from '../environment.';
import { useNavigate } from 'react-router-dom';

export interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

interface State {
  options: Options;
  questions: Question[];
  currentQuestion: number;
  totalQuestions: number;
  loading: boolean;
  quizCompleted: boolean;
  setOptions: (newOptions: Options) => void;
  backQuestion: () => void;
  nextQuestion: () => void;
  updateQuestion: (
    índice: number,
    nombrePropiedad: string,
    valorPropiedad: string | boolean
  ) => void;
  getQuestions: () => Promise<boolean>;
  getResultQuiz: () => number;
  resetState: () => void;
  repeatQuiz: () => void;
}

const useQuestionsStore = create<State>((set, get) => ({
  options: {
    numQuestions: '',
    difficulty: '',
    category: '',
  },
  questions: [],
  currentQuestion: 0,
  totalQuestions: 0,
  loading: true,
  quizCompleted: false,
  setOptions: (newOptions: Options) =>
    set((state) => ({
      options: { ...state.options, ...newOptions },
    })),
  backQuestion: () => {
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    }));
  },
  nextQuestion: () => {
    set((state) => ({
      currentQuestion: Math.min(
        state.currentQuestion + 1,
        state.totalQuestions - 1
      ),
    }));
  },
  getHists: () => {
    set((state) => {
      return state;
    });
  },
  updateQuestion: (
    index: number,
    newProperty: string,
    valueProperty: string | boolean
  ) => {
    set((state) => {
      const updateQuestion: Question[] = [...state.questions];
      if (index >= 0 && index < updateQuestion.length) {
        updateQuestion[index][newProperty] = valueProperty;
      }

      state.quizCompleted =
        state.questions.findIndex(
          (element) => element.selected_answer === null
        ) === -1;
      return { questions: updateQuestion };
    });
  },
  getQuestions: async () => {
    const options = useQuestionsStore.getState().options;

    const body = {
      model: 'gpt-3.5-turbo',
      prompt: JSON.stringify(options),
      max_tokens: 50,
    };

    const opciones = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(environment.apiquiz, opciones);
      const resJson = await response.json();
      const questionsJsonRes = JSON.parse(resJson[0].message.content);
      if (questionsJsonRes.questions.length > 0) {
        set({
          totalQuestions: questionsJsonRes.questions.length,
          questions: questionsJsonRes.questions,
          loading: false,
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  getResultQuiz: () => {
    return get().questions.filter(
      (element) => element.correct_answer === element.selected_answer
    ).length;
  },
  resetState: () => {
    set({
      options: {
        numQuestions: '',
        difficulty: '',
        category: '',
      },
      questions: [],
      currentQuestion: 0,
      totalQuestions: 0,
      loading: true,
      quizCompleted: false,
    });
  },
  repeatQuiz: () => {
    set({
      currentQuestion: 0,
      loading: true,
      quizCompleted: false,
    });
  },
}));

export default useQuestionsStore;
