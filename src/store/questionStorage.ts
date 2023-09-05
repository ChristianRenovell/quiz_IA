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
  setOptions: (newOptions: Options) => void;
  backQuestion: () => void;
  nextQuestion: () => void;
  updateQuestion: (índice: number, nombrePropiedad: string, valorPropiedad: string | boolean)=> void;
  getQuestions: () => void;
}

const useQuestionsStore = create<State>((set: SetState<State>) => ({
  options: {
    numQuestions: "",
    difficulty: "",
    category: "",
  },
  questions: [],
  currentQuestion: 0,
  totalQuestions: 0,
  loading: true,
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
  updateQuestion: (índice: number, nombrePropiedad: string, valorPropiedad: string | boolean) => {
    set((state) => {
      const preguntasActualizadas = [...state.questions];
      if (índice >= 0 && índice < preguntasActualizadas.length) {
        preguntasActualizadas[índice][nombrePropiedad] = valorPropiedad;
      }
      console.log(preguntasActualizadas)
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
}));

export default useQuestionsStore;