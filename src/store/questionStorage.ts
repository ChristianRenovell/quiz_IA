import { create, SetState } from "zustand";
import { Question } from "../services/models/ResQuestions";


interface Options {
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
  updateQuestion: (índice: number, nombrePropiedad: string, valorPropiedad: string | boolean)=> void;
  getQuestions: () => void;
  getResultQuiz: () => number;
  resetState: () => number;
}

const useQuestionsStore = create<State>((set, get) => ({
  options: {
    numQuestions: "",
    difficulty: "",
    category: "",
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
      currentQuestion: Math.min(state.currentQuestion + 1, state.totalQuestions - 1),
    }));
  },
  getHists: () => {
    set((state) => {
      return state
    });
  },
  updateQuestion: (índice: number, nombrePropiedad: string, valorPropiedad: string | boolean) => {
    set((state) => {
      const preguntasActualizadas: Question[] = [...state.questions];
      if (índice >= 0 && índice < preguntasActualizadas.length) {
        preguntasActualizadas[índice][nombrePropiedad] = valorPropiedad;
      }
      
      state.quizCompleted = state.questions.findIndex((element) => element.selected_answer === null) === -1;
      return { questions: preguntasActualizadas };
    });
  },
  getQuestions: async () => {
    const options = useQuestionsStore.getState().options;

    try {
      const response = await fetch('./src/services/mocks/resQuizz.json');
      const resJson = await response.json();
      set({
        totalQuestions: resJson.questions.length,
        questions:resJson.questions,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  },
  getResultQuiz: () => {
    return get().questions.filter(element => element.correct_answer === element.selected_answer).length; 
  },
  resetState: () => {
    set({
      options: {
        numQuestions: "",
        difficulty: "",
        category: "",
      },
      questions: [],
      currentQuestion: 0,
      totalQuestions: 0,
      loading: true,
      quizCompleted: false,
    });
  },
}));

export default useQuestionsStore;